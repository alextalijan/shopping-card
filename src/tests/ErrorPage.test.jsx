import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';

it('renders', () => {
  const { container } = render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>,
  );

  expect(container).toMatchSnapshot();
});

it('shows the error page when a non-existing route is provided', () => {
  render(
    <MemoryRouter initialEntries={['/non-existing-page']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  expect(
    screen.getByRole('heading', { name: /error: page not found/i }),
  ).toBeInTheDocument();
  expect(screen.getAllByTestId('error-text').length).toBe(2);
  expect(screen.getByAltText('')).toBeInTheDocument();
});
