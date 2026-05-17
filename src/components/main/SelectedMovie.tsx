import { Loader } from '../Loader';
import { useSelectMovie } from '../../logic/useSelectMovie';
import { MovieDetails } from './MovieDetails';
import type { tempWatchedData, newWatchedMovie, imdbID } from '../../types';

export function SelectedMovieDetails({
   watched,
   selectedMovieId,
   setError,
   handleCloseMovie,
   onAddWatchedMovie,
}: {
   watched: tempWatchedData[];
   selectedMovieId: imdbID;
   setError: React.Dispatch<React.SetStateAction<string | null>>;
   handleCloseMovie: () => void;
   onAddWatchedMovie: (movie: newWatchedMovie) => void;
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
