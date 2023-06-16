import React from 'react';
import AddEditForm from '../../components/AddEditForm';

type Params = {
  params: {
    recipeId: string;
  };
  type: 'add' | 'edit';
};

export default function page({ params: { recipeId } }: Params) {
  return <AddEditForm type='edit' recipeId={recipeId} />;
}
