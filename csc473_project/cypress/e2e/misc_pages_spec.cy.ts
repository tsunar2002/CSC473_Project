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

describe('Signup Test', () => {
    it('sign in', () => {
        cy.visit(`/`)
        cy.clerkSignIn({ strategy: 'email_code', identifier: 'testuser+clerk_test@example.com' })
        cy.visit('/favorites')
    })
})
