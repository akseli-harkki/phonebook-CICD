import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PersonForm from '../src/components/PersonForm'

test('form for adding a person is rendered', () => {
  const mockHandlerPersons = jest.fn()
  const mockHandlerMessage = jest.fn()
  const persons = []

  render(<PersonForm persons={persons} setPersons={mockHandlerPersons} setMessage={mockHandlerMessage} />)

  expect(screen.getByText('name:')).toBeDefined()
  expect(screen.getByText('number:')).toBeDefined()
  expect(screen.getByText('add')).toBeDefined()
})