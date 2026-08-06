let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    alert("Please login first");
    window.location.href = "login.html";
}

// SHOW USER DATA
function loadProfile() {
    document.getElementById("name").textContent = currentUser.name;
    document.getElementById("email").textContent = currentUser.email;
    document.getElementById("bio").textContent = currentUser.bio || "No bio yet";

    const avatar = document.getElementById("avatar");
    const imagePreview = document.getElementById("imagePreview");

    if (currentUser.image) {
        avatar.style.backgroundImage = `url(${currentUser.image})`;
        avatar.style.backgroundSize = 'cover';
        avatar.style.backgroundPosition = 'center';
        avatar.innerHTML = '';
        imagePreview.src = currentUser.image;
        imagePreview.style.display = 'block';
    } else {
        avatar.style.backgroundImage = 'none';
        avatar.innerHTML = '<i class="fa-solid fa-user"></i>';
        imagePreview.style.display = 'none';
    }
}

loadProfile();

// TOGGLE EDIT BOX
function toggleEdit() {
    const box = document.getElementById("editBox");

    if (box.style.display === "none") {
        document.getElementById("editName").value = currentUser.name;
        document.getElementById("editBio").value = currentUser.bio || "";
        document.getElementById("editImage").value = "";
        document.getElementById("imagePreview").style.display = currentUser.image ? 'block' : 'none';
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

// SAVE PROFILE
function saveProfile() {
    const newName = document.getElementById("editName").value;
    const newBio = document.getElementById("editBio").value;
    const imageFile = document.getElementById("editImage").files[0];
    const deleteImage = document.getElementById("deleteImage").checked;

    if (!newName.trim()) {
        alert("Name cannot be empty");
        return;
    }

    function saveAndClose() {
        currentUser.name = newName;
        currentUser.bio = newBio;
        if (deleteImage) {
            delete currentUser.image;
        }
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.map(user => {
            if (user.email === currentUser.email) {
                return currentUser;
            }
            return user;
        });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Profile updated successfully!");
        loadProfile();
        toggleEdit();
    }

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            currentUser.image = event.target.result;
            saveAndClose();
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveAndClose();
    }
}

function previewSelectedImage() {
    const fileInput = document.getElementById("editImage");
    const imagePreview = document.getElementById("imagePreview");
    const file = fileInput.files[0];

    if (!file) {
        imagePreview.style.display = currentUser.image ? 'block' : 'none';
        if (currentUser.image) {
            imagePreview.src = currentUser.image;
        }
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        imagePreview.src = event.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

const editImageInput = document.getElementById("editImage");
if (editImageInput) {
    editImageInput.addEventListener('change', previewSelectedImage);
}

// FILTER POSTS
let posts = JSON.parse(localStorage.getItem("posts")) || [];

const myPostsContainer = document.getElementById("myPosts");

const myPosts = posts.filter(post => post.user === currentUser.name);

if (myPosts.length === 0) {
    myPostsContainer.innerHTML = "<p>No posts yet.</p>";
} else {
    myPosts.forEach(post => {
        myPostsContainer.innerHTML += `
            <div class="post">
                <h4>${post.user}</h4>
                <p>${post.text}</p>
            </div>
        `;
    });
}

// LOGOUT
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// BACK
function goBack() {
    window.location.href = "dashboard.html";
}