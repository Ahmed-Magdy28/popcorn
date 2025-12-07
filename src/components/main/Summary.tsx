import { average } from '../../helper';
import type { TempWatchedData } from '../../types';

interface WatchedSummaryProps {
   watched: TempWatchedData[];
}

export function WatchedSummary({ watched }: WatchedSummaryProps) {
   const avgImdbRating = average(
      watched.map((movie) => Number(movie?.imdbRating) || 0),
   ).toFixed(1);
   const avgUserRating = average(
      watched.map((movie) => Number(movie?.userRating) || 0),
   ).toFixed(1);
   const avgRuntime = average(
      watched.map((movie) => Number(movie?.runtime) || 0),
   ).toFixed(1);
   return (
      <div className="summary">
         <h2>Movies you watched</h2>
         <div>
            <p>
               <span>#️⃣</span>
               <span>
                  {watched.length} {watched.length === 1 ? 'movie' : 'movies'}
               </span>
            </p>
            <p>
               <span>⭐️</span>
               <span>{avgImdbRating}</span>
            </p>
            <p>
               <span>🌟</span>
               <span>{avgUserRating}</span>
            </p>
            <p>
               <span>⏳</span>
               <span>{avgRuntime} min</span>
            </p>
         </div>
      </div>
   );
}
