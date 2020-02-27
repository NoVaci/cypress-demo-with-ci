// / <reference types="Cypress" />

const loginPath = 'http://testing.coe.com:30022/en/account/login/';

function requestFactory(apiType) {
    const baseURL = 'http://testing.coe.com:30022/en';
    switch (apiType) {
        case 'search':
            return `${baseURL}/search/?q=`;
        default:
            throw new TypeError('Unknown api')
    }
}
const searchRequest = (searchTerm) => requestFactory('search') + searchTerm;

describe('Cypress demo', () => {
    beforeEach(() => {
        cy.visit('http://testing.coe.com:30022');
    });

    Cypress.Commands.add('loginByCSRF', (csrfToken) => {
        cy.request({
            method: 'POST',
            url: '/en/account/login/',
            failOnStatusCode: false, // dont fail so we can make assertions
            form: true, // we are submitting a regular form body
            body: {
                username: 'novaci@gmail.com',
                password: '123456',
                _csrf: csrfToken, // insert this as part of form body
            },
        })
    });

    it('Failed before reaching steps', () => {
        cy.contains('Accessories').click();
        cy.get('.product-image').should.have.lenth(10);
    });

    it('Login with api', () => {
        cy.request(loginPath)
            .its('headers')
            .then((headers) => {
                const csrf = headers['set-cookie'];
                const token = csrf[0].substring(10, 74);
                cy.log(token);
                cy.loginByCSRF(csrf).then((response) => {
                    expect(response.status).to.eq(200);
                })
            })
    });

    it('REST API', () => {
        const request = searchRequest('Red');

        cy.request({
            method: 'GET',
            url: request,
        }).then((response) => {
            expect(response.status).to.equal(200);
            cy.log(response);
        });
    });

    it('Exec/ Task sample', () => {
        cy.url().then((url) => {
            cy.task('checkWhiteList', url).then((result) => {
                expect(result).to.be.true;
            })
        })
    });
});

describe('Exec demo', () => {
    it('Exec', () => {
        // cy.exec('df -h').then((result) => {
        //     cy.log(result.stdout);
        // });
        cy.exec('docker rm nginx --force');
        cy.exec('docker run --name nginx -d -p 8080:80 nginx', {
            timeout: 20000,
            failOnNonZeroExit: false,
        });
        cy.visit('http://localhost:8080');
    })
});
