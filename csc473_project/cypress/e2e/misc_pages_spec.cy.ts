import { setupClerkTestingToken } from '@clerk/testing/cypress'

describe('About Page Button Visibility', () => {
    it('Should show button on about page', () => {
        cy.visit("/about")
        cy.get('p').contains('Start Exploring Trails')
    })
})

describe('About Page Button Reroute', () => {
    it('Should be able to load home page from about', () => {
        cy.visit("/about")
        cy.get('p').contains('Start Exploring Trails').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })
})

describe('Sign In Reroute', () => {
    it('Should reroute to authentication when visiting feed page', () => {
        cy.visit("/feed")
        cy.url().should('contain', '/sign-in')
    })
})

describe('Trails Detail Page Loading', () => {
    it('Should load a trail details page for more info', () => {
        cy.visit(`/traildetail/5f2f978a-71b1-4024-843f-7f99674909f6`)
        cy.contains("Weather in California")
        cy.contains("Condition")
    })
})
