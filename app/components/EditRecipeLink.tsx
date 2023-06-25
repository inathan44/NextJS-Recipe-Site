'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { useEffect, useState } from 'react';
import { isOwner } from '../utils/documentFunctions';

type Props = {
  recipe?: Recipe;
};

const EditRecipeLink = ({ recipe }: Props) => {
  const [user] = useAuthState(auth);
  const [owner, setOwner] = useState<boolean>(false);

  useEffect(() => {
    const getOwner = async () => {
      const bool = await isOwner(user?.uid || '', recipe?.id || '');
      setOwner(bool);
    };
    getOwner();
  }, [user, recipe]);

  return (
    <>
      {owner && (
        <Link
          className='rounded-full px-3 py-1 transition-all hover:bg-primary-dark hover:text-primary-light dark:bg-primary-light dark:text-primary-dark dark:hover:bg-darker-light dark:hover:text-primary-dark'
          href={`/recipes/${recipe?.id}/edit`}
        >
          Edit
        </Link>
      )}
    </>
  );
};

export default EditRecipeLink;
