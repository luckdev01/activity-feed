import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

const handleLogin = jest.fn();

beforeEach(() => {
  handleLogin.mockClear();
});

test('renders login form', () => {
  render(<LoginForm handleLogin={handleLogin} loading={false} />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
});

test('validates form fields', async () => {
  render(<LoginForm handleLogin={handleLogin} loading={false} />);
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
  expect(await screen.findAllByText('Username is required')).toHaveLength(1); // validation error for username
  expect(await screen.findAllByText('Password is required')).toHaveLength(1); // validation error for password
});

test('submits the form with valid input', async () => {
  render(<LoginForm handleLogin={handleLogin} loading={false} />);
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'johndoe' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  await waitFor(() => {
    expect(handleLogin).toHaveBeenCalledTimes(1);
  });
});
