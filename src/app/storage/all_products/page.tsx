'use client'

import React from 'react';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ApiClient, ProductDto, UnitOfMeasurement } from '../../../api/client';

import AddProductForm from '../components/AddProductForm';
import EditProductForm from '../components/EditProductForm';
import AllProductsList from '../components/AllProductsList';

export default function StoragePage() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  const [product, setProduct] = useState<ProductDto | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && dataParam) {
      try {
        const obj = JSON.parse(dataParam) as ProductDto;

        obj.unit = typeof obj.unit === 'string'
          ? UnitOfMeasurement[obj.unit as keyof typeof UnitOfMeasurement]
          : obj.unit;

        setProduct(obj);
      } catch (e) {
        console.error('Failed to decode dataParam', e);
        setProduct(null);
      }
    } else {
      setProduct(null);
    }
  }, [dataParam]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      {product != null ? (
        <EditProductForm product={product} />
      ) : (
        <AddProductForm />
      )}
      <AllProductsList />
    </div>
  );
}
