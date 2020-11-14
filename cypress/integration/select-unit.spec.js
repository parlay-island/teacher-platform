const UNIT_ID = 1;
import * as constants from "../../public/javascripts/constants.js";

describe('selecting a unit when the get request returns all the questions', () => {
    beforeEach(() => {
        // mocking the response to fetch all units
        cy.server();
        cy.route(
            "GET",
            "**/levels/",
            "fixture:units.json"
        ).as("getUnits");
        cy.visit("/choose-unit");
        cy.wait('@getUnits');

        // mock the get request to get questions for a particular unit (economics)
        cy.server();
        cy.route(
            "GET",
            `**/questions/?level=${UNIT_ID}`,
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");

        // selecting economics unit
        cy.get('.unit-grid-item-title').contains('Economics').click({ force: true });
        cy.wait('@getQuestionsByUnit');
    });

    it ('renders the correct heading and description', () => {
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/Economics/1/questions');
        });

        cy.get('.header-title').should('contain', 'Update Questions');
        cy.get('.header-description').should('contain', 'Add or delete questions using the corresponding icons. Modify a question by clicking on it.');
        // should contain the name of the unit selected
        cy.get('.add-title').should('contain', 'Economics');
    })

    it('shows the questions when selecting a unit', () => {
        // should display the right questions
        cy.get('.question-text').should('contain', 'Question 1');

        // should display the delete button
        cy.get('.remove-question-icon').should('exist');
    });

    it('should show the percentage correct per question', () => {
        cy.fixture('questionsByUnit.json').then((questionsByUnit) => {
            const questions = questionsByUnit.questions;

            var index = 0;
            cy.get('.question-progress').each((progressText) => {
                const expectedPercentcorrect = ((questions[index].times_correct / questions[index].times_answered) * 100);
                expect(progressText).to.contain(expectedPercentcorrect);
                index++;
            })
        })
    });
});

describe('displaying questions when the GET request returns no questions', () => {
    beforeEach(() => {
        // mock the get request to get empty list of questions
        cy.server();
        cy.route({
            method: 'GET',
            url: `**/questions/?level=${UNIT_ID}`,
            response: []
        }).as('getQuestionsEmpty');
        
        cy.visit('/Economics/1/questions');
        cy.wait('@getQuestionsEmpty');
    });

    it ('shows empty questions message', () => {
        cy.get('.no-questions-text').should('contain', constants.NO_QUESTIONS_MESSAGE);
    });
});

describe('displaying questions when GET request throws error', () => {
    beforeEach(() => {
        // mock the get request to get empty list of questions
        cy.server();
        cy.route({
            method: 'GET',
            url: `**/questions/?level=${UNIT_ID}`,
            status: 500,
            response: {
                message: 'Something went wrong, please try again later',
            }
        }).as('getQuestionsError');

        cy.visit('/Economics/1/questions');
        cy.wait('@getQuestionsError');
    });

    it('shows an error message', () => {
        cy.get('.no-questions-text').should('contain', constants.QUESTIONS_FETCH_ERROR_MESSAGE);
    });
});