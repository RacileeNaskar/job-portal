// Retrieve users from localStorage or initialize an empty array
const users = JSON.parse(localStorage.getItem('users')) || [];

// Registration form handler
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const profileImage = document.getElementById('profileImage').files[0];

    if (users.some(user => user.email === email)) {
        alert('Email already registered');
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const newUser = {
            name,
            email,
            password,
            profileImage: reader.result // Store image as Data URL
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        window.location.href = 'login.html'; // Redirect to login
    };
    reader.readAsDataURL(profileImage);
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful');
        window.location.href = user.isEmployer ? 'employer-dashboard.html' : 'candidate-dashboard.html';
    } else {
        alert('Invalid credentials');
    }
});
