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
