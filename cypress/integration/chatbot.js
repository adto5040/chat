// chatbot.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Dashboard', () => {
  beforeEach('Visit page', () => {
    cy.visit('http://localhost:4200/');
  });

  it('redirect to dashboard', () => {
    cy.url().should('include', '/dashboard');
  });

  it("enter invalid username shouldn't do anyhting", () => {
    cy.get('#name').type('       ');
    cy.get('.button').should('be.disabled');
  });

  it('enter valid username should redirect to chat', () => {
    cy.get('#name').type('Peter');
    cy.get('.button').should('not.be.disabled');
    cy.get('.button').click();
    cy.url().should('include', 'chat');
  });
});

describe('Chatroom', () => {
  beforeEach('Visit chatroom', () => {
    cy.visit('http://localhost:4200/');
    cy.get('#name').type('Peter');
    cy.get('.button').click();
    cy.url().should('include', 'chat');
  });

  it('should be possible to Logout', () => {
    cy.get('#logout').click();
    cy.url().should('include', 'dashboard');
  });

  it('should be possible to enter message', () => {
    const msg = "Hello it's Peter!";
    cy.get('#name').type(msg);
    cy.get('#send-msg').click();
    cy.get('#name').should('have.value', '');
    cy.get(':last-child > .text').should('contain', msg);
    cy.get(':last-child > .date').should('contain', 'Just now');
    cy.get(':last-child > .author').should('contain', 'Peter');
  });

  it('should filter bad words', () => {
    const msg = 'Fuck you!';
    cy.get('#name').type(msg);
    cy.get('#send-msg').click();
    cy.get(':nth-last-child(2) > .text').should('contain', '**** you!');
    cy.get(':last-child > .text').should(
      'contain',
      '@Peter please tame your tongue!'
    );
  });

  it('should highlight a searched text', () => {
    cy.get('#search').type('peter');
    cy.get(':nth-last-child(3) > .text').should('have.class', 'highlight');
    cy.get(':nth-last-child(2) > .text').should('not.have.class', 'highlight');
    cy.get(':last-child > .text').should('have.class', 'highlight');
  });

  it('should transform text to emoji', () => {
    cy.get('#name').type('Ok, I will do that :) (y)');
    cy.get('#send-msg').click();
    cy.get(':last-child > .text').should('contain', 'Ok, I will do that 🙂 👍');
  });
});
