import { TimeoutSeconds } from './config.js';
export const average = (arr) =>
   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const timeOutSetter = (setterFunction, setterData) => {
   const id = setTimeout(() => {
      setterFunction(setterData);
   }, TimeoutSeconds * 1000);

   return () => clearTimeout(id); // return cleanup
};

/**
 * Fetches movie data from the API and handles common errors.
 *
 * @async
 * @function fetchAPIData
 * @param {string} link - The full API endpoint URL (including query parameters).
 * @param {AbortSignal} signal - The AbortController signal to cancel the request if needed.
 *
 * @returns {Promise<Object>} The parsed JSON response from the API if successful.
 *
 * @throws {Error} Will throw an error in the following cases:
 * - If no `link` is provided.
 * - If the network request fails (`res.ok` is false).
 * - If the API response indicates failure:
 *   - `"Too many results."` → instructs user to refine their search.
 *   - Any other `Error` message returned by the API.
 *   - If `Response` is not `"True"`, meaning no valid results were found.
 *
 * @example
 * const controller = new AbortController();
 * try {
 *   const data = await fetchAPIData(
 *     "https://www.omdbapi.com/?apikey=1234&s=inception",
 *     controller.signal
 *   );
 *   console.log(data.Search); // Movie results
 * } catch (err) {
 *   console.error(err.message); // Handles API or network errors
 * }
 */
const fetchAPIData = async (link, signal) => {
   // If no link provided, abort early
   if (!link) throw new Error('No link provided');

   // Perform fetch request
   const res = await fetch(link, { signal });
   if (!res.ok) throw new Error('❌ Network error: Failed to fetch data');

   // Parse response JSON
   const data = await res.json();

   // Successful response
   if (data.Response === 'True') return data;

   // Handle specific API errors
   if (data.status === 522) throw new Error('Error 522 server is down!');

   // "Too many results." error in popcorn app
   if (data.Error === 'Too many results.')
      throw new Error('please be more specific');
   else if (data.response !== 'true') throw new Error('Something went wrong!');
   else throw new Error('movie not found!');
};

export const getDataFromAPI = async (link, signal) => {
   const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
         () => reject(new Error('⏳ Request timed out')),
         TimeoutSeconds * 1000,
      ),
   );
   return Promise.race([fetchAPIData(link, signal), timeoutPromise]);
};

export const SetDataFromAPI = async (
   link,
   signal,
   setterFunction,
   setError,
   isActive = true,
) => {
   try {
      if (!link) {
         setError('No link provided');
         return;
      }
      const data = await getDataFromAPI(link, signal);

      if (setterFunction) {
         // in search
         if (isActive && data?.Search) {
            setterFunction(data.Search);
            setError(null);

            return;
         }
         // in selected movie
         else setterFunction(data);
         return;
      }
      if (data.Response === 'True') return data;
   } catch (error) {
      if (error.message === 'please be more specific') {
         setterFunction([]);
         setError(error.message);
         return;
      }
      if (error.name !== 'AbortError') setError(` ${error.message}`);
   }
};
