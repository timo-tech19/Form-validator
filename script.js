// Grab DOM elements
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

// Show error for any given dom node
function showError(node, message) {
    node.parentElement.className = 'form-control error';
    node.nextElementSibling.textContent = message;
}

// Show success message for any given dom node
function showSuccess(node) {
    node.parentElement.className = 'form-control success';
}


// Check if a given field is required
function checkRequired(...nodes) {
    nodes.forEach(function(node) {
        if(node.value.trim() === '') {
            showError(node, `${capitalize(node.id)} is required`)
        }
    })
}

// Check length of value of a given field
function checkLength(node, min, max = 20) {
    if(node.value.length < min) {
        showError(node, `${capitalize(node.id)} must be atleast ${min} characters`);
    } else if (node.value.length > max) {
        showError(node, `${capitalize(node.id)} must be less than ${max} characters`);
    } else {
        showSuccess(node);
    }
}


// Check valid email using regex
function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email.value).toLowerCase())) {
        showSuccess(email);
    } else {
        showError(email, 'Email is invalid');
    }
}



// Check if password and confirm are the same
function checkConfirm(password, confirmPassword) {
    if((password.value === confirmPassword.value)) {
        showSuccess(confirmPassword);
    } else {
        showError(confirmPassword, 'Password does not match');
    }
}


// Reusable capitalize function
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}


// Add submit event to form
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    checkConfirm(password, confirm)
    checkRequired(name, email, password, confirm);
    checkLength(name, 3);
    checkLength(password, 8);
    checkEmail(email);
})