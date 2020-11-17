import * as constants from "../../public/javascripts/constants.js";

describe('registering when POST request succeeds', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.clear();
        });

        cy.server();
        cy.route({
            method: 'POST',
            url: '**/auth/users/**',
            response: "fixture:addedTeacher.json"
        }).as("postRegister");

        cy.visit('/register');
    });

    it ('shows an error alert if password does not match', () => {
        cy.get('#register-name').type('Test Teacher');
        cy.get('#register-email').type('testTeacher@gmail.com');
        cy.get('#register-username').type('TestTeacher');
        cy.get('#register-password').type('Password');
        cy.get('#register-password-confirm').type('Not same password');
        cy.get('#register-submit').click({ force: true });

        cy.get('.alert-danger').should('contain', constants.MISMATCHED_PASSWORDS_MESSAGE);
    });

    it('shows a success alert message and redirects to log in', () => {
        cy.get('#register-name').type('Test Teacher');
        cy.get('#register-email').type('testTeacher@gmail.com');
        cy.get('#register-username').type('TestTeacher');
        cy.get('#register-password').type('Password');
        cy.get('#register-password-confirm').type('Password');
        cy.get('#register-submit').click({ force: true });
        cy.wait('@postRegister').then((xhr) => {
            expect(xhr.method).to.eq('POST');
            assert.isNotNull(xhr.response.body.data);

            // show success message
            cy.get('.alert-success').should('contain', constants.TEACHER_SUCCESS_MESSAGE);
            cy.wait(1000);
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq('/log-in');
            });
        })
    })
});

describe('registering when POST request fails', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/auth/users/**',
            status: 500,
            response: {
                message: "Something went wrong"
            }
        }).as("postRegisterFail");

        cy.visit('/register');
    })
    it ('shows an error alert message', () => {
        cy.get('#register-name').type('Test Teacher');
        cy.get('#register-email').type('testTeacher@gmail.com');
        cy.get('#register-username').type('TestTeacher');
        cy.get('#register-password').type('Password');
        cy.get('#register-password-confirm').type('Password');
        cy.get('#register-submit').click({ force: true });
        cy.wait('@postRegisterFail')
        cy.get('.alert-danger').should('contain', constants.REGISTRATION_FAIL_MESSAGE);
    });
});