import axios from "axios";

export const axiosWithAuthSpotify = () => {
  const token =
    "BQB4_foX2mzwUwhtHfcTH8BZZOrReSJRozgKkmBUt33J3gD4V6-Qa1YxXk3iV31IzVMmF2TRvtQcytNQMi0";
  return axios.create({
    baseURL: "https://api.spotify.com/v1/tracks/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const axiosWithAuth = () => {
  const token = localStorage.getItem("access_token");
  return axios.create({
    baseURL: "https://tjs-songsuggest.herokuapp.com/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//curl -X "POST" -H "Authorization: Basic YTFkNTk0MmRkNGU2NGUzYmFmMTYzNDJiNDBjODIxNTE6YThlMjJhNjkwODNmNDljNmFhOWE5Yzk0ZWI5MGM4NTM=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

//curl -X "POST" -H "Authorization: Basic YTFkNTk0MmRkNGU2NGUzYmFmMTYzNDJiNDBjODIxNTE6YThlMjJhNjkwODNmNDljNmFhOWE5Yzk0ZWI5MGM4NTM=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

// curl -X "POST" -H "Authorization: Basic YTFkNTk0MmRkNGU2NGUzYmFmMTYzNDJiNDBjODIxNTE6YThlMjJhNjkwODNmNDljNmFhOWE5Yzk0ZWI5MGM4NTM=" -d grant_type=client_credentials https://accounts.spotify.com/api/token
