/// <reference types = "Cypress" />

const leftNavBar = '#react-burger-menu-btn';

describe('Authentication', () => {
    it('Normal Login', () => {
        cy.Login(0);
        cy.get('.footer_copy').should('contain', 'Sauce Labs');
        cy.task('log', 'Successfully Logged In ✅');
    })
        
    it('Alert Message is Displayed for Locked Out User', () => {
        cy.Login(1);
        cy.get('[data-test="login-button"]').click();
        cy.task('log', 'Alert Message is Displayed for a Locked Out User ✅');
    })
    it("Verify whether a user is successfully logged out", () => {
        cy.Login(0);
        const logoutSidebar = '#logout_sidebar_link';
        cy.get(leftNavBar).click();
        cy.get(logoutSidebar).should('have.text', 'Logout').click();
        cy.get('.login_logo').should('exist');
        cy.task('log', 'Successfully Logged Out ✅');
    })
})

describe('Writing end-to-end test', () => {
    beforeEach(() => {
        cy.Login(0);
        cy.reload();
    })    
    it("View About Section", () => {
        cy.get(leftNavBar).click();
        cy.get('#about_sidebar_link')
        .should('contains.text', "About")
        .should('have.attr', 'href')
        .and('include', 'saucelabs.com')
   
        cy.task('log', 'Verified Left Navigation Bar: About ✅');
        //Note: Unable to visit the saucelabs website through Cypress
    })
    it("Verify Social Links (footer)", () => {
        cy.get('.social_twitter > a').should('exist')
        .and('have.attr', 'href')
        .and('include', 'saucelabs');
        cy.task('log', 'Footer: Social Handles: Twitter Url is Present ✅');
        
        cy.get('.social_facebook > a').should('exist')
        .and('have.attr', 'href')
        .and('include', 'saucelabs');
        cy.task('log', 'Footer: Social Handles: Facebook Url is Present ✅');
        
        cy.get('.social_linkedin > a').should('exist')
        .and('have.attr', 'href')
        .and('include', 'sauce-labs');
        cy.task('log', 'Footer: Social Handles: Linkedin Url is Present ✅');
    })
})