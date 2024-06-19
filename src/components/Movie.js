// import React from "react";
// export const MovieCard = ({ movie, selectMovie }) => {
//   const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";
//   return (
//     <div className="movie-card" onClick={() => selectMovie(movie)}>
//       {movie.poster_path ? (
//         <img
//           className="movie-cover"
//           src={`${IMAGE_PATH}${movie.poster_path}`}
//           alt="{movie.title}"
//         />
//       ) : (
//         <div className="movie-placeholder"></div>
//       )}
//       <h5 className="movie-title">{movie.title}</h5>
//     </div>
//   );
// };

// export default MovieCard;

import React from "react";

const Movie = ({ movie, selectMovie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

  return (
    <div onClick={() => selectMovie(movie)} className={"movie"}>
      <div className="movie-title">
        {/* {movie.poster_path && (
          <img src={IMAGE_PATH + movie.poster_path} alt={movie.title} />
        )} */}
        {movie.poster_path ? (
          <img src={IMAGE_PATH + movie.poster_path} alt={movie.title} />
        ) : (
          <div className="movie-placeholder"></div>
        )}
        <div className={"flex between movie-infos"}>
          <h5 className={"movie-title"}>{movie.title}</h5>
          {movie.vote_average ? (
            <span className={"movie-voting"}>{movie.vote_average}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Movie;
