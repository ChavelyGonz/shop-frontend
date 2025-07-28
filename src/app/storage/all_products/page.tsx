import React from 'react';

import AddProductForm from '../components/AddProductForm';
import AllProductsList from '../components/AllProductsList';

export default function StoragePage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <AddProductForm />
      <AllProductsList />
    </div>
  );
}
