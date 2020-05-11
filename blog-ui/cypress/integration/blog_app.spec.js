describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Tester',
      username: 'tester9000',
      password: 'testPassword',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login to view blogs');
    cy.get('#login-form')
      .get('#username')
      .get('#password')
      .get('#login-button');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester9000');
      cy.get('#password').type('testPassword');
      cy.get('#login-button').click();

      cy.contains('Tester is logged in');
    });

    it('fails with invalid credentials', function () {
      cy.get('#username').type('tester8000');
      cy.get('#password').type('letMeIn');
      cy.get('#login-button').click();

      cy.get('#error-msg')
        .should('contain.text', 'Invalid credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester9000', password: 'testPassword' });
    });

    it('a blog can be created', function () {
      cy.get('#toggle-button').should('contain.text', 'Add Blog').click();
      cy.get('form').as('BlogForm');

      cy.get('@BlogForm').get('#title').type('My Blog Title');
      cy.get('@BlogForm').get('#author').type('Jimbo James');
      cy.get('@BlogForm').get('#url').type('https://google.com');
      cy.get('@BlogForm').get('#add-blog-submit').click();

      cy.get('h3').should('contain.text', 'My Blog Title');
      cy.get('h4').should('contain.text', 'Jimbo James');
    });
  });
});
