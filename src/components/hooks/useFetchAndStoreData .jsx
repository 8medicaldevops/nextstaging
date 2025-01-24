import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // to decode the JWT token
import { parseISO, format } from 'date-fns';

const useFetchAndStoreData = (url, storageKey, accessToken, interval = 60000) => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : [];
  });
  const [statusCount,setStatusCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage] = useState(30)
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filteredDate, setFilteredDate] = useState({
    from:"",
    to:""
  });
  console.log(filteredDate.from)
  const [filteredStatus, setFilteredStatus] = useState("");
  const getStoredToken = () => {
    const storedTokenData = localStorage.getItem('token');
    return storedTokenData ? JSON.parse(storedTokenData) : null;
  };

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token.accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const clearStorageAndRedirect = () => {
    localStorage.clear();
    window.location.href = '/Login'; // Redirect to login page
  };

  // Implementing debounce logic for the search term
  useEffect(() => {
    const handler = setTimeout(() => {
        setCurrentPage(1);
        setDebouncedSearchTerm(searchTerm); // Set debounced search term if input is 3+ characters  
    }, 500); // 500ms delay (you can adjust this)

    // Cleanup the timeout if searchTerm changes (user keeps typing)
    return () => {
    clearTimeout(handler);
    };
}, [searchTerm]);

const formatTimeToAMPM = (time) => {
  if (!time) return "N/A";

  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};


const fetchData = async (page = currentPage) => {
  const validPage = page || currentPage;
  const tokenData = getStoredToken();

  if (!tokenData || isTokenExpired(tokenData)) {
    clearStorageAndRedirect();
    return;
  }

  const params = {
    search: debouncedSearchTerm,
    page: validPage,
    limit: itemsPerPage,
    orderStatus: filteredStatus,
    from: filteredDate?.from,
    to: filteredDate?.to,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
  );
  const queryString = new URLSearchParams(filteredParams).toString();

  setIsLoading(true);

  try {
    const response = await axios.get(`${url}?${queryString}`, {
      headers: {
        Authorization: `Bearer ${tokenData.accessToken}`,
      },
    });

    const { statuses, totalPages, totalDocs, docs } = response.data.data;

    setStatusCount(statuses);
    setTotalPages(totalPages);
    setTotalDocs(totalDocs);

    const mappedData = docs.map((doc) => {
      // Normalize `ambulances` to an array for consistent processing
      const ambulances = Array.isArray(doc.ambulances)
        ? doc.ambulances
        : doc.ambulances
        ? [doc.ambulances]
        : [];
    
      // Map over the normalized `ambulances` array
      const standbyDetails = ambulances.map((ambulance) => {
        // Handle `events` array or directly structured data
        const firstEvent =
          Array.isArray(ambulance.events) && ambulance.events.length > 0
            ? ambulance.events[0]
            : ambulance;
    
        // Extract startDate, startTime, and ensure fallback handling
        const startDate = firstEvent?.startDate || firstEvent?.startDateTime || null;
        const startTime = firstEvent?.startTime || null;
    
        return {
          standbyDateAndTime:
            startDate && startTime
              ? `${format(parseISO(startDate), "do MMMM, yyyy")} ${formatTimeToAMPM(
                  startTime
                )}`
              : "N/A",
          standbyVenue: ambulance.eventLocationName || "N/A",
        };
      });
    
      // Calculate amount conditionally
      const amount = doc.price
        ? doc.price
        : doc.smallAmbulanceCost + doc.largeAmbulanceCost + doc.medicCost || 0;
    
      // Return the mapped data
      return {
        id: doc._id,
        contactName: doc.callerDetails?.fullName || "N/A",
        phoneNumber: doc.callerDetails?.phone || "N/A",
        dateBooked: doc.dateBooked
          ? format(parseISO(doc.dateBooked), "do MMMM, yyyy")
          : "N/A",
        standbyDateAndTime: standbyDetails[0]?.standbyDateAndTime || "N/A",
        standbyVenue: standbyDetails[0]?.standbyVenue || "N/A",
        amount: amount,
        status: doc.orderStatus || "Pending",
      };
    });
    

    const storedData = localStorage.getItem(storageKey);
    const newData = JSON.stringify(mappedData);


    if (storedData !== newData) {
      localStorage.setItem(storageKey, newData);

    }

    setData(mappedData);
  } catch (error) {
    console.error("Error fetching data:", error);

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      clearStorageAndRedirect();
    }
  } finally {
    setIsLoading(false);
  }
};







  useEffect(() => {
    if (accessToken) {
      fetchData(currentPage); // Fetch data initially
      const intervalId = setInterval(() => fetchData(currentPage), interval); // Fetch data at regular intervals
      return () => clearInterval(intervalId); // Cleanup interval on unmount
    } else {
      clearStorageAndRedirect();
    }
  }, [url, storageKey, accessToken, interval, currentPage, debouncedSearchTerm , filteredDate, filteredStatus]);

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      fetchData(page);
      
    }
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };
  

  return {
    data, 
    isLoading,
    statusCount,  
    currentPage,
    totalPages,
    totalDocs,
    goToPage,
    nextPage,
    prevPage,
    searchTerm,
    setSearchTerm,
    setFilteredStatus,
    setFilteredDate
  };
  
};

export default useFetchAndStoreData;
