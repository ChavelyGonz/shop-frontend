'use client';

import React, { useEffect, useState } from 'react';
import { ApiClient, ProductDto } from '../../../api/client'; // adjust path if needed
import { useRouter } from 'next/navigation';

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const api = new ApiClient('http://localhost:5250'); // adjust base URL if needed

  const maxPage = Math.max(1, Math.ceil(totalCount / pageSize));

  // Fetch products when page changes
  useEffect(() => {
    const fetchProducts = async (page: number) => {
      setIsLoading(true);
      try {
        const data = await api.getAllProducts(page, pageSize);
        setProducts(data ?? []);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts(pageNumber);
  }, [pageNumber, router]);

  // Fetch total product count once on mount
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const count = await api.totalCount();
        setTotalCount(count ?? 0);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch total product count');
      }
    };

    fetchTotalCount();
  }, []);

  const handleDelete = async (id?: number) => {
    if (!id || !confirm('Delete this product?')) return;
    try {
      await api.deleteProductById(id);

      // Refresh current page
      const data = await api.getAllProducts(pageNumber, pageSize);
      setProducts(data ?? []);
      // Optionally refetch total count
      const count = await api.totalCount();
      setTotalCount(count ?? 0);
    } catch (error) {
      console.error(error);
      alert('Failed to delete product');
    }
  };

  const handleEdit = (product: ProductDto) => {
    const json = JSON.stringify(product);
    
    router.push(`/storage/all_products?data=${json}`);
  };

  const handleNextPage = () => {
    setPageNumber(prev => (prev < maxPage ? prev + 1 : prev));
  };

  const handlePrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-2">All Products (Page {pageNumber})</h3>
      <p className="text-gray-500 mb-4">Page {pageNumber} of {maxPage}</p>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded shadow text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Price</th>
                  <th className="py-2 px-4 border">Unit</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id} className="text-center">
                      <td className="py-2 px-4 border">{p.id}</td>
                      <td className="py-2 px-4 border">{p.name}</td>
                      <td className="py-2 px-4 border">${p.price}</td>
                      <td className="py-2 px-4 border">{p.unit}</td>
                      <td className="py-2 px-4 border space-x-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={pageNumber === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              ← Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={pageNumber >= maxPage}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
