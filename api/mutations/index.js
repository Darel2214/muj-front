import Axios from 'axios';

export const login = async (form) => {
  try {
    const response = await Axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      form
    );

    return response.data;
  } catch (error) {
    return error;
  }
}

export const sendAlertMutation = async (data, access_token) => {
  try {
    const response = await Axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/alerts`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  }
  catch (error) {
    return error;
  }
}

export const updateAlertMutation = async (data, access_token) => {
  try {
    const response = await Axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/alerts/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
}