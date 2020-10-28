const UNIT = 'Economics';
const UNIT_ID = 1;

describe('validation when adding a question', () => {
    beforeEach(() => {
        cy.visit(`/${UNIT}/${UNIT_ID}/add-question`);
    });

    it ('presents a validation alert if some choices are empty', () => {
        cy.get('#new-question').type('question');
        cy.get('#choice1').type('Choice 1');

        cy.get('.submit-question-button').click({ force: true });
        cy.get('.alert-danger').should('contain', 'Please fill out the question and ALL answer choices.');
    });

    it ('presents a validation alert if the correct choice is not selected', () => {
        cy.get('#new-question').type('question');
        cy.get('#choice1').type('Choice 1');
        cy.get('#choice2').type('Choice 2');
        cy.get('#choice3').type('Choice 3');
        cy.get('#choice4').type('Choice 4');

        cy.get('.submit-question-button').click({ force: true });
        cy.get('.alert-danger').should('contain', 'Please select the CORRECT answer choice.');
    });
});

describe('sending a post request on submit', () => {
    beforeEach(() => {
        cy.visit(`/${UNIT}/${UNIT_ID}/add-question`);

        cy.server();
        cy.route({
            method: 'POST',
            url: '**/questions/',
            response: "fixture:addedQuestion.json",
        }).as("postQuestions");

        cy.route(
            "GET",
            `**/questions/?level=${UNIT_ID}`,
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");
    });

    it ('sends the post request', () => {
        cy.get('#new-question').type('Question 1');
        cy.get('#choice1').type('Choice 1');
        cy.get('#choice2').type('Choice 2');
        cy.get('#choice3').type('Choice 3');
        cy.get('#choice4').type('Choice 4');
        cy.get('#choice2-radio').click({ force: true });

        cy.get('.submit-question-button').click({ force: true });
        cy.wait('@postQuestions').then((xhr) => {
            expect(xhr.method).to.eq('POST');
            assert.isNotNull(xhr.response.body.data, 'post request has data');
            cy.log(xhr.responseBody);

            // show success message
            cy.get('.alert-success').should('contain', 'You successfully added a new question.');
            
            // go back to questions page
            cy.get('.exit-add-question').click({ force: true});
            cy.wait('@getQuestionsByUnit');
            // check that the new question shows up
            cy.get('.question-text').should('contain', 'Question 1');
        })
    });
});

describe('post request on submit fails', () => {
    beforeEach(() => {
        cy.visit(`/${UNIT}/${UNIT_ID}/add-question`);

        cy.server();
        cy.route({
            method: 'POST',
            url: '**/questions/',
            status: 500,
            response: {
                message: 'Something went wrong, please try again later',
            }
        }).as("postQuestions");
    });

    it('creates an alert error message when post request fails', () => {
        cy.get('#new-question').type('Question 1');
        cy.get('#choice1').type('Choice 1');
        cy.get('#choice2').type('Choice 2');
        cy.get('#choice3').type('Choice 3');
        cy.get('#choice4').type('Choice 4');
        cy.get('#choice2-radio').click({ force: true });

        cy.get('.submit-question-button').click({ force: true });
        cy.wait('@postQuestions');
        cy.get('.alert-danger').should('contain', 'Something went wrong when trying to add your question. Please try again');
    })
})