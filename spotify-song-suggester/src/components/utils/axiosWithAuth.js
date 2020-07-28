import axios from "axios";

export const axiosWithAuthSpotify = () => {
  const token =
    "BQCKPl3toYGgS7NtZ0LhTWVISWtNuoXpFOoEWDVUxxKOd_veKx9Q387EM53ErZeFACZ7tEmmHdJDM5zX1Mo";
  return axios.create({
    baseURL: "https://api.spotify.com/v1/tracks/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:5001/api/",
    headers: {
      Authorization: token,
    },
  });
};

//curl -X "POST" -H "Authorization: Basic YTFkNTk0MmRkNGU2NGUzYmFmMTYzNDJiNDBjODIxNTE6YThlMjJhNjkwODNmNDljNmFhOWE5Yzk0ZWI5MGM4NTM=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

//curl -X "POST" -H "Authorization: Basic YTFkNTk0MmRkNGU2NGUzYmFmMTYzNDJiNDBjODIxNTE6YThlMjJhNjkwODNmNDljNmFhOWE5Yzk0ZWI5MGM4NTM=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

// curl -X "POST" -H "Authorization: Basic YTFkNTk0MmRkNGU2NGUzYmFmMTYzNDJiNDBjODIxNTE6YThlMjJhNjkwODNmNDljNmFhOWE5Yzk0ZWI5MGM4NTM=" -d grant_type=client_credentials https://accounts.spotify.com/api/token
