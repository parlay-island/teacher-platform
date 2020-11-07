describe('rendering all units when GET request is successful', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            "GET",
            "**/levels/",
            "fixture:units.json"
        ).as("getUnits");

        cy.visit("/choose-unit");

        cy.wait("@getUnits");
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
});

describe('rendering units when GET request returns no units', () => {
    beforeEach(() => {
        // mocking the response to return no units
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/levels/',
            response: []
        }).as('getUnitsEmpty');

        cy.visit("/choose-unit");
        cy.wait('@getUnitsEmpty');
    });

    it('shows an empty units message when there are no units', () => {
        cy.get('.no-units-text').should('contain', 'There are currently no units for your questions.');
    });
});

describe('rendering units when GET request fails', () => {
    beforeEach(() => {
        // mocking the response to return error code
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/levels/',
            status: 500,
            response: {
                message: 'Something went wrong, please try again later',
            },
        }).as('getUnitsError');
        cy.visit("/choose-unit");
        cy.wait('@getUnitsError');
    });

    it('displays an error message when the units are not fetched properly', () => {
        cy.get('.no-units-text').should('contain', 'There was a problem fetching the units.');
    });
})