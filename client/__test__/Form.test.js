import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DriverForm from './DriverForm';

// Mock the useDispatch and useSelector functions
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

describe('DriverForm', () => {
  it('renders the form elements', () => {
    // Mock useSelector to return some initial state
    useSelector.mockReturnValue({ teams: [] });

    render(<DriverForm />);
    
    // Assert that the form elements are in the document
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('SurName:')).toBeInTheDocument();
    expect(screen.getByLabelText('Nationality:')).toBeInTheDocument();
    expect(screen.getByLabelText('Image Link:')).toBeInTheDocument();
    expect(screen.getByLabelText('Fecha DOB:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Teams:')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('submits the form', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // Mock useSelector to return some initial state
    useSelector.mockReturnValue({ teams: [] });

    render(<DriverForm />);
    
    // Simulate form input and submit
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('SurName:'), { target: { value: 'Doe' } });
    // ...repeat for other fields
    fireEvent.click(screen.getByText('Create'));

    // Assert that dispatch was called with the expected action
    expect(dispatchMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'CREATE_DRIVER' }));
  });

  it('displays errors for invalid input', () => {
    render(<DriverForm />);
    
    // Simulate form submission without filling in required fields
    fireEvent.click(screen.getByText('Create'));

    // Assert that error messages are displayed
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('SurName is required')).toBeInTheDocument();
    // ...repeat for other fields
  });
});
