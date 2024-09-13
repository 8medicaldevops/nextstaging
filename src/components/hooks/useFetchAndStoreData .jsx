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

  const fetchData = async (page = currentPage) => {
    const validPage = page || currentPage;
    const tokenData = getStoredToken();
    if (!tokenData || !tokenData || isTokenExpired(tokenData)) {
      clearStorageAndRedirect();
      return;
    }

    try {
      const response = await axios.get(`${url}?page=${validPage}`, {
        headers: {
          Authorization: `Bearer ${tokenData.accessToken}`,
        },
      });
      setStatusCount(response.data.data.statuses);
      setTotalPages(response.data.data.orders.totalPages);
      setTotalDocs(response.data.data.orders.totalDocs);
      const mappedData = response.data.data.orders.docs.map((doc) => {
        let dateObject = null;
        let dateBookedObj = null;
      
        if (doc.ambulances && doc.ambulances.startDate) {
          dateObject = parseISO(doc.ambulances.startDate);
        }
      
        if (doc.dateBooked) {
          dateBookedObj = parseISO(doc.dateBooked);
        }
      
        const formatTimeToAMPM = (time) => {
          if (!time) {
            return '';
          }
        
          const timeComponents = time.split(':');
          if (timeComponents.length !== 2) {
            return time; // Return the original time if it doesn't match the expected format
          }
        
          const hours = parseInt(timeComponents[0], 10);
          const minutes = parseInt(timeComponents[1], 10);
        
          if (isNaN(hours) || isNaN(minutes)) {
            return time; // Return the original time if the components are not valid numbers
          }
        
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = hours % 12 || 12; // Convert "00" or "12" to "12"
          return `${formattedHours}:${timeComponents[1]} ${ampm}`;
        };
        return {
          id: doc._id,
          ContactName: doc.callerDetails.fullName,
          amount: doc.price,
          status: doc.missionStatus,
          standbyVenue: doc.ambulances?.eventLocationName || '',
          phoneNumber: doc.callerDetails.phone,
          standbyDate: dateObject ? format(dateObject, 'do MMMM , yyyy') : '',
          startTime: formatTimeToAMPM(doc.ambulances.startTime) || '',
          EndTime: formatTimeToAMPM(doc.ambulances.endTime) || '',
          standbyDateAndTime : dateObject ? `${format(dateObject, 'do MMMM , yyyy')} : ${formatTimeToAMPM(doc.ambulances?.startTime) || ''} - ${formatTimeToAMPM(doc.ambulances?.endTime) || ''}` : '',
          dateBooked : dateBookedObj ? format(dateBookedObj, 'do MMMM , yyyy') : '',

        };
      });

      const storedData = JSON.stringify(mappedData);
      localStorage.setItem(storageKey, storedData); // Update the data in localStorage
      setData(mappedData);
      // if (storedData !== localStorage.getItem(storageKey)) {
      //   setData(mappedData);
      //   localStorage.setItem(storageKey, storedData);
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response && error.response.status === 401) {
        clearStorageAndRedirect(); // Token might be invalid or expired, clear storage and redirect
      }
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
  }, [url, storageKey, accessToken, interval, currentPage]);

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
    statusCount,  
    currentPage,
    totalPages,
    totalDocs,
    goToPage,
    nextPage,
    prevPage,};
  
};

export default useFetchAndStoreData;
