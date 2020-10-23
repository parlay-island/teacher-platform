const UNIT = 'Economics';

describe('loading the page to modify question', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            "GET",
            "**/questions/1",
            "fixture:addedQuestion.json"
        ).as("getSingleQuestion");
        cy.route({
            method: "PUT",
            url: "**/questions/1",
            response: "fixture:updatedQuestion.json",
        }).as("putQuestion");
        cy.route(
            "GET",
            "**/questions/?tag=Economics",
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");

        cy.visit(`${UNIT}/questions/view-question?id=1`);
        cy.wait("@getSingleQuestion");
        cy.get(".edit-question-icon").click({ force: true });
    });

    it ('should have the fields for the question already filled in', () => {
        // question text
        cy.get("#new-question").should('have.value', "Question 1");

        const expectedChoices = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'];
        // choice text
        cy.get(".answer-choice-input").each((choice, index) => {
            expect(choice).to.have.value(expectedChoices[index]);
        });

        // selected answer
        cy.get('#choice3-radio').should('be.checked');
    });

    it ('sends the PUT request on submit', () => {
        cy.get("#new-question").type(" New");
        cy.get(".submit-question-button").click({ force: true });
        cy.wait('@putQuestion').then((xhr) => {
            expect(xhr.method).to.eq("PUT");
            assert.isNotNull(xhr.response.body.data, "post request has data");
            cy.log(xhr.responseBody);

            cy.get(".alert-success").should(
                "contain",
                "You successfully updated this question."
            );
        });
    });
});


describe('sending a PUT request on submit that fails', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            "GET",
            "**/questions/1",
            "fixture:addedQuestion.json"
        ).as("getSingleQuestion");
        cy.route({
            method: "PUT",
            url: "**/questions/1",
            status: 500,
            response: {
                message: "Something went wrong, please try again later",
            },
        }).as("putQuestionFail");
        cy.route(
            "GET",
            "**/questions/?tag=Economics",
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");

        cy.visit(`${UNIT}/questions/view-question?id=1`);
        cy.wait("@getSingleQuestion");
        cy.get(".edit-question-icon").click({ force: true });
    });

    it ('creates an alert error message when PUT fails', () => {
        cy.get('.submit-question-button').click({ force: true });
        cy.wait("@putQuestionFail");
        cy.get('.alert-danger').should('contain', 'Something went wrong when trying to add your question. Please try again');
    })
})