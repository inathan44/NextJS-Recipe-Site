'use client';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { db } from '@/firebaseConfig';
import { userRef } from '@/firebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';

const Admin = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function test() {
      const q = query(
        userRef,
        where('role', '==', 'admin'),
        where('uid', '==', user!.uid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error('Not an admin');
      }
      console.log('query', querySnapshot.docs[0].data().role === 'admin');
    }

    if (user?.email) {
      toast.promise(test(), {
        loading: 'Loading',
        error: 'Not an admin',
        success: 'you are admin',
      });
    }
  }, [user]);

  return (
    <>
      <div>
        <p>page</p>
      </div>
      <Toaster />
    </>
  );
};

export default Admin;
