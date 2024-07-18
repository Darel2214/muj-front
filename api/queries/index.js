import Axios from 'axios';

export const me = async (access_token) => {
  try {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
}

export const alertsByStatus = async (access_token, status = true) => {
  try {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/alerts/byStatus/${status}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
}

export const alerts = async (access_token) => {
  try {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/alerts`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
}