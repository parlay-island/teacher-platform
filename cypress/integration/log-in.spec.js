import * as constants from "../../public/javascripts/constants.js";
describe('successful log in', () => {
    beforeEach(() => {
         // remove any stored names before log in
        cy.window().then((win) => {
            win.localStorage.clear();
        });

        cy.server();
        cy.route({
            method: 'POST',
            url: '**/auth/token/login/**',
            status: 200,
            response:[]
        }).as("postLogIn");

        cy.server();
        cy.route("GET", "**/teachers/me/", "fixture:teacher.json").as(
            "getTeacherName"
        );

        cy.visit('/');        
    });

    it('successfully sends the post request', () => {
        cy.get('#log-in-username').type('username');
        cy.get('#log-in-password').type('password');

        cy.get('#log-in-submit').click({ force: true });
        cy.wait('@postLogIn').then((xhr) => {
            expect(xhr.method).to.eq('POST');
            assert.isNotNull(xhr.response.body.data);

            // should show the correct teacher
            cy.visit('/choose-unit');
            cy.get('.teacher-name').should('contain', 'Test Teacher');
        });
    })
});

describe('log in when POST request fails', () => {
    beforeEach(() => {
         // remove any stored names before log in
        cy.window().then((win) => {
            win.localStorage.clear();
        });

        cy.server();
        cy.route({
            method: 'POST',
            url: '**/auth/token/login/**',
            status: 400,
            response: {
                message: 'Something went wrong'
            }
        }).as("postLogIn");

        cy.route({
            method: 'GET',
            url: '**/teachers/me/',
            status: 400,
            response: {
                message: 'Something went wrong'
            }
        }).as('getTeacherNameFail');

        cy.visit('/');
    });

    it('creates an alert error message', () => {
        cy.get("#log-in-username").type("username");
        cy.get("#log-in-password").type("password");

        cy.get("#log-in-submit").click({ force: true });
        cy.wait('@postLogIn');
        cy.get('.alert-danger').should('contain', constants.INVALID_CREDENTIALS_MESSAGE);
    });

    it('should show an error when trying to get the teacher name', () => {
        // remove any stored names
        cy.window().then((win) => {
            win.localStorage.clear();
        });

        cy.visit('/choose-unit');

        cy.on('window:alert', (str) => {
            expect(str).to.equal(constants.MISSING_INFORMATION_MESSAGE)
        }); 
        cy.wait(1000);
        // check that it redirects to login 
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/');
        });
    })
})