import StarRating from '../StarRating';
import { useMovieDetails } from '../../logic/useMovieDetails';
import type { movie, TempWatchedData, NewWatchedMovie } from '../../types';

interface MovieDetailsProps {
   watched: TempWatchedData[];
   movie: movie;
   handleCloseMovie: () => void;
   onAddWatchedMovie: (movie: NewWatchedMovie) => void;
}

export function MovieDetails({
   watched,
   movie,
   handleCloseMovie,
   onAddWatchedMovie,
}: MovieDetailsProps) {
   const movieDetails = useMovieDetails(
      movie,
      watched,
      onAddWatchedMovie,
      handleCloseMovie,
   );

   if (!movieDetails) return null;

   const {
      title,
      poster,
      released,
      runtime,
      plot,
      genre,
      actors,
      director,
      imdbRating,
      ratedbefore,
      oldUserRating,
      setUserRating,
      handleonAdd,
      userRating,
   } = movieDetails;

   return (
      <>
         <header>
            <button className="btn-back" onClick={handleCloseMovie}>
               &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
               <h2>{title}</h2>
               <p>
                  {released} &bull; {runtime}
               </p>
               <p>{genre}</p>
               <p>
                  <span>🌟</span>
                  {imdbRating}
               </p>
            </div>
         </header>
         <section>
            {ratedbefore && <p>You rated this movie with {oldUserRating} 🌟</p>}
            <StarRating
               size={24}
               defaultRating={
                  oldUserRating || (imdbRating ? Number(imdbRating) : 0)
               }
               maxRating={10}
               onSetRating={setUserRating}
            />
            {ratedbefore && (
               <button className="btn-add" onClick={handleonAdd}>
                  Update rating
               </button>
            )}
            {!ratedbefore && userRating > 0 && (
               <button className="btn-add" onClick={handleonAdd}>
                  Add to watched
               </button>
            )}

            <em>
               <p>{plot}</p>
            </em>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
         </section>
      </>
   );
}
