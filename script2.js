// does the login stuff
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // just storing the username in local storage
  localStorage.setItem('currentUser', username);

  // redirects to home page after login
  window.location.href = 'index.html';
}

// function to log out the user
function logout() {
  localStorage.removeItem('currentUser');
  
  // redirects to home page after logout
  window.location.href = 'index.html';
}
