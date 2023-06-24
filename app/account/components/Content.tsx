'use client';

import { useEffect } from 'react';
import { getUserRecipes } from '@/app/utils/documentFunctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';

const Content = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user?.email) {
      console.log('hello');
      console.log(user.uid);
      getUserRecipes(user.uid)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    }
  }, [user]);

  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

export default Content;
