import { useState } from 'react';

export function useFetchAndRoute() {

    const [myData, setMyData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const fetchUserData = (formData, url, dataKey) => {

        setIsPending(true);

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setMyData(data);
                console.log(myData);
                if (data.success == true) {
                    setIsSuccess(true);
                    setIsError(false);
                    setIsPending(false);
                    sessionStorage.setItem(`${dataKey}`, JSON.stringify(data));
                } else {
                    setIsError(true);
                    setIsSuccess(false);
                    setIsPending(false);
                }
                
            })
            .catch(error => {
                setIsError(true);
                setIsPending(false);
                console.error('There has been a problem with your fetch operation:', error);
            });

    }

    return { fetchUserData, isError, isSuccess, isPending, myData };
}