
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const sendRequest = async (url, method = 'get', data = null) => {
  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sendRequest;
