import type { movie, imdbID } from '../../types';

export function MovieList({
   movies,
   handleSelectMovie,
}: {
   movies: movie[];
   handleSelectMovie: (id: imdbID) => void;
}) {
   return (
      <ul className="list">
         {movies?.map((movie) => (
            <Movie
               movie={movie}
               key={movie.imdbID}
               handleSelectMovie={handleSelectMovie}
            />
         ))}
      </ul>
   );
}

export function Movie({
   movie,
   handleSelectMovie,
}: {
   movie: movie;
   handleSelectMovie: (id: imdbID) => void;
}) {
   return (
      <li onClick={() => movie.imdbID && handleSelectMovie(movie.imdbID)}>
         <img src={movie.Poster} alt={`${movie.Title} poster`} />
         <h3>{movie.Title}</h3>
         <div>
            <p>
               <span>🗓</span>
               <span>{movie.Year}</span>
            </p>
         </div>
      </li>
   );
}
