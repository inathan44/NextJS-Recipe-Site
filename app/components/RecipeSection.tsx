'use client';
import { useState } from 'react';
import Background from './Background';
import ChevronIcon from './ChevronIcon';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  // color?: string;
  children: React.ReactNode;
  name: string;
  // bgColor?: string;
}

export default function RecipeSection({
  name,
  children,
  ...props
}: SectionProps) {
  const [expand, setExpand] = useState<boolean>(true);

  function toggleExpand() {
    setExpand((prev) => !prev);
  }

  return (
    <div {...props}>
      <button
        onClick={toggleExpand}
        className='flex w-full grow items-start justify-between'
      >
        <p className='mb-2 grow text-left text-xl font-bold'>{name}</p>
        <ChevronIcon rotate={expand} />
      </button>
      <div
        className='grid overflow-hidden px-4 font-light transition-all'
        style={{ gridTemplateRows: expand ? '1fr' : '0fr' }}
      >
        {children}
      </div>
    </div>

    // </div>
  );
}
