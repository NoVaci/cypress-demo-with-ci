it('Filter by task', () => {
    cy.visit('https://www.seleniumeasy.com/test/table-search-filter-demo.html');
    // type in 'in progres' then [enter]
    cy.get('[id=task-table-filter]').type('in progress{enter}');

    // verify all lines contain filtered term
    cy.get('[id=task-table]').find('tbody')
        .children('tr').not('[style="display: none;"]')
        .each((tr) => {
            cy.wrap(tr).find('td').last()
                .then((td) => {
                    expect(td.text()).to.eq('in progress')
                })
    })
});
