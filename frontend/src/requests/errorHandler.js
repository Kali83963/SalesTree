import {toast } from 'react-toastify';


const errorHandler = (error) => {
    console.log(error)
  if (!navigator.onLine) {
    
    // Code to execute when there is internet connection
    toast.error('No internet connection');
    
  }

  const { response } = error;

  if (!response) {
   
    // Code to execute when there is no internet connection
    toast.error('Problem connecting to server');
    
  }

//   if (response && response.data && response.data.jwtExpired) {
//     const result = window.localStorage.getItem('auth');
//     const jsonFile = window.localStorage.getItem('isLogout');
//     const { isLogout } = (jsonFile && JSON.parse(jsonFile)) || false;
//     window.localStorage.removeItem('auth');
//     window.localStorage.removeItem('isLogout');
//     if (result || isLogout) {
//       window.location.href = '/logout';
//     }
//   }

  if (response && response.status) {
    const message = response.data && response.data.message;

    const errorText = message ;
    
    toast.error(errorText);
  } else {
   

    if (navigator.onLine) {
      // Code to execute when there is internet connection
      toast.error('Cannot connect to the server, Try again later');
      
    } else {
      // Code to execute when there is no internet connection
      toast.error('Cannot connect to the Internet, Check your internet network');
      
    }
  }
};

export default errorHandler;