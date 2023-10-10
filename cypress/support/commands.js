Cypress.Commands.add("Login", (index) => {
    cy.fixture('/SauceDemo/sauceDemoCredentials').then(sauceDemoCredentials => {
        const username = sauceDemoCredentials.userName[index];
        const password = Cypress.env('PASSWORD');
        const url = Cypress.env('baseUrl');
        cy.visit(url);
        cy.get('[data-test="username"]').click().type(username);
        cy.get('[data-test="password"]').click().type(password, {log:false});
        cy.get('[data-test="login-button"]').click();
    })
})