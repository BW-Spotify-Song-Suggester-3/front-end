import axios from "axios";

export const axiosWithAuthSpotify = () => {
  const token =
    "BQCv5vVTZEgSxKwDUeUeTJzOQAHgE8PYJ2bLK1qs0svPOOKNsPzJHYBSKmTVujO0blA-yKYJ1FYKJ_GhgfQ";
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
// https://open.spotify.com/track/5kDeYoYdLnW8ILTXdbiXjJ
