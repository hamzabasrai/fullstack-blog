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
      this.sortedBlogs = this.blogs.concat().sort((a, b) => b.likes - a.likes);
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
      cy.get('#toggle-details-0').click();
      cy.get('#likes-0').contains(this.blogs[0].likes);
      cy.get('#like-button-0').click();
      cy.get('#likes-0').contains(this.blogs[0].likes + 1);
    });

    it('a user can delete their own blog', function () {
      cy.createBlog(this.blogs[1]);

      // Find position of newly created blog in order to delete it
      const index = this.sortedBlogs.indexOf(this.blogs[1]);

      cy.get(`#toggle-details-${index}`).click();
      cy.get(`#details-${index}`).get(`#delete-button-${index}`).click();

      cy.get('body').should('not.contain.text', this.blogs[1].title);
      cy.get('body').should('not.contain.text', this.blogs[1].author);
    });

    it('a user cannot delete another users blog', function () {
      // Blog 0 is added by another user in the beforeEach block
      cy.get('#toggle-details-0').click();
      cy.get('#details-0')
        .get('#delete-button-0')
        .should('have.css', 'display', 'none');
    });

    it('blogs are ordered by likes', function () {
      cy.createBlog(this.blogs[1]);
      cy.get('#blog-0').should('contain.text', this.sortedBlogs[0].title);
    });
  });
});
