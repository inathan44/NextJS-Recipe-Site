'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';

type Props = {
  recipe?: Recipe;
};

const EditRecipeLink = ({ recipe }: Props) => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user?.email && (
        <Link
          className='rounded-full px-3 py-1 transition-all hover:bg-primary-dark hover:text-primary-light dark:bg-primary-light dark:text-primary-dark dark:hover:bg-darker-light dark:hover:text-primary-dark'
          href={`recipes/${recipe?.id}/edit`}
        >
          Edit
        </Link>
      )}
    </>
  );
};

export default EditRecipeLink;
