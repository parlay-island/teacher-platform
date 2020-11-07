describe('logging out with unsuccessful post request', () => {
    beforeEach(() => {
        cy.server();
        cy.route("GET", "**/levels/", "fixture:units.json").as("getUnits");
        cy.route({
            method: 'POST',
            url: '**/auth/token/logout/',
            status: 401,
            response: []
        }).as("postLogOut");

        cy.visit("/choose-unit");
        cy.wait("@getUnits");
    });

    it('shows an error alert message', () => {
        cy.get("#signout").click({ force: true });
        cy.get("#confirm-sign-out").click({ force: true });
        cy.on('window:alert', (str) => {
            expect(str.strip()).to.equal(`Could not log out. Please log in again`)
        }); 
    });
});

describe('logging out with successful post request', () => {
    beforeEach(() => {
        cy.server();
        cy.route("GET", "**/levels/", "fixture:units.json").as("getUnits");
        cy.route({
            method: 'POST',
            url: '**/auth/token/logout/',
            status: 200,
            response: []
        }).as("postLogOut");

        cy.visit("/choose-unit");
        cy.wait("@getUnits");
    });

    it ('shows a pop up that allows the user to stop logging out', () => {
        cy.get("#signout").click({ force: true });
        cy.get("#cancel-sign-out").click({ force: true });
        
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/choose-unit');
        });
    });

    it('it logs out and clears the local storage variables', () => {
        cy.get('#signout').click({ force: true });
        cy.get('#confirm-sign-out').click({ force: true });
        cy.wait("@postLogOut").then(xhr => {
            expect(xhr.method).to.eq('POST');

            cy.wait(500);
            cy.window().then((win) => {
                const authKey = win.localStorage.getItem("auth_key");
                cy.wrap(authKey).should("not.exist");

                const teacherName = win.localStorage.getItem("teacher_name");
                cy.wrap(teacherName).should("not.exist");
            }); 

            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/"); // redirected to log in screen
            });
        });
    });
});