import {toast } from 'react-toastify';


const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  // console.log(response)
    const { data } = response;
    if (data && data.success === true) {
      
      const message = response.data && data.message;
      
    //   const successText = message || codeMessage[response.status];
    //   const successText = message ;
  
      if (options.notifyOnSuccess) {
        // console.log(message)
        toast.success(message);
      }
    } else {
      const message = response.data && data.message;
    //   const errorText = message || codeMessage[response.status];
    //   const { status } = response;
      if (options.notifyOnFailed) {
        toast.error(message)
      }
    }
  };
  
  export default successHandler;