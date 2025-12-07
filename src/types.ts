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

export type movie =
   | {
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
   | undefined;
export type tempMovieData =
   | { imdbID: imdbID; Title: title; Year: year; Poster: poster }
   | undefined;
export type tempWatchedData =
   | {
        imdbID: imdbID;
        Title: title;
        Year: year;
        Poster: poster;
        runtime: runtime;
        imdbRating: imdbRating;
        userRating: userRating;
     }
   | undefined;
export type initialValue = unknown;
export type query = string | null;
export type newWatchedMovie =
   | {
        imdbID: imdbID;
        Title: title;
        Year: year;
        Poster: poster;
        runtime: runtime;
        imdbRating: imdbRating;
        userRating: userRating;
     }
   | undefined;
