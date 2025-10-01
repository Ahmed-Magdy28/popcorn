import { useEffect, useState } from 'react';
import { FullSearchlink } from '../config.js';
import { SetDataFromAPI } from '../helper.js';
import { timeOutSetter } from '../helper.js';
export const useMovies = () => {
   const [movies, setMovies] = useState([]);
   const [isMovieListLoading, setIsMovieListLoading] = useState(false);
   const [error, setError] = useState(null);
   const [selectedMovieId, setSelectedMovieId] = useState(null);
   const [searchQuery, setSearchQuery] = useState('');

   useEffect(() => {
      if (!searchQuery) return; // no search → do nothing
      //   controller to control fetch aborting
      const controller = new AbortController();
      const getMovies = async (query) => {
         if (!query) return;
         try {
            setIsMovieListLoading((_) => true);
            await SetDataFromAPI(
               FullSearchlink + searchQuery,
               controller.signal,
               setMovies,
               setError
            );
         } catch (error) {
            console.error(error.message);
         } finally {
            setIsMovieListLoading((_) => false);
         }
      };
      getMovies(searchQuery);
      setSelectedMovieId(null);
      //   when component unmounts or searchQuery changes abort fetch
      return () => controller.abort();
   }, [searchQuery]);

   useEffect(() => {
      const cleanup = timeOutSetter(setError, null);
      return cleanup; // ensures old timers are cleared
   }, [error]);

   return {
      movies,
      error,
      selectedMovieId,
      setSelectedMovieId,
      setError,
      isMovieListLoading,
      searchQuery,
      setSearchQuery,
   };
};
