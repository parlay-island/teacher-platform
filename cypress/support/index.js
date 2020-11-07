// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
    // to mock being logged in (log in specs will override this)
    cy.window().then((win) => {
        win.localStorage.setItem('auth_token', 'token');
        win.localStorage.setItem("teacher_name", "teacher");
        win.localStorage.setItem("class_code", "code");
    });
})
