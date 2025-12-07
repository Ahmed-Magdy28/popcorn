import { useSearch } from '../../logic/useSearch';

interface SearchProps {
   setSearchQuery: (query: string) => void;
}

export function Search({ setSearchQuery }: SearchProps) {
   const { query, handleSubmit, setQuery, inputEl } = useSearch(setSearchQuery);

   return (
      <>
         <form onSubmit={handleSubmit}>
            <input
               className="search"
               type="text"
               placeholder="Search movies..."
               value={query}
               onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchQuery(e.target.value);
               }}
               ref={inputEl}
            />
         </form>
      </>
   );
}
