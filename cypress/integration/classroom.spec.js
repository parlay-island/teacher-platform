const GREEN_COLOR = "rgb(218, 255, 195)";
const YELLOW_COLOR = "rgb(255, 235, 195)";
const ORANGE_COLOR = "rgb(255, 217, 195)";
const RED_COLOR = "rgb(255, 199, 195)";

describe('viewing all students', () => {
    beforeEach(() => {
        cy.setCookie("userId", "user0");

        cy.server();
        cy.route(
            "GET",
            "**/players/",
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
    
        const expectedStrugglingStudentColors = [GREEN_COLOR, ORANGE_COLOR]; 
        var i = 0;
        cy.get('.struggling-student-tile').each((strugglingStudent) => {
            expect(strugglingStudent).to.contain(expectedPlayers[i]);
            expect(strugglingStudent).to.contain(expectedPercentages[i]);
            expect(strugglingStudent).to.have.css('background-color', expectedStrugglingStudentColors[i]);
            i++;
        })
    });

});

describe('displaying all students when the GET request returns no students', () => {
    beforeEach(() => {
        cy.setCookie("userId", "user0");

        // mock the get request to get empty list of students
        cy.server();
        cy.route({
            method: 'GET',
            url: `**/players/`,
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
        cy.setCookie("userId", "user0");

        cy.server();
        cy.route({
            method: 'GET',
            url: `**/players/`,
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

describe('viewing struggling students when there are more than 4 total students', () => {
    beforeEach(() => {
        cy.setCookie("userId", "user0");
        
        cy.server();
        cy.route(
            "GET",
            "**/players/",
            "fixture:studentOverviewLong.json"
        ).as("getMoreThanFourStudents");

        cy.visit(`/classroom`);
        cy.wait('@getMoreThanFourStudents');
    })
    it ('chooses to display the 4 students who are struggling the most', () => {
        // should not include player 1, who is NOT in the bottom 4
        const expectedStrugglingStudentOrder = ["player5", "player2", "player4", "player3"];
        const expectedStrugglingStudentPercent = [55, 35, 20, 15];
        const expectedStrugglingStudentColors = [YELLOW_COLOR, ORANGE_COLOR, RED_COLOR, RED_COLOR];
        
        // only shows four struggling student elements
        cy.get('.struggling-student-tile').should('have.length', 4);

        var i = 0;
        cy.get('.struggling-student-tile').each((strugglingStudent) => {
            expect(strugglingStudent).to.contain(expectedStrugglingStudentOrder[i]);
            expect(strugglingStudent).to.contain(expectedStrugglingStudentPercent[i]);
            expect(strugglingStudent).to.have.css('background-color', expectedStrugglingStudentColors[i]);
            i++;
        });
    })
}); 