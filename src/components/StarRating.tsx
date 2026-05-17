import { useState, type CSSProperties } from 'react';

// --- TYPE DEFINITIONS ---

// 1. Star component Props
interface StarProps {
   onClick: () => void;
   onHoverIn: () => void;
   onHoverOut: () => void;
   isfilled: boolean;
   size: number;
   color: string;
}

// 2. StarRating component Props
interface StarRatingProps {
   maxRating?: number;
   color?: string;
   size?: number;
   className?: string;
   message?: string[]; // Array of strings for messages
   defaultRating?: number;
   onSetRating?: (rating: number) => void;
}

// --- STYLES (now properly typed as CSSProperties) ---

const containerStyle: CSSProperties = {
   display: 'flex',
   alignItems: 'center',
   gap: '16px',
};

const starContainerStyle: CSSProperties = {
   display: 'flex',
};

// --- STAR COMPONENT ---

export function Star({
   onClick,
   isfilled,
   onHoverIn,
   onHoverOut,
   size,
   color,
}: StarProps) {
   const starStyle: CSSProperties = {
      width: `${size}px`,
      height: `${size}px`,
      display: 'block',
      cursor: 'pointer',
   };

   return (
      <span
         style={starStyle}
         role="button"
         onClick={onClick}
         onMouseEnter={onHoverIn}
         onMouseLeave={onHoverOut}
      >
         {isfilled ? (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill={color}
               stroke={color}
            >
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
         ) : (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke="#000"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2} // strokeWidth should be a number for SVG props
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
               />
            </svg>
         )}
      </span>
   );
}

// --- STAR RATING COMPONENT ---

export default function StarRating({
   maxRating = 5,
   color = '#fcc419',
   size = 48,
   className = '',
   message = [], // Changed default to empty array
   defaultRating = 0,
   onSetRating,
}: StarRatingProps) {
   // State is explicitly typed as number
   const [rating, setRating] = useState<number>(defaultRating);
   const [tempRating, setTempRating] = useState<number>(0);

   const textStyle: CSSProperties = {
      lineHeight: 1.2,
      margin: 0,
      color,
      fontSize: `${size / 1.5}px`,
      fontWeight: 'bold',
   };

   const handleRating = (index: number) => {
      const newRating: number = index + 1;
      setRating(newRating);
      // We pass the newRating directly instead of a state updater function to onSetRating
      if (onSetRating) onSetRating(newRating);
   };

   const displayMessage =
      message.length === maxRating
         ? message[tempRating ? tempRating - 1 : rating - 1]
         : tempRating || rating || ''; // This will be a string or number

   return (
      <div style={containerStyle} className={className}>
         <div style={starContainerStyle}>
            {Array.from({ length: maxRating }, (_, i) => (
               <Star
                  key={i}
                  isfilled={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                  onClick={() => handleRating(i)}
                  onHoverIn={() => setTempRating(i + 1)}
                  onHoverOut={() => setTempRating(0)}
                  size={size}
                  color={color}
               />
            ))}
         </div>
         <p style={textStyle}>{displayMessage}</p>
      </div>
   );
}
