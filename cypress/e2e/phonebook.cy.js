describe('Phonebook', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('Phonebook')
    cy.contains('Add a new')
  })
  it('clicking "add" without imputs produces an error', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('add').click()
    cy.contains('Person validation failed')
  })
})