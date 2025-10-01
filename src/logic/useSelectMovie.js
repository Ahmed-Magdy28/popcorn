import { useState, useEffect } from 'react';
import { FullIdlink } from '../config.js';
import { SetDataFromAPI } from '../helper.js';

export const useSelectMovie = (selectedMovieId, setError) => {
   const [movie, setMovie] = useState(null);
   const [isloading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!selectedMovieId) return;
      const controller = new AbortController();
      const getmoviebyid = async (id) => {
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
         } finally {
            setIsLoading((_) => false);
         }
      };

      getmoviebyid(selectedMovieId);
      return () => controller.abort();
   }, [selectedMovieId]);

   return { movie, isloading };
};
