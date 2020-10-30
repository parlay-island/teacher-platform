const UNIT = 'Economics';
const UNIT_ID = 1;

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
            `**/questions/?level=${UNIT_ID}`,
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");
        
        cy.visit(`${UNIT}/${UNIT_ID}/questions/view-question?id=1`);
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
            expect(loc.pathname).to.eq(`/${UNIT}/${UNIT_ID}/questions`);
        });
    });

    it('shows the percentage breakdown for each answer choice', () => {
        cy.fixture('addedQuestion.json').then((questionJSON) => {
            const total = questionJSON.times_answered;
            const choices = questionJSON.choices;
            const expectedChoicePercents = [];
            choices.forEach((choice, index) => {
                expectedChoicePercents[index] = ((choice.times_chosen / total) * 100).toFixed(2);
            });

            var index = 0;
            cy.get('.choice-row-progress').each((choicePercentage) => {
                expect(choicePercentage).to.contain(expectedChoicePercents[index]);
                index++;
            });
        });
    });
});

describe('viewing a question that has not been answered', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            "GET",
            "**/questions/1",
            "fixture:questionNoProgress.json"
        ).as("getSingleQuestion");
        cy.route(
            "GET",
            `**/questions/?level=${UNIT_ID}`,
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");

        cy.visit(`${UNIT}/${UNIT_ID}/questions/view-question?id=1`);
        cy.wait("@getSingleQuestion");
    });

    it('shows that the question has no been answered', () => {
        cy.get('.choice-row-progress').should('contain', '0.00% answered');
    })
})