/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { FullIdlink } from '../config';
import { SetDataFromAPI } from '../helper';
import type { movie } from '../types';

export const useSelectMovie = (
   selectedMovieId: string | null,
   setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
   const [movie, setMovie] = useState<movie | null>(null);
   const [isloading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!selectedMovieId) return;
      const controller = new AbortController();
      const getmoviebyid = async (id: string) => {
         if (!id) return;
         try {
            setIsLoading(true);
            await SetDataFromAPI(
               FullIdlink + id,
               controller.signal,
               setMovie,
               setError
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
