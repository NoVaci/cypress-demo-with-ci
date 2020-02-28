// / <reference types="Cypress" />

describe('CI demo', () => {
    it('Filter by task', () => {
        cy.visit('https://www.seleniumeasy.com/test/basic-first-form-demo.html');
        // type something
        cy.get('[id=user-message]').first().type('hello everybody');

        // verify message is displayed
        cy.get('[class~=btn-default]').first().click();
        cy.get('[id=display]').first().should('have.text', 'hello everybody');
    });
});
