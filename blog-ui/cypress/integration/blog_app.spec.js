before(function () {
  cy.fixture('users').as('users');
  cy.fixture('blogs').as('blogs');
});

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    this.users.map((user) =>
      cy.request('POST', 'http://localhost:3001/api/users', user)
    );
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
      cy.get('#username').type(this.users[0].username);
      cy.get('#password').type(this.users[0].password);
      cy.get('#login-button').click();

      cy.contains(`${this.users[0].name} is logged in`);
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
      cy.login({
        username: this.users[0].username,
        password: this.users[0].password,
      });
      cy.createBlog(this.blogs[0]);
      cy.login({
        username: this.users[1].username,
        password: this.users[1].password,
      });
      cy.visit('http://localhost:3000');
    });

    it('a blog can be created', function () {
      cy.get('#toggle-button').should('contain.text', 'Add Blog').click();
      cy.get('form').as('BlogForm');

      cy.get('@BlogForm').get('#title').type(this.blogs[1].title);
      cy.get('@BlogForm').get('#author').type(this.blogs[1].author);
      cy.get('@BlogForm').get('#url').type(this.blogs[1].url);
      cy.get('@BlogForm').get('#add-blog-submit').click();

      cy.get('h3').should('contain.text', this.blogs[1].title);
      cy.get('h4').should('contain.text', this.blogs[1].author);
    });

    it('a user can like a blog', function () {
      cy.get('#toggle-details').click();
      cy.get('#likes').contains(this.blogs[0].likes);
      cy.get('#like-button').click();
      cy.get('#likes').contains(this.blogs[0].likes + 1);
    });
  });
});
