'use client';
import { useState } from 'react';

import ChevronIcon from './ChevronIcon';

type SectionProps = {
  color?: string;
  children: React.ReactNode;
  name: string;
  bgColor?: string;
  // servingsDifference: number | 'N/A';
};

export default function RecipeSection(props: SectionProps) {
  const [expand, setExpand] = useState<boolean>(false);

  function toggleExpand() {
    setExpand((prev) => !prev);
  }

  return (
    <div style={{ backgroundColor: props.bgColor || '' }}>
      <div
        className='justify-between overflow-hidden rounded-t-3xl px-6 py-4 text-lighter-light'
        style={{
          backgroundColor: props.color || '',
          // background: `linear-gradient(to bottom, ${props.color}, #262B2C)`,
        }}
      >
        <div className='flex items-start justify-between'>
          <p className='mb-2 text-xl font-bold'>{props.name}</p>
          <button className='' onClick={toggleExpand}>
            <ChevronIcon />
          </button>
        </div>
        <div
          className='grid overflow-hidden px-4 font-light transition-all'
          style={{ gridTemplateRows: expand ? '1fr' : '0fr' }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}