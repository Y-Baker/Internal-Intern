document.addEventListener('keydown', (e) => {
  if (e.altKey && (e.key === 'h' || e.key === 'H')) {
    if (confirm('Are you sure you want to go to the home page?')) {
      window.location.href = '/home';
    }
  }
  if (e.altKey && (e.key === 's' || e.key === 'S')) {
    if (confirm('Are you sure you want to go the submit page?')) {
      window.location.href = '/submit';
    }
  }
})

document.addEventListener('keydown', (e) => {
  if (e.altKey && (e.key === 'v' || e.key === 'V')) {
    if (confirm('Are you sure you want to go to the view messages page?')) {
      window.location.href = '/view';
    }
  }
})

const form = document.getElementById('my-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  let isValid = true;
  
  if (title === '' || title.length > 10) {
    isValid = false;
    alert('Title must be between 1 and 10 characters.');
  }
  emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (isValid && (email === '' || !emailRegex.test(email))) {
    isValid = false;
    alert('Email must be valid.');
  }
  if (isValid && (message === '' || message.length > 100)) {
    isValid = false;
    alert('Message must be between 1 and 100 characters.');
  }
  
  if (isValid) {
    form.submit();
  } else {
    form.style.backgroundColor = 'lightcoral';
  }
});
