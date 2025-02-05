import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './TextInput';

it('renders the value read only', () => {
    render(<TextInput requiredPermissions={['test']} value="Hello" />)
    expect(screen.queryByText("Hello")).not.toBe(null)
});

it('changes the value', async () => {
    const mockCallback = jest.fn();
    render(<TextInput value="Hello" set_value={mockCallback} />);
    await userEvent.type(screen.getByText(/Hello/), 'Bye{Shift>}{Enter}')
    expect(screen.getByText(/Bye/)).not.toBe(null)
    expect(mockCallback).toHaveBeenCalledWith("HelloBye")
})

it('does not invoke the callback on enter', async () => {
    const mockCallback = jest.fn();
    render(<TextInput value="Hello" set_value={mockCallback} />);
    await userEvent.type(screen.getByText(/Hello/), 'Bye{Enter}')
    expect(screen.getByText(/Bye/)).not.toBe(null)
    expect(mockCallback).not.toHaveBeenCalled()
})

it('does not invoke the callback if the value is unchanged', async () => {
    const mockCallback = jest.fn();
    render(<TextInput value="Hello" set_value={mockCallback} />);
    await userEvent.type(screen.getByText(/Hello/), '{Shift>}{Enter}')
    expect(screen.getByText(/Hello/)).not.toBe(null)
    expect(mockCallback).not.toHaveBeenCalled()
})

it('resets the value on escape', async () => {
    const mockCallback = jest.fn();
    render(<TextInput value="Hello" set_value={mockCallback} />);
    await userEvent.type(screen.getByText(/Hello/), 'Revert{Escape}')
    expect(screen.getByText(/Hello/)).not.toBe(null)
    expect(mockCallback).not.toHaveBeenCalled()
})

it('shows an error for required empty fields, when read only', () => {
    const { container } = render(<TextInput requiredPermissions={['test']} value="" required />)
    expect(container.getElementsByTagName("textarea")[0]).toBeInvalid()
})

it('does not show an error for required non-empty fields, when read only', () => {
    const { container } = render(<TextInput requiredPermissions={['test']} value="Hello" required />)
    expect(container.getElementsByTagName("textarea")[0]).toBeValid()
})

it('does not show an error for non-required empty fields, when read only', () => {
    const { container } = render(<TextInput requiredPermissions={['test']} value="" />)
    expect(container.getElementsByTagName("textarea")[0]).toBeValid()
})

it('shows an error for required empty fields, when editable', () => {
    const { container } = render(<TextInput value="" required />)
    expect(container.getElementsByTagName("textarea")[0]).toBeInvalid()
})

it('does not show an error for required non-empty fields, when editable', () => {
    const { container } = render(<TextInput value="Hello" required />)
    expect(container.getElementsByTagName("textarea")[0]).toBeValid()
})

it('does not show an error for non-required empty fields, when editable', () => {
    const { container } = render(<TextInput value="" />)
    expect(container.getElementsByTagName("textarea")[0]).toBeValid()
})

it('shows the label', () => {
    render(<TextInput label="Label" />);
    expect(screen.queryByText("Label")).not.toBe(null)
})

it('shows the editable label', () => {
    render(<TextInput editableLabel="Label" />);
    expect(screen.queryByText("Label")).not.toBe(null)
})
