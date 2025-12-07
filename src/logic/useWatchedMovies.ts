import type { imdbID, TempWatchedData, NewWatchedMovie } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useWatchedMovies = (
   setSelectedMovieId: React.Dispatch<React.SetStateAction<imdbID>>,
): {
   watched: TempWatchedData[];
   handleAddWatchedMovie: (newWatchedMovie: NewWatchedMovie) => void;
   handleDeleteWatchedMovie: (id: imdbID) => void;
   handleSelectMovie: (id: imdbID) => void;
   handleCloseMovie: () => void;
} => {
   const [watched, setWatched] = useLocalStorage<TempWatchedData[]>(
      'watched',
      [],
   );

   const handleSelectMovie = (id: imdbID): void => {
      setSelectedMovieId((selectedId: imdbID) =>
         selectedId === id ? null : id,
      );
   };
   const handleCloseMovie = (): void => {
      setSelectedMovieId((_: unknown) => null);
   };

   const handleAddWatchedMovie = (newWatchedMovie: NewWatchedMovie): void => {
      setWatched((prevWatchedList) => {
         // Check if the movie already exists in the watched list
         const isMovieExist = prevWatchedList.some(
            (oldWatchedMovie) =>
               oldWatchedMovie?.imdbID === newWatchedMovie.imdbID,
         );
         if (isMovieExist) {
            // Update existing movie
            return prevWatchedList.map((oldWatchedMovie) =>
               oldWatchedMovie?.imdbID === newWatchedMovie.imdbID
                  ? { ...oldWatchedMovie, ...newWatchedMovie }
                  : oldWatchedMovie,
            );
         }
         // Add new movie
         return [...prevWatchedList, newWatchedMovie];
      });
   };

   const handleDeleteWatchedMovie = (id: imdbID): void => {
      setWatched((prevWatchedList) =>
         prevWatchedList.filter((movie) => movie?.imdbID !== id),
      );
   };

   return {
      watched,
      handleAddWatchedMovie,
      handleDeleteWatchedMovie,
      handleSelectMovie,
      handleCloseMovie,
   };
};
