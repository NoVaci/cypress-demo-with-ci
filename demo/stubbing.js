describe('Test stubbing', () => {
    // before(() => {
    //     cy.visit('http://testing.coe.com:30022')
    // });
    it('Stubbing an API', () => {
        cy.server({
            method: 'GET',
            delay: 500,
            status: 501,
            response: {
                body: 'this is a stub message',
            },
        });
        cy.route('**/cart/**').as('api');
        cy.visit({
            url: '/cart',
            method: 'GET',
            followRedirects: false,
        });
        cy.wait('@api').its('response')
            .then((response) => {
                expect(response.body.body).to.equal('this is a stub message');
            });
        cy.server({ enable: false });
        cy.visit('/cart')
    });
    // it('From cypress', () => {
    //     cy.server();
    //     cy.route('**/users').as('getUsers');
    //     cy.visit('/users');
    //     cy.wait('@getUsers');
    // })
});
