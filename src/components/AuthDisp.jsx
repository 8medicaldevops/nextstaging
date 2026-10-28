"use client";
//import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from "@/lib/router-compat";


export default function AuthDisp() {
  const navigate = useNavigate();
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(process.env.VITE_ADMIN_LOGIN, {
        identifier: values.email,
        password: values.password,
      });

      // Handle the response, e.g., save the token, redirect, etc.
      //console.log('Login successful:', response.data);
      navigate("/Admin")
      localStorage.setItem('admindata', JSON.stringify(response.data.data));
      localStorage.setItem('token', JSON.stringify(response.data.data.tokens));

    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      setSubmitting(false); // Stop the form submission spinner
    }
  };
  return (
    <div className='bg-ev-500 flex justify-center items-center h-dvh'>
      <div className='bg-white flex flex-col gap-9 w-[560px] px-9 py-12 rounded-[24px]'>
        <span className="flex justify-center">
          <div className="flex items-center gap-2">
            <svg width="168" height="37" viewBox="0 0 168 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2541_9573)">
                <path d="M35.9499 25.258V21.4716H42.1564V18.4074H35.9499V14.8162H42.7615V11.7129H32.6904V28.3418H42.8786V25.2385H35.9499V25.258Z" fill="#181719" />
                <path d="M44.5959 16.6709V28.3423H47.6016V16.6709H44.5959ZM46.0988 11.1279C45.0838 11.1279 44.2251 11.9866 44.2251 13.0016C44.2251 14.0165 45.0838 14.8753 46.0988 14.8753C47.1137 14.8753 47.9725 14.0165 47.9725 13.0016C47.9725 11.9866 47.1137 11.1279 46.0988 11.1279Z" fill="#181719" />
                <path d="M59.0391 16.6706V18.5833L58.395 17.7831C57.6143 16.8072 56.4823 16.2998 55.0575 16.2998C51.8371 16.2998 49.3193 18.9151 49.3193 22.2331C49.3193 25.5511 51.8371 28.1664 55.0575 28.1664C56.4823 28.1664 57.6143 27.6784 58.395 26.6831L59.0391 25.8828V28.0298C59.0391 29.9425 57.8876 31.0355 55.8773 31.0355C54.1793 31.0355 53.3985 30.3328 52.9301 29.6107L50.3733 31.0745C51.4468 32.6944 53.34 33.5923 55.7601 33.5923C58.6097 33.5923 61.9472 32.1284 61.9472 28.0298V16.6706H59.0391ZM55.6821 25.4925C53.7108 25.4925 52.3251 24.1653 52.3251 22.2526C52.3251 20.3399 53.7108 19.0127 55.6821 19.0127C57.6533 19.0127 59.0391 20.3399 59.0391 22.2526C59.0391 24.1653 57.6533 25.4925 55.6821 25.4925Z" fill="#181719" />
                <path d="M71.1626 16.319C69.7378 16.319 68.5473 16.8265 67.9032 17.6852L67.2591 18.5831V11.7129H64.2534V28.3418H67.2591V21.94C67.2591 20.1249 68.2545 19.0319 69.933 19.0319C71.4553 19.0319 72.4508 20.0663 72.4508 21.6473V28.3613H75.4565V21.1008C75.4565 17.8023 73.3096 16.319 71.1626 16.319Z" fill="#181719" />
                <path d="M84.1605 19.52V16.6705H81.6037V13.333L78.5982 14.2308V16.6705H76.6074V19.52H78.5982V24.2628C78.5982 25.8828 78.93 26.9367 79.6131 27.5612C80.4525 28.3029 81.8965 28.5762 84.1413 28.381V25.7071C83.1069 25.7461 82.4045 25.6681 81.9749 25.2777C81.7213 25.0436 81.5845 24.6922 81.5845 24.2628V19.52H84.1605Z" fill="#181719" />
                <path d="M99.4639 11.7129L94.5455 19.7541L89.6271 11.7129H86.2119V28.3418H89.4511V17.3535L94.5063 25.6288H94.5455L99.6007 17.3535V28.3613H102.841V11.7129H99.4639Z" fill="#181719" />
                <path d="M116.872 22.5054C116.872 18.9727 114.315 16.3184 110.939 16.3184C107.328 16.3184 104.694 18.9141 104.694 22.5054C104.694 26.1552 107.367 28.6924 111.212 28.6924C113.301 28.6924 114.94 27.9898 116.091 26.604L113.711 25.2378C113.106 25.7843 112.207 26.0966 111.271 26.0966C109.553 26.0966 108.441 25.433 107.953 24.1253L107.777 23.6374H116.795C116.853 23.286 116.872 22.8957 116.872 22.5054ZM107.739 21.588L107.855 21.1392C108.246 19.7144 109.339 18.9141 110.9 18.9141C112.403 18.9141 113.476 19.7144 113.867 21.1392L113.984 21.588H107.739Z" fill="#181719" />
                <path d="M127.474 11.7129V18.4464L126.849 17.7242C126.049 16.807 124.897 16.3385 123.433 16.3385C120.311 16.3385 117.871 19.0515 117.871 22.5256C117.871 25.9997 120.311 28.7127 123.433 28.7127C124.897 28.7127 126.049 28.2442 126.849 27.3269L127.474 26.6047V28.3613H130.479V11.7129H127.474ZM124.155 25.9021C122.203 25.9021 120.838 24.5163 120.838 22.5256C120.838 20.5348 122.203 19.149 124.155 19.149C126.107 19.149 127.474 20.5348 127.474 22.5256C127.474 24.5163 126.107 25.9021 124.155 25.9021Z" fill="#181719" />
                <path d="M132.796 16.6709V28.3423H135.801V16.6709H132.796ZM134.299 11.1279C133.284 11.1279 132.425 11.9866 132.425 13.0016C132.425 14.0165 133.284 14.8753 134.299 14.8753C135.313 14.8753 136.172 14.0165 136.172 13.0016C136.172 11.9866 135.313 11.1279 134.299 11.1279Z" fill="#181719" />
                <path d="M146.21 24.4971C145.682 25.2778 144.746 25.7462 143.672 25.7462C141.838 25.7462 140.51 24.38 140.51 22.5064C140.51 20.6327 141.838 19.2664 143.672 19.2664C144.746 19.2664 145.682 19.7348 146.21 20.5156L148.825 18.9932C147.751 17.3342 145.819 16.2998 143.711 16.2998C140.178 16.2998 137.505 18.9541 137.505 22.4868C137.505 26.0195 140.178 28.6739 143.711 28.6739C145.819 28.6739 147.751 27.6394 148.825 25.9609L146.21 24.4971Z" fill="#181719" />
                <path d="M158.793 16.6696V18.4262L158.169 17.704C157.369 16.7868 156.217 16.3184 154.753 16.3184C151.63 16.3184 149.191 19.0312 149.191 22.5054C149.191 25.9795 151.63 28.6924 154.753 28.6924C156.217 28.6924 157.369 28.224 158.169 27.3067L158.793 26.5845V28.3411H161.799V16.6696H158.793ZM155.495 25.9014C153.543 25.9014 152.177 24.5156 152.177 22.5249C152.177 20.5341 153.543 19.1484 155.495 19.1484C157.446 19.1484 158.813 20.5341 158.813 22.5249C158.793 24.5156 157.446 25.9014 155.495 25.9014Z" fill="#181719" />
                <path d="M164.143 10.9717V28.3618H167.149V10.9717H164.143Z" fill="#181719" />
                <path d="M12.8451 19.3442L7.38022 13.8792C4.31597 10.815 4.31597 5.81851 7.38022 2.75427C10.3859 -0.251424 15.3043 -0.251424 18.31 2.75427L18.4271 2.87138C19.8714 4.31567 20.6912 6.26742 20.6912 8.31675C20.6912 10.3661 19.8714 12.2983 18.4076 13.7622L12.8451 19.3442ZM12.8451 3.55449C11.6545 3.55449 10.4445 4.00339 9.5467 4.92071C7.67298 6.79439 7.67298 9.83912 9.5467 11.7128L12.8451 15.0113L16.2607 11.5957C17.1389 10.7174 17.6269 9.54632 17.6269 8.31675C17.6269 7.08715 17.1389 5.9161 16.2607 5.03782L16.1436 4.92071C15.2262 4.00339 14.0357 3.55449 12.8451 3.55449Z" fill="#6D09F9" />
                <path d="M12.8461 36.4999C9.62569 36.4999 6.38577 35.2703 3.94609 32.8111C1.52592 30.4105 0.19873 27.2291 0.19873 23.8135C0.19873 20.4175 1.52592 17.2166 3.92657 14.7965L12.8266 5.89648L14.993 8.06292L12.8461 10.2293L6.09301 16.9824C2.32614 20.7493 2.32614 26.8973 6.09301 30.6641C9.80137 34.3725 15.8518 34.3725 19.5796 30.6641L19.6187 30.6251C23.366 26.8777 23.366 20.7688 19.6187 17.0214L16.3006 13.7035L18.4671 11.537L21.7851 14.855C26.723 19.7929 26.723 27.8537 21.7851 32.7916L21.746 32.8306C19.2868 35.2898 16.0664 36.4999 12.8461 36.4999Z" fill="#6D09F9" />
                <path d="M12.8467 30.0598C11.1877 30.0598 9.62628 29.4157 8.45524 28.2447C6.01557 25.805 6.01557 21.8235 8.45524 19.3838L10.6217 21.5502C9.3726 22.7993 9.3726 24.8291 10.6217 26.0783C11.2072 26.6638 12.0074 26.9955 12.8467 26.9955C13.686 26.9955 14.4667 26.6638 15.0717 26.0783C16.3208 24.8291 16.3208 22.7993 15.0912 21.5697L17.2576 19.4033C19.6973 21.843 19.6973 25.7855 17.2576 28.2251C16.0476 29.4157 14.4861 30.0598 12.8467 30.0598Z" fill="#6D09F9" />
                <path d="M13.9109 16.0811L11.7441 18.2478L15.0564 21.5599L17.2231 19.3932L13.9109 16.0811Z" fill="#6D09F9" />
                <path d="M11.7486 16.0986L8.4502 19.397L10.617 21.5638L13.9153 18.2654L11.7486 16.0986Z" fill="#6D09F9" />
              </g>
              <defs>
                <clipPath id="clip0_2541_9573">
                  <rect width="167.2" height="36" fill="white" transform="translate(0.200195 0.5)" />
                </clipPath>
              </defs>
            </svg>
            <div className="bg-[#ECE5FF] font-brreg text-[#6D09F9] text-sm px-2 py-2 rounded-2xl">Admin</div>
          </div>
        </span>
        <span className="flex justify-center">
          <p className="font-brsemi text-2xl text-center">Log in</p>
        </span>
        <section>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={handleLogin}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                <span className='flex flex-col'>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder='Enter email address'
                    className='border-[1px] border-[#E4E3E5] outline-none rounded-mm p-4'
                  />
                  <small className='text-red-500 font-brreg'>
                    {errors.email && touched.email && errors.email}
                  </small>
                </span>
                <span className='flex flex-col'>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder='Enter password'
                    className='border-[1px] border-[#E4E3E5] outline-none rounded-mm p-4'
                  />
                  <small className='text-red-500 font-brreg'>
                    {errors.password && touched.password && errors.password}
                  </small>
                </span>
                <div className='flex justify-end'>
                  <p className='font-brmedium text-[#0A0116] underline underline-offset-6'>Forgot password?</p>
                </div>
                <button className='bg-ev-700 font-brbold rounded-mm text-lg text-white flex items-center justify-center py-5' type="submit" disabled={isSubmitting}>
                  Login
                </button>
              </form>
            )}
          </Formik>
        </section>
      </div>
    </div>
  )
}