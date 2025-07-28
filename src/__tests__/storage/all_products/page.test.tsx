// __tests__/page.test.tsx
import React from 'react';

import { render, screen } from '@testing-library/react';
import StoragePage from '../../../app/storage/all_products/page';

describe('StoragePage', () => {
  it('renders header and form', () => {
    render(<StoragePage />);

    expect(screen.getByText(/Manage Products/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Product/i })).toBeInTheDocument();
  });
});
