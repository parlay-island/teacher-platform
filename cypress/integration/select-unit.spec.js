describe('selecting a unit when the get request returns all the questions', () => {
    beforeEach(() => {
        // mocking the response to fetch all units
        cy.server();
        cy.route(
            "GET",
            "**/units/",
            "fixture:units.json"
        ).as("getUnits");
        cy.visit("/");
        cy.wait('@getUnits');

        // mock the get request to get questions for a particular unit (economics)
        cy.server();
        cy.route(
            "GET",
            "**/questions/?tag=Economics",
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");

        // selecting economics unit
        cy.get('.unit-grid-item-title').contains('Economics').click({ force: true });
        cy.wait('@getQuestionsByUnit');
    });

    it ('renders the correct heading and description', () => {
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/questions');
        });

        cy.get('.header-title').should('contain', 'Update Questions');
        cy.get('.header-description').should('contain', 'Add or delete questions using the corresponding icons. Modify a question by clicking on it.');
        // should contain the name of the unit selected
        cy.get('.questions-title').should('contain', 'Economics');
    })

    it('shows the questions when selecting a unit', () => {
        // should display the right questions
        cy.get('.question-text').should('contain', 'Question 1');

        // should display the delete button
        cy.get('.remove-question-icon').should('exist');
    });
});

describe('displaying questions when the GET request returns no questions', () => {
    beforeEach(() => {
        // mock the get request to get empty list of questions
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/questions/?tag=Economics',
            response: []
        }).as('getQuestionsEmpty');
        
        cy.visit('/questions?unit=Economics');
        cy.wait('@getQuestionsEmpty');
    });

    it ('shows empty questions message', () => {
        cy.get('.no-questions-text').should('contain', 'There are currently no questions for this unit.');
    });
});

describe('displaying questions when GET request throws error', () => {
    beforeEach(() => {
        // mock the get request to get empty list of questions
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/questions/?tag=Economics',
            status: 500,
            response: {
                message: 'Something went wrong, please try again later',
            }
        }).as('getQuestionsError');

        cy.visit('/questions?unit=Economics');
        cy.wait('@getQuestionsError');
    });

    it('shows an error message', () => {
        cy.get('.no-questions-text').should('contain', 'There was a problem fetching the questions.');
    });
});