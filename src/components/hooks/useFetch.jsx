import axios from 'axios';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';


export const useFetch = (url) => {

    const headers = {
        'Content-Type': 'application/json',
    }

    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const { addToast } = useToasts();

    const fetchUserData = async (values) => {

        setIsPending(true);

        const instance = axios.create({
            baseUrl: url,
        })

        try {
            const response = await instance.post(
                url,
                { ...values }, {
                headers: headers
            });

            setIsSuccess(true);
            setData(response.data);
            setIsSuccess(true);
            console.log(response)

            if (data?.message[0] && typeof data?.message[0] === 'string') {
                addToast(response?.data.message, {
                    appearance: 'success',
                });

            } else if (data?.status && typeof data?.status === 'string') {
                addToast(data.message, {
                    appearance: 'success',
                });
            }
            return data.data;

        } catch (error) {
            setIsError(true);
            const errorData = error?.response?.data;
            console.log(error)

            if (errorData?.message && Array.isArray(errorData?.message)) {
                addToast(errorData.message[0], {
                    appearance: 'error',
                });
            } else if (errorData?.message  && typeof errorData?.statusCode === "number") {
                addToast(errorData.message, {
                    appearance: 'error',
                });
            }
            return Promise.reject(errorData);
        } finally {
            setIsPending(false);
        }
    };

    /*useEffect(() => {
        fetchUserData()
    }, []);

    const refetch = () => {
        fetchUserData();
    };*/

    return { data, isError, isPending, isSuccess, fetchUserData };

};