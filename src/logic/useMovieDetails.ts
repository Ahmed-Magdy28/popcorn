import { useState, useEffect } from 'react';
import { useKey } from './useKey';
import type {
   movie,
   TempWatchedData,
   NewWatchedMovie,
   title,
   poster,
   released,
   runtime,
   plot,
   genre,
   actors,
   director,
   imdbRating,
   userRating,
} from '../types';

interface UseMovieDetailsReturn {
   title: title;
   poster: poster;
   released: released | undefined;
   runtime: runtime;
   plot: plot;
   genre: genre;
   actors: actors;
   imdbRating: imdbRating;
   ratedbefore: boolean;
   oldUserRating: userRating;
   setUserRating: React.Dispatch<React.SetStateAction<number>>;
   handleonAdd: () => void;
   userRating: number;
   director: director;
}

export const useMovieDetails = (
   movie: movie,
   watched: TempWatchedData[],
   onAddWatchedMovie: (data: NewWatchedMovie) => void,
   handleCloseMovie: () => void,
): UseMovieDetailsReturn | undefined => {
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
