import { useState, useEffect } from 'react';
import { useKey } from './useKey';
export const useMovieDetails = (
   movie,
   watched,
   onAddWatchedMovie,
   handleCloseMovie
) => {
   const [ratedbefore, setRatedBefore] = useState(false);
   const [userRating, setUserRating] = useState(0);

   const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre,
      imdbID: imdbID,
   } = movie || {};
   if (!movie) return;

   const oldUserRating = watched.find(
      (movie) => movie.imdbID === imdbID
   )?.userRating;

   const checkRatedBefore = () => {
      const alreadyRated = watched.some((movie) => movie.imdbID === imdbID);
      setRatedBefore(alreadyRated);
   };

   useEffect(() => {
      if (!movie) return;
      checkRatedBefore();
   }, [userRating]);

   useKey('Escape', handleCloseMovie);

   useEffect(() => {
      // Set the title when effect runs
      document.title = title ? `Movie | ${title}` : 'Popcorn App';

      // Cleanup: reset the title when component unmounts
      return () => {
         document.title = 'Popcorn App';
      };
   }, [title]);

   const handleonAdd = () => {
      const newWatchedMovie = {
         imdbID: imdbID,
         Title: title,
         Year: year || 0,
         Poster: poster,
         runtime: Number(runtime.split(' ').at(0)) || 0,
         imdbRating: Number(imdbRating) || 0,
         userRating: userRating,
      };
      onAddWatchedMovie(newWatchedMovie);
      handleCloseMovie();
   };

   return {
      title,
      poster,
      released,
      runtime,
      plot,
      genre,
      actors,
      imdbRating,
      ratedbefore,
      oldUserRating,
      setUserRating,
      handleonAdd,
      userRating,
      director,
   };
};
