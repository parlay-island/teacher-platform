describe('viewing all students', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            "GET",
            "**/results/summary",
            "fixture:studentOverview.json"
        ).as("getAllStudents");
        
        cy.visit(`/classroom`);
        cy.wait('@getAllStudents');
    });

    it ('display the right information about the students', () => {
        const expectedPlayers = ['player1', 'player2'];
        const expectedPercentages = [86, 35];

        var index = 0;
        cy.get('.student-text').each((student) => {
            expect(student).to.contain(expectedPlayers[index]);
            expect(student.children()[0]).to.contain(expectedPercentages[index]);
            index++;
        });
    });

});

describe('displaying all students when the GET request returns no students', () => {
    beforeEach(() => {
        // mock the get request to get empty list of students
        cy.server();
        cy.route({
            method: 'GET',
            url: `**/results/summary`,
            response: []
        }).as('getAllStudentsEmpty');
        
        cy.visit(`/classroom`);
        cy.wait('@getAllStudentsEmpty');
    });

    it ('shows empty students message', () => {
        cy.get('.no-students-text').should('contain', 'There are currently no student results for your class.');
    });
});

describe('displaying students when GET request throws error', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'GET',
            url: `**/results/summary`,
            status: 500,
            response: {
                message: 'Something went wrong, please try again later',
            }
        }).as('getAllStudentsError');

        cy.visit(`/classroom`);
        cy.wait('@getAllStudentsError');
    });

    it('shows an error message', () => {
        cy.get('.no-students-text').should('contain', 'There was a problem fetching student results.');
    });
});