describe('selecting a unit', () => {
    beforeEach(() => {
        cy.viewport(1200, 850);
        cy.server();
        cy.route('GET', '**/units/', 'fixture:units.json');
        cy.visit("/");
    });

    it ('renders with the correct title and description', () => {
        cy.get('.header-title').should('contain', 'Choose The Unit');
        cy.get(".header-description").should(
            'contain',
            'Please click on the unit that you would like to update questions for.'
        );
    });

    it ('renders with the right units', () => {
        const expectedUnits = [
            "Economics",
            "Income & Education",
            "Money & Credit Management",
            "Financial Planning",
            "Critical Consumerism",
        ];
        
        var index = 0;
        cy.get('.unit-grid-item-title').each((title) => {
            expect(title).to.contain(expectedUnits[index]);
            index++;
        });
    });
})