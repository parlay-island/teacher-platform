const UNIT = 'Economics';
describe('removing question when DELETE request fails', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            "GET",
            "**/questions/?tag=Economics",
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");
        cy.route({
            method: "DELETE",
            url: "**/questions/1",
            status: 500,
            response: {
                message: 'Something went wrong, please try again later',
            }
        }).as("deleteQuestionFail");

        cy.visit(`/${UNIT}/questions`);
        cy.wait("@getQuestionsByUnit");
    })
    it ('shows an error message', () => {
        cy.get(".remove-question-icon").click({ force: true });
        cy.get("#confirm-delete").click({ force: true });
        cy.wait("@deleteQuestionFail");
        cy.get(".alert-danger").should('exist');
    })
})
describe('removing a question when DELETE request succeeds', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            "GET",
            "**/questions/?tag=Economics",
            "fixture:questionsByUnit.json"
        ).as("getQuestionsByUnit");
        cy.route({
            method: "DELETE",
            url: "**/questions/1",
            response: "fixture:addedQuestion.json",
        }).as("deleteQuestion");

        cy.visit(`/${UNIT}/questions`);
        cy.wait("@getQuestionsByUnit");
    });

    it('allows user to cancel the delete operation', () => {
        cy.get(".remove-question-icon").click({ force: true });
        cy.get("#cancel-delete").click({ force: true });

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq(`/${UNIT}/questions`);
        });
        // question should still be there
        cy.get(".question-text").should("contain", "Question 1");
    });

    it ('successfully deletes the question', () => {
        cy.get(".remove-question-icon").click({ force: true });
        cy.get('#confirm-delete').click({ force: true });
        cy.wait("@deleteQuestion").then((xhr) => {
            expect(xhr.method).to.eq('DELETE');
            assert.isNotNull(xhr.response.body.data, "post request has data");
            cy.log(xhr.responseBody);
        })
    });
});