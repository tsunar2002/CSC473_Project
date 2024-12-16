import { setupClerkTestingToken } from '@clerk/testing/cypress'

describe('Signup Test', () => {
    it('sign in', () => {
        cy.visit(`/`)
        cy.clerkSignIn({ strategy: 'email_code', identifier: 'testuser+clerk_test@example.com' })
        cy.visit('/favorites')
        // user is signed in from here on
    })
})

describe('About Page Launch', () => {
    it('Should be able to load about page', () => {
        cy.visit("/about")
    })
})