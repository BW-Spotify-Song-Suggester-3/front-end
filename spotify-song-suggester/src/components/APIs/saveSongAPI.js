import { axiosWithAuth } from "../utils/axiosWithAuth";

export const saveSongAPI = (songData, userID) => {
  console.log("save api reached", songData, userID);

  let newSong = {
    // songid: 8,
    name: songData.name,
    artist: songData.artists[0].name,
    spotifyid: songData.id,
    album: songData.album.name,
    previewurl: songData.preview_url,
    albumcover: songData.album.images[1].url,
    releasedate: songData.album.release_date,
  };

  console.log(newSong);

  axiosWithAuth()
    .post(`songs/create/user/4/song`, newSong)
    .then((res) => {
      console.log(res);

      axiosWithAuth()
        .get(`songs/user/4`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};
