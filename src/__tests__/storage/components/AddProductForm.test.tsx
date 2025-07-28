// __tests__/AddProductForm.test.tsx

import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddProductForm from '../../../app/storage/components/AddProductForm';


beforeAll(() => {
  // Mock window.alert so it doesn't throw
  window.alert = jest.fn();
});

describe('AddProductForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders all fields and button', () => {
    render(<AddProductForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unit/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Product/i })).toBeInTheDocument();
  });

  it('submits correct data', async () => {
    render(<AddProductForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Coffee' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '9.99' } });
    fireEvent.change(screen.getByLabelText(/Unit/i), { target: { value: '1' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Product/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5250/api/Storage/AddProduct',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Coffee',
            price: 9.99,
            unit: 1,
          }),
        })
      );
    });
  });
});
