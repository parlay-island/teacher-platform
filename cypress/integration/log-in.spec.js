describe('successful log in', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/auth/token/login/**',
            status: 201,
            response:[]
        }).as("postLogIn");

        cy.visit('/');        
    });

    it('successfully sends the post request', () => {
        cy.get('#log-in-username').type('username');
        cy.get('#log-in-password').type('password');

        cy.get('#log-in-submit').click({ force: true });
        cy.wait('@postLogIn').then((xhr) => {
            expect(xhr.method).to.eq('POST');
            assert.isNotNull(xhr.response.body.data);
            
            // should create the cookie for the user
            cy.getCookie("userId").should("exist");

            // should show the correct teacher
            cy.visit('/choose-unit');
            cy.get('.teacher-name').should('contain', 'Test Teacher');
        });
    })
});

describe('log in when POST request fails', () => {
    beforeEach(() => {
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
            url: '**/teacher/me/',
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
        cy.get('.alert-danger').should('contain', 'Invalid username or password');
    });

    it('should show an error when trying to get the teacher name', () => {
        cy.visit('/choose-unit');
        cy.wait('@getTeacherNameFail');

        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Could not find your information. Please log in again.`)
        }); 
        cy.wait(1000);
        // check that it redirects to login 
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/');
        });
    })
})