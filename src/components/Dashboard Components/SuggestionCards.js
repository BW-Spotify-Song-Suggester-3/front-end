import React from "react";
import { connect } from "react-redux";
import { saveSongAPI } from "../APIs/saveSongAPI";
import { motion } from "framer-motion";

const SuggestionCards = (props) => {
  const { recommendedSongs } = props;
  const ID = props.userData;

  const saveSong = (songData, userID) => {
    saveSongAPI(songData, userID);
  };

  return (
    <div>
      {recommendedSongs.map((song, index) => (
        <motion.div
          initial={{
            opacity: 1,
            y: 150,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1 + index / 5,
          }}
          className="fav-songs-card"
          key={song.spotifyid}
        >
          <div key={song.spotifyid} className="song-cards">
            <img
              src={song.album.images[0].url}
              alt={song.album.name}
              className="album-covers"
            />
            <div className="info-container">
              <div className="info-box">
                <div className="title">{song.name}</div>
                <div className="artist">{song.artists[0].name}</div>
              </div>
              <div className="action-box">
                <div className="save" onClick={() => saveSong(song, ID)}>
                  Save Song
                </div>
              </div>

              <embed src={song.preview_url} className="song-preview" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    recommendedSongs: state.recommendedSongs,
  };
};

export default connect(mapStateToProps, {})(SuggestionCards);
