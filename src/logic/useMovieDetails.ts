import { useState, useEffect } from 'react';
import { useKey } from './useKey';
import type { movie, tempWatchedData, newWatchedMovie } from '../types';
export const useMovieDetails = (
   movie: movie,
   watched: tempWatchedData[],
   onAddWatchedMovie: (data: newWatchedMovie) => void,
   handleCloseMovie: () => void,
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

   const oldUserRating = watched.find(
      (movie) => movie?.imdbID === imdbID,
   )?.userRating;

   useEffect(() => {
      if (!movie) return;

      const checkRatedBefore = () => {
         const alreadyRated = watched.some((movie) => movie?.imdbID === imdbID);
         setRatedBefore(alreadyRated);
      };

      checkRatedBefore();
   }, [userRating, movie, imdbID, watched]);

   useKey('Escape', handleCloseMovie);

   useEffect(() => {
      if (!movie) return;
      // Set the title when effect runs
      document.title = title ? `Movie | ${title}` : 'Popcorn App';

      // Cleanup: reset the title when component unmounts
      return () => {
         document.title = 'Popcorn App';
      };
   }, [title, movie]);

   if (!movie) return;
   const handleonAdd = () => {
      const newWatchedMovie = {
         imdbID: imdbID || '',
         Title: title,
         Year: year || 0,
         Poster: poster,
         runtime: Number(String(runtime)?.split(' ').at(0)) || 0,
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
