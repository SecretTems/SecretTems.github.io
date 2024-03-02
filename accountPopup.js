// checks user is logged in with github
function isLoggedIn() {
    const accessToken = localStorage.getItem('githubAccessToken');
    return accessToken !== null;
}

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
        // makes "Logged in as" paragraph
        const loggedInParagraph = document.createElement('p');
        loggedInParagraph.innerHTML = '<strong>Logged in as: </strong>: ';

        // makes highlighted username span
        const highlightedUsername = document.createElement('span');
        highlightedUsername.id = 'highlightedUsername';
        highlightedUsername.textContent = "GitHub User";

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
        logoutButton.onclick = function() {
            // Clear the GitHub access token from localStorage
            localStorage.removeItem('githubAccessToken');
            // Redirect to the home page or wherever you want after logout
            window.location.href = 'index.html';
        };

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

        // adds new content and buttons
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
    // Retrieve the GitHub access token from the local storage
    const accessToken = localStorage.getItem('githubAccessToken');

    // makes a DELETE request to githubs user API to delete the user
    fetch('https://api.github.com/user', {
        method: 'DELETE',
        headers: {
            Authorization: `token ${accessToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            // If delete request is good to go, clear the access token and redirect to home
            localStorage.removeItem('githubAccessToken');
            alert('Account deleted successfully');
            window.location.href = 'index.html';
        } else {
            throw new Error('Failed to delete account from GitHub');
        }
    })
    .catch(error => console.error('Error deleting account:', error));
}