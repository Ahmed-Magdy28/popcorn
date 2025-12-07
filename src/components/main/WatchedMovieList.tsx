import type { TempWatchedData, imdbID } from '../../types';

interface WatchedMoviesListProps {
   watched: TempWatchedData[];
   handleDeleteWatchedMovie: (id: imdbID) => void;
   handleSelectMovie: (id: imdbID) => void;
}

export function WatchedMoviesList({
   watched,
   handleDeleteWatchedMovie,
   handleSelectMovie,
}: WatchedMoviesListProps) {
   return (
      <ul className="list">
         {watched.map((movie, index) => (
            <WatchedMovie
               handleSelectMovie={handleSelectMovie}
               movie={movie}
               key={movie?.imdbID ?? `watched-${index}`}
               handleDeleteWatchedMovie={handleDeleteWatchedMovie}
            />
         ))}
      </ul>
   );
}

interface WatchedMovieProps {
   movie: TempWatchedData;
   handleSelectMovie: (id: imdbID) => void;
   handleDeleteWatchedMovie: (id: imdbID) => void;
}

export function WatchedMovie({
   movie,
   handleSelectMovie,
   handleDeleteWatchedMovie,
}: WatchedMovieProps) {
   if (!movie) return null;

   return (
      <>
         <li
            onClick={() => {
               handleSelectMovie(movie.imdbID ?? null);
            }}
         >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
               <p>
                  <span>⭐️</span>
                  <span>{movie.imdbRating}</span>
               </p>
               <p>
                  <span>🌟</span>
                  <span>{movie.userRating}</span>
               </p>
               <p>
                  <span>⏳</span>
                  <span>{movie.runtime} min</span>
               </p>
               <button
                  className="btn-delete"
                  onClick={(e) => {
                     e.stopPropagation();
                     handleDeleteWatchedMovie(movie.imdbID ?? null);
                  }}
               >
                  X
               </button>
            </div>
         </li>
      </>
   );
}
