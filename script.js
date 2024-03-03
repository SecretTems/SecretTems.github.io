// ̶r̶e̶d̶i̶r̶e̶c̶t̶s̶ ̶t̶o̶ ̶s̶i̶g̶n̶u̶p̶ ̶i̶f̶ ̶n̶o̶t̶ ̶l̶o̶g̶g̶e̶d̶ ̶i̶n̶ ̶b̶u̶t̶ ̶a̶l̶e̶r̶t̶s̶ ̶i̶f̶ ̶l̶o̶g̶g̶e̶d̶ ̶i̶n̶
// since i updated the acc system to work with githubs oauth, itll be hard to update everything related to the old acc system
// so ill just keep some stuff from the old system and make it work with the new
function openLogin() {
  if (isLoggedIn()) {
    alert('You are already logged in.');
  } else {
    window.location.href = 'login.html';
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
        filesLinkContainer.addEventListener('click', function(event) {
            if (!isLoggedIn()) {
				event.preventDefault();
				alert('You need to be logged in to access this page.'); // alerts user to login
				return false;
			}
		});
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