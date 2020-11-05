describe('successful log in', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/log-in',
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
        });
    })
});

describe('log in when POST request fails', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/log-in',
            status: 404,
            response: {
                message: 'Something went wrong'
            }
        }).as("postLogIn");

        cy.visit('/');        
    });

    it('creates an alert error message', () => {
        cy.get("#log-in-username").type("username");
        cy.get("#log-in-password").type("password");

        cy.get("#log-in-submit").click({ force: true });
        cy.wait('@postLogIn');
        cy.get('.alert-danger').should('contain', 'Invalid username or password');
    })
})