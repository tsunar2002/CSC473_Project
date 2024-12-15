describe('Home Page Launch', () => {
  it('Should be able to load home page', () => {
    cy.visit("http://localhost:3000/")
  })
})

describe('Home Page API Loading', () => {
  it('Should load trailCards API', () => {
    cy.visit("http://localhost:3000/")
    cy.contains("Angels Landing Trail")   
  })
})

