import React from 'react'
import ReactDOM from 'react-dom/client'
import { clarity } from "react-microsoft-clarity";
import ReactGA from "react-ga4";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css';
import HomePage from './Pages/HomePage.jsx';
import StandBy from './Pages/StandBy.jsx';
import OtherCountries from './Pages/OtherCountries.jsx';
import AboutCaller from './Pages/AboutCaller.jsx';
import AboutEvent from './Pages/AboutEvent.jsx';
import Schedule from './Pages/Schedule.jsx';
import AmbulanceSize from './Pages/AmbulanceSize.jsx';
import ConfirmOrder from './Pages/ConfirmOrder.jsx';
import BookingSuccessful from './Pages/BookingSuccessful.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import ServicesEr from './Pages/ServicesEr.jsx';
import ServicesAgt from './Pages/ServicesAgt.jsx';
import ServicesAmb from './Pages/ServicesAmb.jsx';
import ServicesUg from './Pages/ServicesUg.jsx';
import ServicesAfterLife from './Pages/ServicesAfterLife';
import Impact from './Pages/Impact.jsx';
import OtherBookings from './Pages/OtherBookings.jsx';
import BookingError from './Pages/BookingError.jsx';
import AdminPortal from './Pages/AdminPortal.jsx';
import EditBooking from './Pages/EditBooking.jsx';
import AdminLogin from './Pages/AdminLogin.jsx';
import OrderHistory from './Pages/OrderHistory.jsx';
import SignIn from './Pages/userOnboarding/SignIn';
import CreateAccount from './Pages/userOnboarding/CreateAccount';
import ForgotPassword from './Pages/userOnboarding/ForgotPassword';
import ChangePassword from './Pages/userOnboarding/ChangePassword';
import AmbulanceTp from './Pages/AmbulanceTp';
import AfterLife from './Pages/AfterLife';
import EmsLanding from './Pages/EMS';

import { ToastProvider } from 'react-toast-notifications';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') clarity.init("nvd25h7exz");

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') ReactGA.initialize("G-23C8DJ5T38");


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/AboutUs",
    element: <AboutUs />,
  },
  {
    path: "/ServiceEr",
    element: <ServicesEr />,
  },
  {
    path: "/ServiceAgt",
    element: <ServicesAgt />,
  },
  {
    path: "/ServiceAfterLife",
    element: <ServicesAfterLife />,
  },
  {
    path: "/ServiceAmb",
    element: <ServicesAmb />,

  },
  {
    path: "/ServiceUg",
    element: <ServicesUg />,

  },
  {
    path: "/Impact",
    element: <Impact />,

  },
  {
    path: "/OtherBookings",
    element: <OtherBookings />,

  },
  {
    path: "/OrderHistory",
    element: <OrderHistory />,

  },

  {
    path: "/Admin",
    element: <AdminPortal />,

  },
  {
    path: "/Login",
    element: <AdminLogin />,

  },
  {
    path: "/SignIn",
    element: <SignIn />,

  },
  {
    path: "/CreateAccount",
    element: <CreateAccount />,

  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,

  },
  {
    path: "/ChangePassword",
    element: <ChangePassword />,

  },
  {
    path: "/AmbulanceTp",
    element: <AmbulanceTp />,

  },
  {
    path: "/Admin/EditBooking",
    element: <EditBooking />,

  },


  // Ambulance Booking paths
  {
    path: "/StandBy",
    element: <StandBy />,
  },
  {
    path: "/StandBy/Others",
    element: <OtherCountries />,
  },
  {
    path: "/StandBy/Nigeria",
    element: <AboutCaller />,
  },
  {
    path: "/StandBy/Nigeria/Event",
    element: <AboutEvent />,
  },
  {
    path: "/StandBy/Nigeria/Event/Schedule",
    element: <Schedule />,
  },
  {
    path: "/StandBy/Nigeria/Event/Schedule/Ambulance Size",
    element: <AmbulanceSize />,
  },
  {
    path: "/StandBy/Nigeria/Event/Schedule/Ambulance Size/Confirm order",
    element: <ConfirmOrder />,
  },

  {
    path: "/StandBy/Nigeria/Event/Schedule/Ambulance Size/Confirm order/Booking successful",
    element: <BookingSuccessful />,
  },
  {
    path: "/BookingError",
    element: <BookingError />,

  },

  // Afterlife Booking Paths

  {
    path: "/AfterLife",
    element: <AfterLife />,
  },

  {
    path: "/ems-week",
    element: <EmsLanding />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='29064234798-89ki79v2rroat8nr0i7800u8fvnsa30m.apps.googleusercontent.com'>
    <React.StrictMode>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="bottom-center"
      >
        <RouterProvider router={router} />
      </ToastProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
