import { Loader } from '../Loader.jsx';
import { useSelectMovie } from '../../logic/useSelectMovie.js';
import { MovieDetails } from './MovieDetails.jsx';

export function SelectedMovieDetails({
   watched,
   selectedMovieId,
   setError,
   handleCloseMovie,
   onAddWatchedMovie,
}) {
   const { movie, isloading } = useSelectMovie(selectedMovieId, setError);
   return (
      <>
         {isloading ? (
            <Loader />
         ) : (
            <div className="details">
               {movie ? (
                  <>
                     <div className="details">
                        <MovieDetails
                           movie={movie}
                           watched={watched}
                           handleCloseMovie={handleCloseMovie}
                           onAddWatchedMovie={onAddWatchedMovie}
                        />
                     </div>
                  </>
               ) : selectedMovieId ? (
                  <Loader />
               ) : (
                  <>{<p>No movie selected{movie}</p>}</>
               )}
            </div>
         )}
      </>
   );
}
