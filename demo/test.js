it('Test clock', () => {
    cy.task('timeit', true);
    cy.visit('https://www.google.com');
    cy.task('timeit', false);
});
