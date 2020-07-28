import axios from "axios";

export const axiosWithAuthSpotify = () => {
  const token =
    "BQDefugE6544tlm_VWQTDL1h8E1KsY_dEsq7hUljIQ1Uqwc9Mk1BAGzO2BLxYsoXmhqy9WHk0HjPz3bZI8Q";
  return axios.create({
    baseURL: "https://api.spotify.com/v1/tracks/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
