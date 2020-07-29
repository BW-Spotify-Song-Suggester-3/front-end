import React from "react";

const SuggestionCards = (props) => {
  return (
    <div>
      {
        console.log("suggestion card props:", props)

        // <div className="fav-songs-card">
        //   <div key={suggestion.spotifyid} className="song-cards">
        //     <img
        //       src={suggestion.album.images[0].url}
        //       alt={suggestion.album.name}
        //       className="album-covers"
        //     />
        //     <div className="info-container">
        //       <div className="info-box">
        //         <div className="title">{suggestion.name}</div>
        //         <div className="artist">{suggestion.artists[0].name}</div>
        //       </div>

        //       <embed src={suggestion.preview_url} className="song-preview" />
        //     </div>
        //   </div>
        // </div>
      }
    </div>
  );
};

export default SuggestionCards;
