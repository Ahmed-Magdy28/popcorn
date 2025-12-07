import { NavBar } from './components/header/NavBar';
import { Main } from './components/main/main';
import { NumResults } from './components/header/NumResults';
import { Search } from './components/header/Search';
import { MovieList } from './components/main/MovieList';
import { WatchedMoviesList } from './components/main/WatchedMovieList';
import { WatchedSummary } from './components/main/Summary';
import { Box } from './components/main/Box';
import { SelectedMovieDetails } from './components/main/SelectedMovie';
import { Loader, ErrorMessage } from './components/Loader';
import { useMovies } from './logic/useMovies';
import { useWatchedMovies } from './logic/useWatchedMovies';

export default function App() {
   const {
      movies,
      error,
      selectedMovieId,
      setSelectedMovieId,
      setError,
      isMovieListLoading,
      setSearchQuery,
   } = useMovies();
   const {
      watched,
      handleAddWatchedMovie,
      handleDeleteWatchedMovie,
      handleSelectMovie,
      handleCloseMovie,
   } = useWatchedMovies(setSelectedMovieId);

   return (
      <>
         <NavBar>
            <Search setSearchQuery={setSearchQuery} />
            <NumResults length={movies.length} />
         </NavBar>
         <Main>
            <Box>
               {isMovieListLoading && <Loader />}
               {!isMovieListLoading && !error && (
                  <MovieList
                     movies={movies}
                     handleSelectMovie={handleSelectMovie}
                  />
               )}
               {error && <ErrorMessage message={error} />}
            </Box>
            <Box>
               {selectedMovieId ? (
                  <SelectedMovieDetails
                     watched={watched}
                     onAddWatchedMovie={handleAddWatchedMovie}
                     selectedMovieId={selectedMovieId}
                     setError={setError}
                     handleCloseMovie={handleCloseMovie}
                  />
               ) : (
                  <>
                     {' '}
                     <WatchedSummary watched={watched} />
                     <WatchedMoviesList
                        watched={watched}
                        handleSelectMovie={handleSelectMovie}
                        handleDeleteWatchedMovie={handleDeleteWatchedMovie}
                     />
                  </>
               )}
            </Box>
         </Main>
      </>
   );
}
