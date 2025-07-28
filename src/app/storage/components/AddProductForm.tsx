'use client';
import React, { useState } from 'react';
import { ApiClient, CreateProductCommand, ProductDto } from '../../../api/client';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [unit, setUnit] = useState<number | ''>('');

  const api = new ApiClient('http://localhost:5250');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const command = new CreateProductCommand({
      dTO: new ProductDto({
        name,
        price: Number(price),
        unit: Number(unit),
      }),
      stores: [], // add store IDs if your API requires them
    });

    try {
      const result: ProductDto = await api.addProduct(command);
      console.log('Added product:', result);

      alert('Product added successfully!');
      setName('');
      setPrice('');
      setUnit('');
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-3xl mx-auto space-y-4"
    >
      <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            id="name"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium">Price</label>
          <input
            id="price"
            type="number"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            value={price}
            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="unit" className="block text-sm font-medium">Unit</label>
          <input
            id="unit"
            type="number"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            value={unit}
            onChange={(e) => setUnit(e.target.value === '' ? '' : Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
