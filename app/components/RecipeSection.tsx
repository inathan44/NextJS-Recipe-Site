'use client';
import { useState } from 'react';

import ChevronIcon from './ChevronIcon';

type SectionProps = {
  color?: string;
  children: React.ReactNode;
  name: string;
  bgColor?: string;
};

export default function RecipeSection(props: SectionProps) {
  const [expand, setExpand] = useState<boolean>(true);

  function toggleExpand() {
    setExpand((prev) => !prev);
  }

  return (
    <div style={{ backgroundColor: props.bgColor || '' }}>
      <div
        className='justify-between overflow-hidden rounded-t-3xl px-6 py-4 text-lighter-light'
        style={{
          backgroundColor: props.color || '',
        }}
      >
        <button
          onClick={toggleExpand}
          className='flex w-full grow items-start justify-between'
        >
          <p className='mb-2 grow text-left text-xl font-bold'>{props.name}</p>
          <ChevronIcon rotate={expand} />
        </button>
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
