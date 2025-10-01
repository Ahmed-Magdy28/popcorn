import { NavBar } from './components/header/NavBar.jsx';
import { Main } from './components/main/main.jsx';
import { NumResults } from './components/header/NumResults.jsx';
import { Search } from './components/header/Search.jsx';
import { MovieList } from './components/main/MovieList.jsx';
import { WatchedMoviesList } from './components/main/WatchedMovieList.jsx';
import { WatchedSummary } from './components/main/Summary.jsx';
import { Box } from './components/main/Box.jsx';
import { SelectedMovieDetails } from './components/main/SelectedMovie.jsx';
import { Loader, ErrorMessage } from './components/Loader.jsx';
import { useMovies } from './logic/useMovies.js';
import { useWatchedMovies } from './logic/useWatchedMovies.js';
import './App.css';

export default function App() {
   const {
      movies,
      error,
      selectedMovieId,
      setSelectedMovieId,
      setError,
      isMovieListLoading,
      searchQuery,
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
