Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('currentUser', JSON.stringify(response.body));
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: { Authorization: `Bearer ${user.token}` },
  });
  cy.reload();
});
