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


export const fetchDataWithToken = async (url, token, logoutAction) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `${token}`, // Include the token in the Authorization header
      },
    });

    if (response.status === 401 && token) {
      // If response status is 401 and token is present, execute logout action
      logoutAction();
      return; // Exit the function
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error so that it can be handled by the caller
  }
};



export const postDataWithToken = async (url ,data , token, logoutAction) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json"
      },
    });

    if (response.status === 401 && token) {
      // If response status is 401 and token is present, execute logout action
      logoutAction();
      return; // Exit the function
    }

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error so that it can be handled by the caller
  }
};

export default handleApiResponse;
