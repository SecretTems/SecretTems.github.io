// loads common stuff
function loadcomelm() {
  fetch('repeated.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('com_elemContainer').innerHTML = data;
    })
    .catch(error => console.error('Error loading common elements:', error));
}

loadcomelm();