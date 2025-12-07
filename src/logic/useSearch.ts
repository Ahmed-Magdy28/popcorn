import { useRef, useState } from 'react';
import { useKey } from './useKey';

export const useSearch = (
   setSearchQuery: (query: string) => void,
): {
   query: string;
   setQuery: React.Dispatch<React.SetStateAction<string>>;
   handleSubmit: (e: React.FormEvent) => void;
   inputEl: React.RefObject<HTMLInputElement | null>;
} => {
   const [query, setQuery] = useState('');
   const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      setSearchQuery(query);
      setQuery((_) => '');
   };

   const inputEl = useRef<HTMLInputElement>(null);

   useKey('Enter', () => {
      if (document.activeElement === inputEl.current) return;
      inputEl.current?.focus();
      setSearchQuery('');
   });

   return { query, setQuery, handleSubmit, inputEl };
};
