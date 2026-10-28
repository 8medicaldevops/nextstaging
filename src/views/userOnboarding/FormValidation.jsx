"use client";
import * as Yup from 'yup';

export const createAccountValidation = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Please enter a valid email address").required("Please enter your email address"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    /*termsAndConditions: Yup.bool().oneOf([true], 'You need to accept the Terms and Conditions'),*/
})

export const signInValidation = Yup.object({
    identifier: Yup.string().email("Please enter a valid email address").required("Please enter your email address"),
    password: Yup.string().min(6, "Password must be at least 8 characters").required("Password is required"),
})

export const forgotPasswordValidation = Yup.object({
    email: Yup.string().email("Please enter a valid email address").required("Please enter your email address"),
})

export const changePasswordValidation = Yup.object({
    newPassword: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmNewPassword: Yup.string()
        .required("Please confirm password")
        .oneOf([Yup.ref("newPassword"), null], "Password should match"),
})