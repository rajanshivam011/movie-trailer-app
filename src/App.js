// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css";
// import MovieCard from "./components/MovieCard";
// import YouTube from "react-youtube";

// function App() {
//   const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
//   const API_URL = "https://api.themoviedb.org/3";
//   const API_KEY = "6d95f3ad58debfcc097939bfe75e08b3";

//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState({});
//   const [searchKey, setSearchKey] = useState("");
//   const [playTrailer, setPlayTrailer] = useState(false);

//   const fetchMovies = async (searchKey) => {
//     const type = searchKey ? "search" : "discover";
//     const {
//       data: { results },
//     } = await axios.get(`${API_URL}/${type}/movie`, {
//       params: {
//         api_key: API_KEY,
//         query: searchKey,
//       },
//     });
//     setMovies(results);
//     await selectMovie(results[0]);
//   };

//   const fetchMovie = async (id) => {
//     const { data } = await axios.get(`${API_URL}/movie/${id}`, {
//       params: {
//         api_key: API_KEY,
//         append_to_response: "videos",
//       },
//     });
//     return data;
//   };

//   const selectMovie = async (movie) => {
//     setPlayTrailer(false);
//     const data = await fetchMovie(movie.id);
//     setSelectedMovie(data);
//     window.scrollTo(0, 0);
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const renderMovies = () =>
//     movies.map((movie) => (
//       <MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} />
//     ));

//   const searchMovies = (e) => {
//     e.preventDefault();
//     fetchMovies(searchKey);
//   };

//   const renderTrailer = () => {
//     const trailer = selectedMovie.videos.results.find(
//       (vid) => vid.name === "Official Trailer"
//     );
//     const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;
//     return (
//       <YouTube
//         videoId={key}
//         containerClassName={"youtube-container"}
//         opts={{
//           width: "100%",
//           height: "100%",
//           playerVars: {
//             autoplay: 1,
//           },
//         }}
//       />
//     );
//   };
//   return (
//     <div className="App">
//       <header className="header">
//         <div className="header-content max-center">
//           <span className="app--name">Movie Trailer App</span>
//           <form onSubmit={searchMovies}>
//             <input
//               className="search--bar"
//               type="text"
//               onChange={(event) => setSearchKey(event.target.value)}
//             />
//             <button className="button submit--btn" type="submit">
//               Search{" "}
//             </button>
//             {playTrailer ? (
//               <button
//                 className="button btn--close"
//                 style={{ visibility: "visible" }}
//                 onClick={() => setPlayTrailer(false)}
//               >
//                 Close Video
//               </button>
//             ) : null}
//           </form>
//         </div>
//       </header>
//       <div
//         className="hero"
//         style={{
//           backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url(${BACKDROP_PATH}${selectedMovie.backdrop_path})`,
//         }}
//       >
//         <div className="hero-content max-center">
//           {selectedMovie.videos && playTrailer ? renderTrailer() : null}
//           <button
//             className="button"
//             onClick={() => {
//               setPlayTrailer(true);
//             }}
//           >
//             Play Trailer
//           </button>
//           <h1 className="hero-title">{selectedMovie.title}</h1>
//           {selectedMovie.overview ? (
//             <p className="hero-overview">{selectedMovie.overview}</p>
//           ) : null}
//         </div>
//       </div>

//       <div className="container max-center">{renderMovies()}</div>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Movie from "./components/Movie";
import Youtube from "react-youtube";

function App() {
  const MOVIE_API = "https://api.themoviedb.org/3/";
  const SEARCH_API = MOVIE_API + "search/movie";
  const DISCOVER_API = MOVIE_API + "discover/movie";
  const API_KEY = "6d95f3ad58debfcc097939bfe75e08b3";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState({ title: "Loading Movies" });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const { data } = await axios.get(
      `${searchKey ? SEARCH_API : DISCOVER_API}`,
      {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      }
    );
    setMovies(data.results);
    setMovie(data.results[0]);

    if (data.results.length) {
      await fetchMovie(data.results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };

  const selectMovie = (movie) => {
    fetchMovie(movie.id);
    setPlaying(false);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const renderMovies = () =>
    movies.map((movie) => (
      <Movie selectMovie={selectMovie} key={movie.id} movie={movie} />
    ));

  return (
    <div className="App">
      <header className="center-max-size header">
        <span className={"brand"}>Movie Trailer App</span>
        <form className="form" onSubmit={fetchMovies}>
          <input
            className="search"
            placeholder="Search"
            type="text"
            id="search"
            onInput={(event) => setSearchKey(event.target.value)}
          />
          <button
            className="submit-search"
            type="submit"
            onClick={() => setPlaying(false)}
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
      </header>
      {movies.length ? (
        <main>
          {movie ? (
            <div
              className="poster"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`,
              }}
            >
              {playing ? (
                <>
                  <Youtube
                    videoId={trailer.key}
                    className={"youtube amru"}
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                      },
                    }}
                  />
                  <button
                    onClick={() => setPlaying(false)}
                    className={"close-video"}
                  >
                    &times;
                  </button>
                </>
              ) : (
                <div className="center-max-size">
                  <div className="poster-content">
                    {trailer ? (
                      <button
                        className={"button play-video"}
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className={"center-max-size container"}>{renderMovies()}</div>
        </main>
      ) : (
        "Sorry, no movies found"
      )}
    </div>
  );
}

export default App;
