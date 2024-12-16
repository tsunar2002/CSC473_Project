import { setupClerkTestingToken } from '@clerk/testing/cypress'

describe('Home Page Launch', () => {
  it('Should be able to load home page', () => {
    cy.visit("/")
  })
})

describe('Home Page API Loading', () => {
  it('Should load trailCards API', () => {
    cy.visit("/")
    cy.contains("Angels Landing Trail")   
  })
})
