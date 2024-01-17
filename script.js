// redirects to signup if not logged in but alerts if logged in
function openSignUp() {
  if (isLoggedIn()) {
    alert('You are already logged in.');
  } else {
    window.location.href = 'signup.html';
  }
}

// checks if user is logged in
function isLoggedIn() {
  const user = localStorage.getItem('currentUser');
  return user !== null;
}

// checks to see if user is online and shows the "files" link if they are
function updateFilesLinkVisibility() {
    const filesLinkContainer = document.getElementById('filesLinkContainer');
    if (filesLinkContainer) {
        if (isLoggedIn()) {
            filesLinkContainer.style.display = 'block';

            // alerts user to login
            filesLinkContainer.addEventListener('click', function(event) {
                event.preventDefault();
                alert('You need to be logged in to access this page.');
            });
        }
    }
}

// logs out user
function logout() {
  localStorage.removeItem('currentUser');
  updateFilesLinkVisibility();
}

// call the function to update the visibility of the "Files" link after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', updateFilesLinkVisibility);


// Document Object Model - DOM
//
// DOM is a programming interface for web documents. It represents the structure of a document as a tree of objects,
// where each object corresponds to a part of the document, such as elements, attributes, and text. In the context of web development,
// the document usually refers to an HTML or XML document.