import { useState, useEffect } from 'react';
import { FullIdlink } from '../config';
import { SetDataFromAPI } from '../helper';
import type { imdbID, movie } from '../types';

export const useSelectMovie = (
   selectedMovieId: imdbID,
   setError: (error: string | null) => void,
): {
   movie: movie;
   isloading: boolean;
} => {
   const [movie, setMovie] = useState<movie>(undefined);
   const [isloading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!selectedMovieId) return;
      const controller = new AbortController();
      const getmoviebyid = async (id: imdbID): Promise<void> => {
         if (!id) return;
         try {
            setIsLoading(true);
            await SetDataFromAPI(
               FullIdlink + id,
               controller.signal,
               setMovie,
               setError,
            );
         } catch (error) {
            console.log(error);
         } finally {
            setIsLoading((_) => false);
         }
      };

      getmoviebyid(selectedMovieId);
      return () => controller.abort();
   }, [selectedMovieId, setError]);

   return { movie, isloading };
};
