describe('Cypress demo', () => {
    before(() => {
        cy.visit('http://testing.coe.com:30022');
    });

    it('Pass ', () => {
        cy.xpath('//*[contains(.,"Apple Juice")]')
            .last()
            .click();
        cy.get('[class=product__info__price]')
            .should('contain', '3.00');
        cy.xpath('//button[contains(.,"Add to cart")]')
            .click();

        cy.get('[class=navbar__brand__cart__icon]')
            .next('span')
            .should('have.text', '1');

        cy.get('.cart-label')
            .click();
        cy.get('.cart__line')
            .should('have.length', 1);

        cy.contains('Home')
            .click();

        cy.xpath('//*[contains(.,"Banana Juice")]')
            .last()
            .click();
        cy.get('#id_quantity')
            .clear()
            .type('5');

        cy.xpath('//button[contains(.,"Add to cart")]')
            .click();
        cy.get('.cart-label')
            .click();
        cy.get('[class=navbar__brand__cart__icon]')
            .next('span')
            .should('contain', '6');
        cy.get('[class~=cart-item-price]');
        cy.get('.cart__line')
            .should('have.length', 2);
    });
});
