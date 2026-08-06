function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user already exists
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        alert("User already exists with this email");
        return;
    }

    const newUser = {
        name,
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "login.html";
}

function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter both email and password");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Invalid email or password");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
}