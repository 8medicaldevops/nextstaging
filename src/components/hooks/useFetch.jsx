import axios from 'axios';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { useNavigate } from "react-router-dom";

export const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const[otpSent, setOtpSent] = useState(false);

    let navigate = useNavigate();

    const { addToast } = useToasts();

    const headers = {
        'Content-Type': 'application/json',
    }

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


            setData(response.data);

            if (response.data.message[0] && typeof response.data.message[0] === 'string') {
                addToast(response?.data.message, {
                    appearance: 'success',
                });
                setIsSuccess(true);

            } else if (response.data.status && typeof response.data.status === 'string') {
                addToast(data.message, {
                    appearance: 'success',
                });
                setIsSuccess(true);
            }
            return response.data;

        } catch (error) {
            setIsError(true);

            if (error.response.data.message && Array.isArray(error.response.data.message)) {
                addToast(error.response.data.message[0], {
                    appearance: 'error',
                });
            } else if (error.response.data.message && typeof error.response.data.statusCode === "number") {
                addToast(error.response.data.message, {
                    appearance: 'error',
                });
            }
            return Promise.reject(error.response.data);
        } finally {
            setIsPending(false);
        }
    };

    const fetchUserDataAndRoute = async (values, path) => {

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

            if (response.data.message[0] && typeof response.data.message[0] === 'string') {
                addToast(response?.data.message, {
                    appearance: 'success',
                });
                sessionStorage.setItem('SignIn', JSON.stringify(response.data));
                navigate(`${path}`);

                setIsSuccess(true);
            } else if (response.data.status && typeof response.data.status === 'string') {
                addToast(data.message, {
                    appearance: 'success',
                });
                navigate(`${path}`);
                setIsSuccess(true);
            }
            return response.data;


        } catch (error) {
            setIsError(true);

            if (error.response.data.message && Array.isArray(error.response.data.message)) {
                addToast(error.response.data.message[0], {
                    appearance: 'error',
                });
            } else if (error.response.data.message && typeof error.response.data.statusCode === "number") {
                addToast(error.response.data.message, {
                    appearance: 'error',
                });
            }
            return Promise.reject(error.response.data);
        } finally {
            setIsPending(false);
        }
    };

    const fetchUserDataSetItemChangeState = async (values,itemName, itemKey) => {

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
            if (response.data.message[0] && typeof response.data.message[0] === 'string') {
                addToast(response?.data.message, {
                    appearance: 'success',
                });
                sessionStorage.setItem(`${itemKey}`, JSON.stringify(itemName));
                setOtpSent(true);
            } else if (response.data.status && typeof response.data.status === 'string') {
                addToast(data.message, {
                    appearance: 'success',
                });
                sessionStorage.setItem(`${itemKey}`, itemName);
                setOtpSent(true);
            }
            return response.data;
        } catch (error) {
            setIsError(true);

            if (error.response.data.message && Array.isArray(error.response.data.message)) {
                addToast(error.response.data.message[0], {
                    appearance: 'error',
                });
            } else if (error.response.data.message && typeof error.response.data.statusCode === "number") {
                addToast(error.response.data.message, {
                    appearance: 'error',
                });
            }
            return Promise.reject(error.response.data);
        } finally {
            setIsPending(false)
        }
    };

    const fetchUserDataRemoveItemRoute = async (values, itemKey, path) => {
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
            if (response.data.message[0] && typeof response.data.message[0] === 'string') {
                addToast(response?.data.message, {
                    appearance: 'success',
                });
                sessionStorage.removeItem(`${itemKey}`);
                navigate(`${path}`);
            } else if (response.data.status && typeof response.data.status === 'string') {
                addToast(data.message, {
                    appearance: 'success',
                });
                sessionStorage.removeItem(`${itemKey}`);
                navigate(`${path}`);
            }
            return response.data;
        } catch (error) {
            setIsError(true);
            if (error.response.data.message && Array.isArray(error.response.data.message)) {
                addToast(error.response.data.message[0], {
                    appearance: 'error',
                });
            } else if (error.response.data.message && typeof error.response.data.statusCode === "number") {
                addToast(error.response.data.message, {
                    appearance: 'error',
                });
            }
            return Promise.reject(error.response.data);
        } finally {
            setIsPending(false)
        }
    };



    const fetchUserDataSetItemRoute = async (values, itemKey, path) => {
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
            if (response.data.message[0] && typeof response.data.message[0] === 'string') {
                addToast(response?.data.message, {
                    appearance: 'success',
                });
                sessionStorage.setItem(`${itemKey}`, response.data.data.longToken);
                navigate(`${path}`);
            } else if (response.data.status && typeof response.data.status === 'string') {
                addToast(data.message, {
                    appearance: 'success',
                });
                sessionStorage.setItem(`${itemKey}`, JSON.stringify(response.data.data.longToken));
                navigate(`${path}`);
            }
            return response.data;
        } catch (error) {
            if (error.response.data.message && Array.isArray(error.response.data.message)) {
                addToast(error.response.data.message[0], {
                    appearance: 'error',
                });
            } else if (error.response.data.message && typeof error.response.data.statusCode === "number") {
                addToast(error.response.data.message, {
                    appearance: 'error',
                });
            }
            return Promise.reject(error.response.data);
        } finally {
            setIsPending(false)
        }
    };

    return { data, isError, isPending, isSuccess, otpSent, fetchUserData, fetchUserDataAndRoute, fetchUserDataSetItemChangeState, fetchUserDataRemoveItemRoute, fetchUserDataSetItemRoute};

};