import { useLocalStorage } from './useLocalStorage';
export const useWatchedMovies = (setSelectedMovieId) => {
   const [watched, setWatched] = useLocalStorage('watched', []);

   const handleSelectMovie = (id) => {
      setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
   };
   const handleCloseMovie = () => {
      setSelectedMovieId((_) => null);
   };

   const handleAddWatchedMovie = (newWatchedMovie) =>
      setWatched((prevWatchedList) => {
         // Check if the movie already exists in the watched list
         const isMovieExist = prevWatchedList.some(
            (oldWatchedMovie) =>
               oldWatchedMovie.imdbID === newWatchedMovie.imdbID
         );
         if (isMovieExist) {
            // Update existing movie
            return prevWatchedList.map((oldWatchedMovie) =>
               oldWatchedMovie.imdbID === newWatchedMovie.imdbID
                  ? { ...oldWatchedMovie, ...newWatchedMovie }
                  : oldWatchedMovie
            );
         }
         // Add new movie
         return [...prevWatchedList, newWatchedMovie];
      });

   const handleDeleteWatchedMovie = (id) => {
      setWatched((prevWatchedList) =>
         prevWatchedList.filter((movie) => movie.imdbID !== id)
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
