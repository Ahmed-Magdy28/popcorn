import { useSearch } from '../../logic/useSearch';

export function Search({ setSearchQuery }) {
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
