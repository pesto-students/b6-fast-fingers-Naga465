import { getUser } from "./authenticateService";

const BASE_URL = process.env.BASE_URL || "http://localhost:8080/api";

function fetcher(endpoint, headers) {
  const { token } = getUser('user');
  const { body, method } = headers;
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization : token
  };
  const requestOptions = {
    headers: defaultHeaders,
    body: body ? JSON.stringify(body) : null,
    method,
  };
  try {
    return fetch(BASE_URL + endpoint, requestOptions)
      .then(handleResponse)
      .then((response) =>  response);
  } catch (error) {
    window.alert(error)
    throw error;
  }
}

export function handleResponse(response) {
  return response.json().then((data) => {
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        localStorage.removeItem('user');
        window.alert(data.error)
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

export default fetcher;
