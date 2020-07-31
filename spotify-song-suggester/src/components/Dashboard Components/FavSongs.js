import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { motion } from "framer-motion";

const FavSongs = (props) => {
  const [favSongs, setFavSongs] = useState([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    axiosWithAuth()
      .get(`songs/user/${props.userData}`)
      .then((res) => {
        console.log("Get Songs Request:", res);
        setFavSongs(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.userData]);

  //   const deleteSong = (songId) => {
  //     axiosWithAuth()
  //       .delete(`songs/delete/song/${songId}`)
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   };

  if (favSongs.length < 1) {
    return null;
  } else {
    return (
      <div className="fav-songs-card">
        {favSongs.map((song, index) => (
          <motion.div
            initial={{
              opacity: 1,
              y: 400,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.5 + index / 2,
            }}
            key={song.spotifyid}
            className="song-cards"
          >
            <img
              src={song.albumcover}
              alt={song.album}
              className="album-covers"
            />
            <div className="info-container">
              <div className="info-box">
                <div className="title">{song.name}</div>
                <div className="artist">{song.artist}</div>
              </div>
              <div className="action-container">
                {/* <div onClick={() => deleteSong(song.songid)}>
                  Edit / Remove
                </div> */}
                <Link className="action-box" to={`${url}/edit/${song.songid}`}>
                  Edit / Remove
                </Link>
                <Link
                  className="action-box"
                  to={`${url}/suggestions/${song.spotifyid}`}
                >
                  Suggestions
                </Link>
              </div>

              <embed src={song.previewurl} className="song-preview" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
};

const mapsStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapsStateToProps, {})(FavSongs);
