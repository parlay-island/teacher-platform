import * as constants from "../../public/javascripts/constants.js";

describe('adding a unit when post request succeeds', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/levels/',
            response: 'fixture:addedUnit.json'
        }).as('postUnitSuccess');

        cy.route(
            "GET",
            "**/levels/",
            "fixture:units.json"
        ).as("getUnits");

        cy.visit('/add-unit');
    });

    it ('succcessfully sends the post request', () => {
        cy.get('#unit-name').type('TestUnit');
        cy.get('#add-unit-submit').click({force: true});
        cy.wait('@postUnitSuccess').then(xhr => {
            expect(xhr.method).to.eq('POST');
            assert.isNotNull(xhr.response.body.data, 'post request has data');
            cy.log(xhr.responseBody);

            // show success message
            cy.get('.alert-success').should('contain', constants.ADD_UNIT_SUCCESS_MESSAGE);
        })
    })
});

describe('adding a unit when post request fails', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/levels/',
            status: 500,
            response: {
                message: 'Something went wrong'
            }
        }).as('postUnitFail');
        cy.visit('/add-unit');
    });

    it('shows an error message', () => {
        cy.get('#unit-name').type('TestUnit');
        cy.get('#add-unit-submit').click({ force: true });
        cy.wait('@postUnitFail');
        cy.get('.alert-danger').should('contain', constants.ADD_UNIT_FAIL_MESSAGE);
    })
});