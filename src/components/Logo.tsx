import React from 'react';

export const Logo = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background cloche shape */}
      <path 
        d="M256 120c-80 0-145 60-155 136h310c-10-76-75-136-155-136z" 
        fill="currentColor" 
      />
      <path 
        d="M101 256c0 60 45 110 105 125h100c60-15 105-65 105-125H101z" 
        fill="currentColor" 
      />
      
      {/* Top knob of cloche */}
      <path 
        d="M236 100a20 20 0 1 1 40 0h-40z" 
        fill="currentColor" 
      />

      {/* Steam lines */}
      <path 
        d="M226 40c0 10 10 15 10 25s-10 15-10 25M256 30c0 10 10 15 10 25s-10 15-10 25M286 40c0 10 10 15 10 25s-10 15-10 25" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round" 
      />

      {/* Spork (Spoon + Fork) tool */}
      <rect 
        x="60" 
        y="280" 
        width="392" 
        height="40" 
        rx="20" 
        fill="currentColor" 
        stroke="#1a1a1a"
        strokeWidth="8"
      />
      {/* Spoon head */}
      <circle 
        cx="70" 
        cy="300" 
        r="60" 
        fill="currentColor" 
        stroke="#1a1a1a"
        strokeWidth="8"
      />
      {/* Fork prongs */}
      <path 
        d="M450 260v80M480 260v80M510 260v80" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round" 
      />
    </svg>
  );
};
