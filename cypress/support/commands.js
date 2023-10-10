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

Cypress.Commands.add("socialHandle", (socialHandleName, text) => {
    cy.get(`.social_${socialHandleName} > a`).should('exist')
    .and('have.attr', 'href')
    .and('include', text);
    cy.task('log', `Footer: Social Handles: ${socialHandleName} Url is Present ✅`);
})