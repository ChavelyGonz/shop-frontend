'use client';

import React from 'react';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar for desktop */}
      <aside
        className={`hidden md:flex flex-col bg-gray-800 text-white p-4 transition-all duration-300
          ${sidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        <div className="flex items-center justify-between mb-8">
          {!sidebarCollapsed && <h2 className="text-2xl font-bold">Storage</h2>}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-white focus:outline-none"
          >
            {sidebarCollapsed ? '»' : '«'}
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          <Link href="/storage/all_products" className="hover:text-indigo-300 text-sm">
            {!sidebarCollapsed ? 'All products' : 'A'}
          </Link>
          {/* add more nav items, can use icons */}
        </nav>
      </aside>

      {/* Mobile top header */}
      <header className="flex md:hidden items-center justify-between bg-gray-800 text-white px-4 py-3">
        <h2 className="text-xl font-semibold">Storage</h2>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          ☰
        </button>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gray-700 text-white px-4 py-2 flex flex-col gap-2">
          <Link href="/storage/all_products" className="hover:text-indigo-300">All products</Link>
          {/* add more nav items */}
        </nav>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 text-gray-900">{children}</main>
    </div>
  );
}
