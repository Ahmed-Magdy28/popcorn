import type { tempWatchedData, imdbID } from '../../types';

export function WatchedMoviesList({
   watched,
   handleDeleteWatchedMovie,
   handleSelectMovie,
}: {
   watched: NonNullable<tempWatchedData>[];
   handleDeleteWatchedMovie: (id: imdbID) => void;
   handleSelectMovie: (id: imdbID) => void;
}) {
   return (
      <ul className="list">
         {watched.map((movie) => (
            <WatchedMovie
               handleSelectMovie={handleSelectMovie}
               movie={movie}
               key={movie.imdbID}
               handleDeleteWatchedMovie={handleDeleteWatchedMovie}
            />
         ))}
      </ul>
   );
}

export function WatchedMovie({
   movie,
   handleSelectMovie,
   handleDeleteWatchedMovie,
}: {
   movie: NonNullable<tempWatchedData>;
   handleSelectMovie: (id: imdbID) => void;
   handleDeleteWatchedMovie: (id: imdbID) => void;
}) {
   return (
      <>
         <li
            onClick={() => {
               handleSelectMovie(movie.imdbID);
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
                     handleDeleteWatchedMovie(movie.imdbID);
                  }}
               >
                  X
               </button>
            </div>
         </li>
      </>
   );
}
