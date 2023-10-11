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
        cy.socialHandle('twitter', 'sauce');
        cy.socialHandle('facebook', 'sauce');
        cy.socialHandle('linkedin', 'sauce');
    })
    it("End-to-end checkout process for an item", () => {
        cy.get('.btn').should('have.length', 6);
        function getRandomNumber() {
            return Math.floor(Math.random() * 6);
        }
        cy.get(`#item_${getRandomNumber()}_title_link > .inventory_item_name`).invoke('text')
        .then(function(text){
            const convertedText = text.toLowerCase().replace(/\s+/g, '-');
            cy.log(convertedText);
            cy.get(`[data-test="add-to-cart-${convertedText}"]`).should('exist')
            .click();
            cy.get(`[data-test="remove-${convertedText}"]`).should('have.text', 'Remove');
            cy.get('.shopping_cart_badge').should('have.text', '1');
            cy.get('.shopping_cart_link').click();
            cy.verifyTitleText('Your Cart')
            cy.get('.inventory_item_name').should('have.text', text);
            cy.get('[data-test="checkout"]').click();
        })
        cy.verifyTitleText('Checkout: Your Information')
        cy.enterData('firstName', 'John');
        cy.enterData('lastName', 'Doe');
        cy.enterData('postalCode', '44800');
        cy.get('[data-test="continue"]').click();
        cy.verifyTitleText('Checkout: Overview');
        cy.get('[data-test="finish"]').click();
        cy.get('.complete-header').should('have.text', 'Thank you for your order!');
        cy.task('log', 'Item Successfully Purchased ✅');
        cy.get('[data-test="back-to-products"]').click();
        cy.get(leftNavBar).click();
        cy.get('#reset_sidebar_link').click();
        cy.task('log', 'All tests have successfully been executed 🎉🍾');
    })
})