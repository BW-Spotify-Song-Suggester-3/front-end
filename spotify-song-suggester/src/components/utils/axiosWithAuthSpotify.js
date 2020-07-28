import axios from "axios";

export const axiosWithAuthSpotify = () => {
  const token =
    "BQCI7S-1Ky6yJpu8cXq66tiRzvrKLYISXV3Pb1mUYrsFrp4nKZgfCkGBFxk-hmdjxiyvXyY6l53pGnElpAs";
  return axios.create({
    baseURL: "https://api.spotify.com/v1/tracks/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
