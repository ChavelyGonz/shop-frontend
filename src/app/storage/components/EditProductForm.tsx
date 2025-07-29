'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiClient, ProductDto, UnitOfMeasurement } from '../../../api/client';

interface EditProductFormProps {
  product: ProductDto;
}

export default function EditProductForm({ product: initialProduct }: EditProductFormProps) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductDto>(() => initialProduct);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const api = new ApiClient('http://localhost:5250');

  const unitOptions = Object.entries(UnitOfMeasurement)
    .filter(([key, value]) => typeof value === 'number') as [string, number][];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setProduct(prev => ProductDto.fromJS({
      ...prev,
      [name]: name === 'price' ? parseFloat(value)
           : name === 'unit' ? parseInt(value) as UnitOfMeasurement
           : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await api.editProduct(product);
      alert('✅ Product updated successfully!');
      router.push('/storage/all_products');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to update product.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-3xl mx-auto space-y-4"
    >
      <h3 className="text-lg font-semibold">Edit Product</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            id="name"
            name="name"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            value={product.name || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            value={product.price ?? ''}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="unit" className="block text-sm font-medium">Unit</label>
          <select
            id="unit"
            name="unit"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            value={product.unit ?? ''}
            onChange={handleChange}
            required
          >
            <option value="">Select unit...</option>
            {unitOptions.map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
