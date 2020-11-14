
import * as constants from "../../public/javascripts/constants.js";
describe('viewing a student', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            "GET",
            "**/levels/",
            "fixture:units.json"
        ).as("getUnits");

        cy.route(
            "GET",
            `**/questions/1`,
            "fixture:addedQuestion.json"
        ).as("getQuestions");

        cy.route(
            "GET",
            `**/players/1/`,
            "fixture:player.json"
        ).as("getPlayer");

        cy.route(
            "GET",
            `**/players/1/results/`,
            "fixture:studentResult.json"
        ).as("getStudentResults");
        
        cy.visit(`classroom/view-student/1`);
        cy.wait('@getQuestions');
        cy.wait('@getPlayer');
        cy.wait('@getStudentResults');
    });

    it ('display the right information about the student', () => {
        cy.get('.student-name').should('contain', 'player1');
        cy.get('.student-accuracy').should('contain', '50%');
    });

    it ('displays questions under proper unit', () => {
        var index = 0;
        const expectedUnits = [
            "Economics",
            "Income & Education",
            "Money & Credit Management",
            "Financial Planning",
            "Critical Consumerism",
        ];
        cy.get('.unit-results').each((unit) => {
            expect(unit.children()).to.contain( expectedUnits[index]);
            if (index == 0) {
                expect(unit.children()).to.contain('Question 1');
            } 
            index++;
        });
    });

    it ('displays message when no questions answered for unit', () => {
        var index = 0;
        const expectedUnits = [
            "Economics",
            "Income & Education",
            "Money & Credit Management",
            "Financial Planning",
            "Critical Consumerism",
        ];

        cy.get('.no-results-text').should('contain', constants.NO_STUDENT_RESULTS_PER_UNIT_MESSAGE);
        cy.get('.no-results-text').should('have.length', 4);
        cy.get('.unit-results').each((unit) => {
            expect(unit.children()).to.contain(expectedUnits[index]);
            if (index != 0) {
                expect(unit.children()).to.contain(constants.NO_STUDENT_RESULTS_PER_UNIT_MESSAGE);
            } 
            index++;
        });
    });

    it('shows the correct color and average for each question', () => {
        cy.fixture('studentResult.json').then((resultJSON) => {
            let total = 0;
            let numCorrect = 0;
            resultJSON.results.forEach(result => {
                total += result.count;
                numCorrect += result.is_correct ? result.count : 0;
            })
            const accuracy = (numCorrect/ total) * 100;
            cy.get('.question-percent').should('contain', accuracy);
        });
        //rgb version of the hex color for orange
        const color = "rgb(255, 217, 195)";
        cy.get('.question-text-section').each((question) => {
            expect(question).to.have.css('background-color', color);
        });
    });
});

describe('displaying student results when GET request throws error', () => {
    beforeEach(() => {
        cy.server();
        cy.route("GET", "**/levels/", "fixture:units.json").as("getUnits");
        cy.route({
            method: 'GET',
            url: `**/players/1/results/`,
            status: 500,
            response: {
                message: 'Something went wrong, please try again later',
            }
        }).as('getStudentResultError');

        cy.visit(`classroom/view-student/1`);
        cy.wait('@getStudentResultError');
    });

    it('shows an error message', () => {
        cy.get('.no-results-text').should('contain', constants.STUDENTS_FETCH_ERROR_TEXT);
    });
});

describe('displaying student results when student has no results', () => {
    beforeEach(() => {
        cy.server();
        cy.route("GET", "**/levels/", "fixture:units.json").as("getUnits");
        cy.route(
            "GET",
            `**/players/1/`,
            "fixture:player.json"
        ).as("getPlayer");

        cy.route({
            method: 'GET',
            url: `**/players/1/results/`,
            status: 201,
            response: {
                results: [],
            }
        }).as('getNoStudentResults');

        cy.visit(`classroom/view-student/1`);
        cy.wait('@getNoStudentResults');
    });

    it('shows an error message', () => {
        cy.get('.no-results-text').should('contain', constants.NO_STUDENT_RESULTS_MESSAGE);
    });
});