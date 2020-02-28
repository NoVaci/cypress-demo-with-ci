// / <reference types="Cypress" />

describe('CI demo', () => {
    it('Filter by task', () => {
        cy.visit('https://www.seleniumeasy.com/test/table-search-filter-demo.html');
        // type something
        cy.get('[id=task-table-filter]').type('in progress');

        // verify table only contain 'in progress'
        cy.get('[id=task-table]').find('tbody').children().not('[style="display: none;"]').each((row) => {
            cy.wrap(row).children().eq(3)
                .each((cell) => {
                expect(cell.text()).to.equal('in progress');
            })
        });
    });
});
