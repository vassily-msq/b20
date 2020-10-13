const form = document.getElementById('form');
console.log(form);

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const button = document.getElementsByTagName('button')[0];

// FUNCTIONS

// Show input error message
const showError = function(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector('small');
}

// Show success outline
const showSuccess  = function(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (username.value === '') {
    showError(username, 'Username is required');
    
  } else {
    showSuccess(username);

  }
});

