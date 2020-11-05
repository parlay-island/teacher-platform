describe('the navigation bar works', () => {
    beforeEach(() => {
        cy.viewport(1200, 850); 
        cy.visit('/choose-unit');
    });

    it('renders with the update questions, student progress, and sign out labels', () => {
        // the update question tab should be initially active 
        cy.get('#question').should('have.class', 'nav-row-selected');
        // the question tab should be initially inactive 
        cy.get("#classroom").should("not.have.class", "nav-row-selected");
        
        cy.get('#question').should('contain', 'Update Questions');
        cy.get('#classroom').should('contain', 'Student Progress');
        cy.get('#signout').should('contain', 'Sign out');
    });

    it('changes the tab to active when the user clicks it', () => {
        // selecting the classroom tab
        cy.get(".nav-row-text").eq(1).click({ force: true });
        cy.wait(500);
        
        cy.get("#classroom").should("have.class", "nav-row-selected");
        cy.get("#question").should("not.have.class", "nav-row-selected");

        // selecting the question tab
        cy.get(".nav-row-text").eq(0).click({ force: true });
        cy.wait(500);
        cy.get("#question").should("have.class", "nav-row-selected");
        cy.get("#classroom").should("not.have.class", "nav-row-selected");
    });

    it ('relocates to the right URL when clicking a tab', () => {
        // selecting the classroom tab
        cy.get(".nav-row-text").eq(1).click({ force: true });
        cy.wait(500);
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/classroom');
        });

        // selecting the question tab
        cy.get(".nav-row-text").eq(0).click({ force: true });
        cy.wait(500);
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/choose-unit");
        });
    })
})