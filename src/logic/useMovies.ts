import { useEffect, useState } from 'react';
import { FullSearchlink } from '../config';
import { SetDataFromAPI } from '../helper';
import { timeOutSetter } from '../helper';
import type { query, imdbID, TempMovieData } from '../types';

export const useMovies = (): {
   movies: TempMovieData[];
   error: string | null;
   selectedMovieId: imdbID;
   setSelectedMovieId: React.Dispatch<React.SetStateAction<imdbID>>;
   setError: React.Dispatch<React.SetStateAction<string | null>>;
   isMovieListLoading: boolean;
   searchQuery: string;
   setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
} => {
   const [movies, setMovies] = useState<TempMovieData[]>([]);
   const [isMovieListLoading, setIsMovieListLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [selectedMovieId, setSelectedMovieId] = useState<imdbID>(null);
   const [searchQuery, setSearchQuery] = useState('');

   useEffect(() => {
      if (!searchQuery) return; // no search → do nothing
      //   controller to control fetch aborting
      const controller = new AbortController();
      const getMovies = async (query: query): Promise<void> => {
         if (!query) return;
         console.log(query);
         try {
            setIsMovieListLoading((_) => true);
            await SetDataFromAPI(
               FullSearchlink + searchQuery,
               controller.signal,
               setMovies,
               setError,
            );
         } catch (error: unknown) {
            if (error instanceof Error) {
               console.error('Message:', error.message);
            } else {
               console.error('Unknown error:', error);
            }
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
