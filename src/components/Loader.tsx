export function Loader() {
   return (
      <>
         <p className="loader">Loading....</p>
      </>
   );
}
export function ErrorMessage({ message }: { message: string }) {
   return (
      <>
         <p className="error">
            <span>🛑</span>
            {message}
         </p>
      </>
   );
}
