describe('Google test', () => {

    before(() => {
        cy.visit('https://google.com');
    });

    it('Verify Google title', () => {
      cy.get('[id=hplogo]').find('img').then(($el) => {
        expect($el).to.have.attr('alt', 'Mừng mùa lễ hội năm 2019!')
        })
    });

    it('Search for christmas tree', () => {
        cy.get('[name=q]').type('christmas tree{enter}');
        cy.get('h3').each((el) => {
            expect(el.text().toLowerCase()).to.include('christmas tree');
        })
    })
  });
