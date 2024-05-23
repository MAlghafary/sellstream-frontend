import cogoToast from 'cogo-toast';

// Function to parse API response and show toast notification
const handleApiResponse = async (responsePromise, callback) => {
  try {
    const response = await responsePromise;
    const data = await response.json();

    if (response.ok) {
      // If response status is OK, check for message and show toast
      if (data && data.message) {
        cogoToast.success(data.message, { position: 'top-right' });
      } else if (data && data.error) {
        cogoToast.error(data.error, { position: 'top-right' });
      }
    } else {
        if(data.error) {
            cogoToast.error(data.error, { position: 'top-right' });
        } else {
            cogoToast.error('An error occurred', { position: 'top-right' });
        }
    } 

    // Call the callback function with the data
    if (typeof callback === 'function') {
      callback(data);
    }
  } catch (error) {
    console.error('Error handling API response:', error);
    cogoToast.error('An error occurred', { position: 'top-right' });
  }
};

export default handleApiResponse;
