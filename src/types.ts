export type imdbID = string | null;
export type title = string | undefined;
export type poster = string | undefined;
export type runtime = number | string | undefined;
export type imdbRating = number | string | undefined;
export type year = string | number | undefined;
export type plot = string | undefined;
export type released = string | number;
export type actors = string | undefined;
export type director = string | undefined;
export type genre = string | undefined;
export type userRating = number | undefined;

export interface Movie {
   Title: title;
   Year: year;
   Poster: poster;
   Runtime: runtime;
   imdbRating?: imdbRating;
   Plot: plot;
   Released: released;
   Actors: actors;
   Director: director;
   Genre: genre;
   imdbID?: imdbID;
}

export type movie = Movie | undefined;

export interface TempMovieData {
   imdbID: imdbID;
   Title: title;
   Year: year;
   Poster: poster;
}

export type tempMovieData = TempMovieData | undefined;

export interface TempWatchedData {
   imdbID: imdbID;
   Title: title;
   Year: year;
   Poster: poster;
   runtime: runtime;
   imdbRating: imdbRating;
   userRating: userRating;
}

export type tempWatchedData = TempWatchedData | undefined;
export type initialValue = unknown;
export type query = string | null;

export interface NewWatchedMovie {
   imdbID: imdbID;
   Title: title;
   Year: year;
   Poster: poster;
   runtime: runtime;
   imdbRating: imdbRating;
   userRating: userRating;
}

export type newWatchedMovie = NewWatchedMovie | undefined;
