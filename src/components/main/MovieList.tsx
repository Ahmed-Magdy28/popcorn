import type { TempMovieData, imdbID } from '../../types';

interface MovieListProps {
   movies: TempMovieData[];
   handleSelectMovie: (id: imdbID) => void;
}

export function MovieList({ movies, handleSelectMovie }: MovieListProps) {
   return (
      <ul className="list">
         {movies?.map((movie) => (
            <Movie
               movie={movie}
               key={movie?.imdbID ?? ''}
               handleSelectMovie={handleSelectMovie}
            />
         ))}
      </ul>
   );
}

interface MovieProps {
   movie: TempMovieData;
   handleSelectMovie: (id: imdbID) => void;
}

export function Movie({ movie, handleSelectMovie }: MovieProps) {
   return (
      <li onClick={() => handleSelectMovie(movie?.imdbID ?? null)}>
         <img src={movie?.Poster} alt={`${movie?.Title} poster`} />
         <h3>{movie?.Title}</h3>
         <div>
            <p>
               <span>🗓</span>
               <span>{movie?.Year}</span>
            </p>
         </div>
      </li>
   );
}
