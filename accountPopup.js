// closes the account popup
function closeAccountPopup() {
  const accountPopup = document.getElementById('accountPopup');
  accountPopup.style.display = 'none';
}

// opens the account popup
function openAccountPopup() {
  const accountPopup = document.getElementById('accountPopup');
  const usernameContainer = document.getElementById('accountUsername');

  // checks if the user is logged in
  if (isLoggedIn()) {
    const currentUser = localStorage.getItem('currentUser');

    // makes "Logged in as" paragraph
    const loggedInParagraph = document.createElement('p');
    loggedInParagraph.innerHTML = '<strong>Logged in as: </strong>: ';

    // makes highlighted username span
    const highlightedUsername = document.createElement('span');
    highlightedUsername.id = 'highlightedUsername';
    highlightedUsername.textContent = currentUser;

    // highlights the username
    highlightedUsername.style.backgroundColor = '#deeff5';

    // adds highlighted username to paragraph
    loggedInParagraph.appendChild(highlightedUsername);

    // adds "Logged in as" paragraph to the username container
    usernameContainer.innerHTML = '';
    usernameContainer.appendChild(loggedInParagraph);

    // makes "Logout" button
    const logoutButton = document.createElement('button');
    logoutButton.innerText = 'Logout';
    logoutButton.onclick = logout;

    // makes "Delete Account" button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Account';
    deleteButton.onclick = function () {
		
      // confirmation thing
      if (confirm('Are you sure you want to delete your account?')) {
        deleteAccount();
      }
    };

    // adds some space between the buttons
    const spacing = document.createElement('div');
    spacing.style.marginTop = '10px';

    // makes "Close" button
    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = closeAccountPopup;

    // clears the existing content
    const popupContent = document.querySelector('.popup-content');
    popupContent.innerHTML = '';

    // Adds new content and buttons
    popupContent.appendChild(closeButton);
    popupContent.appendChild(usernameContainer);
    popupContent.appendChild(logoutButton);
    popupContent.appendChild(spacing);
    popupContent.appendChild(deleteButton);

    // popup position
    accountPopup.style.width = '100%';
    accountPopup.style.display = 'flex';
  } else {
    alert('You are not logged in.');
  }
}

// delete account function
function deleteAccount() {
  const currentUser = localStorage.getItem('currentUser');
  console.log('Deleting account for:', currentUser);

  // reads existing accounts from localStorage
  var accounts = JSON.parse(localStorage.getItem('accounts')) || [];

  // finds the index of the user in the accounts array
  const userIndex = accounts.findIndex(account => account.username === currentUser);

  if (userIndex !== -1) {
    // removes the user from the accounts array
    accounts.splice(userIndex, 1);

    // write the updated array back to localStorage
    localStorage.setItem('accounts', JSON.stringify(accounts));
    console.log('Account deleted successfully');

    alert('Account deleted successfully');

    // bandage fix for the annoying bug
    logout();

    // after deletion redirects to signup page
    window.location.href = 'signup.html';
  } else {
    console.error('User not found in accounts array');
  }
}
