import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import HomePage from './Pages/HomePage.jsx';
import StandBy from './Pages/StandBy.jsx';
import OtherCountries  from './Pages/OtherCountries.jsx';
import AboutCaller from './Pages/AboutCaller.jsx';
import AboutEvent from './Pages/AboutEvent.jsx';
import Schedule from './Pages/Schedule.jsx';
import AmbulanceSize from './Pages/AmbulanceSize.jsx';
import ConfirmOrder from './Pages/ConfirmOrder.jsx';
import BookingSuccessful from './Pages/BookingSuccessful.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import AboutUs from './Pages/AboutUs.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, 
    errorElement:<ErrorPage/>, 
  },
  {
    path: "/AboutUs",
    element: <AboutUs />, 
     
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
    
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <RouterProvider router={router} />
  </React.StrictMode>,
)
