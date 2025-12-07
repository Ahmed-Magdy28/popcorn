interface NumResultsProps {
   length: number;
}

export function NumResults({ length }: NumResultsProps) {
   return (
      <p className="num-results">
         Found <strong>{length}</strong> results
      </p>
   );
}
