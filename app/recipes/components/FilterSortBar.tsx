'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchIcon from '@/app/components/SearchIcon';
import FiltersIcon from '@/app/components/FiltersIcon';
import {
  FormEvent,
  useCallback,
  useTransition,
  useState,
  useEffect,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import LoginModal from '@/app/components/LoginModal';

const FilterSortBar = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [user] = useAuthState(auth);

  function handleSubmit(e: FormEvent) {}

  const handleSearchParams = useCallback(
    (debouncedValue: string) => {
      let params = new URLSearchParams(window.location.search);

      if (debouncedValue.length > 0) {
        params.set('search', debouncedValue);
      } else {
        params.delete('search');
      }

      startTransition(() => {
        router.replace(`recipes/search/?${params.toString()}`);
      });
    },
    [router]
  );

  // EFFECT: Set Initial Params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search') ?? '';
    setInputValue(searchQuery);
  }, []);

  useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true);
    }
  }, [debouncedValue, mounted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted]);

  return (
    <div className='mx-6 mt-12 border-darker-dark'>
      <div className='flex items-center gap-4 border-b border-darker-dark pb-2 dark:border-primary-light'>
        <SearchIcon />
        <form onSubmit={handleSubmit} className='w-full'>
          <input
            type='text'
            name='search'
            className='w-full bg-transparent active:border-transparent dark:text-primary-light'
            placeholder='Search Recipes'
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </form>
        <FiltersIcon />
      </div>
      {user?.email ? (
        <div className='w-full text-right'>
          <Link
            href={'/recipes/add'}
            className=' mt-2 inline-block rounded-full px-3 py-1 text-right dark:bg-primary-light dark:text-primary-dark'
          >
            Add a Recipe
          </Link>
        </div>
      ) : (
        <div className='flex justify-end'>
          <LoginModal>Add A Recipe</LoginModal>
        </div>
      )}
    </div>
  );
};

export default FilterSortBar;
