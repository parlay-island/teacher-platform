const UNIT = 'Economics';

describe('viewing a question', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            "GET",
            "**/questions/1",
            "fixture:addedQuestion.json"
        ).as("getSingleQuestion");
        cy.route(
            "GET",
            "**/questions/?tag=Economics",
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");
        
        cy.visit(`${UNIT}/questions/view-question?id=1`);
        cy.wait("@getSingleQuestion");
    });

    it ('display the right information about the question', () => {
        cy.get('.question-title').should('contain', 'Question 1');

        const expectedChoices = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'];
        var index = 0;
        cy.get('.choice-row').each((choice) => {
            // the correct answer should be highlighted in green
            if (index == 2) {
                expect(choice).to.have.class('choice-row-correct');
            }
            expect(choice).to.contain(expectedChoices[index]);
            index++;
        });
    });

    it ('redirects to the page with all questions', () => {
        cy.get('.back-arrow').click({ force: true });
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq(`/${UNIT}/questions`);
        });
    });
})