import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';

export function useFetchAndRoute() {

    const [myData, setMyData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const { addToast } = useToasts();
    let navigate = useNavigate();

    /*const fetchUserDataAndRoute = async (formData, url, path, dataKey) => {
        setIsPending(true);

        await fetch(url, {
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
                    setTimeout(() => { navigate(`${path}`) }, 5000);
                } else if (data.success == false) {
                    setIsError(true);
                    setIsSuccess(false);
                    setIsPending(false);
                }

            })
            .catch(error => {
                setIsError(true);
                setIsPending(false);
                setIsSuccess(false);
                console.error('There has been a problem with your fetch operation:', error);
            });
    }*/

    const fetchUserDataAndRoute = async (url, values, successToastMessage, dataKey, path, errorToastMesssage) => {

        setIsPending(true);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })

            if (!response.ok) {
                throw new Error(`Some error`);
            }
            const data = await response.json();

            if (data.statusCode == 200) {
                setIsPending(false);
                setIsSuccess(true);
                setMyData(data);
                sessionStorage.setItem(`${dataKey}`, JSON.stringify(data));
                setTimeout(() => { navigate(`${path}`) }, 4000);
                addToast(`Hello ${myData.data.firstName}, ${successToastMessage}`, {
                    appearance: 'success',
                    autoDismiss: true,
                })
            } else if (data.statusCode == 400) {
                setIsPending(false);
                setIsError(true);
                addToast(`${errorToastMesssage}`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
        } catch (error) {
            if (error) {
                setIsPending(false)
                setIsError(true);
                addToast(`${errorToastMesssage}`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
        }
    };

    function TEST() {

        fetchUserDataAndRoute();

    }
  
    return { TEST, isError, isSuccess, isPending, myData };
}