import React from 'react';
import AddEditForm from '../../components/AddEditForm';

type Params = {
  params: {
    recipeId: string;
  };
};

export default function page({ params: { recipeId } }: Params) {
  return <AddEditForm type='edit' recipeId={recipeId} />;
}
