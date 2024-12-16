import { setupClerkTestingToken } from '@clerk/testing/cypress'

describe('Home Page Launch', () => {
  it('Should be able to load home page', () => {
    cy.visit("/")
  })
})

describe('Home Page API Loading', () => {
  it('Should load trailCards API', () => {
    cy.visit("/")
    cy.contains("John Muir Trail")  
    cy.contains("Angels Landing Trail")   
  })
})

describe('Search Bar Visibility', () => {
  it('Search Bar should be visible', () => {
    cy.visit("/")
    cy.get('input').should('be.visible');
  })
})

describe('Search Bar Test Query for Oregon', () => {
  it('Should show trails for Oregon', () => {
    cy.visit("/")
    cy.get('input').type("Oregon{enter}")
    cy.get('button')
    cy.contains("Cascade Pass Trail")
    cy.contains("Mount Hood Timberline Trail")
    cy.should('not.contain', "Angels Landing Trail")
  })
})