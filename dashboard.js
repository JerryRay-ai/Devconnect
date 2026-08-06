const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    alert("You must login first");
    window.location.href = "login.html";
}

let posts = JSON.parse(localStorage.getItem("posts")) || [];

// SHOW USER NAME
document.getElementById("username").innerHTML = `<i class="fa-solid fa-hand-wave"></i> Hi, ${currentUser.name}`;

function renderPosts() {
    const container = document.getElementById("postsContainer");
    container.innerHTML = "";

    posts.forEach((post, index) => {
        const postEl = document.createElement('div');
        postEl.className = 'post';

        const h4 = document.createElement('h4');
        h4.textContent = post.user;

        const p = document.createElement('p');
        p.textContent = post.text;

        const actions = document.createElement('div');
        actions.className = 'actions';

        const likeSpan = document.createElement('span');
        likeSpan.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> Like (${post.likes})`;
        likeSpan.style.cursor = 'pointer';
        likeSpan.addEventListener('click', () => likePost(index));

        const commentSpan = document.createElement('span');
        commentSpan.innerHTML = '<i class="fa-regular fa-comment"></i> Comment';
        commentSpan.style.cursor = 'pointer';

        const delSpan = document.createElement('span');
        delSpan.textContent = 'Delete';
        delSpan.style.cursor = 'pointer';
        delSpan.addEventListener('click', () => deletePost(index));

        actions.appendChild(likeSpan);
        actions.appendChild(commentSpan);
        actions.appendChild(delSpan);

        // Comment box (hidden by default)
        const commentBox = document.createElement('div');
        commentBox.className = 'comment-box';
        commentBox.style.display = 'none';

        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Write a comment...';
        commentInput.style.marginRight = '8px';

        const commentBtn = document.createElement('button');
        commentBtn.textContent = 'Post';

        commentBtn.addEventListener('click', () => {
            const text = commentInput.value.trim();
            if (text === '') return;
            posts[index].comments = posts[index].comments || [];
            posts[index].comments.push(`${currentUser.name}: ${text}`);
            localStorage.setItem('posts', JSON.stringify(posts));
            renderPosts();
        });

        commentBox.appendChild(commentInput);
        commentBox.appendChild(commentBtn);

        // Comments list with per-comment delete buttons
        const commentsList = document.createElement('div');
        commentsList.className = 'comments';
        if (Array.isArray(post.comments)) {
            post.comments.forEach((c, ci) => {
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.justifyContent = 'space-between';

                const cp = document.createElement('p');
                cp.className = 'comment';
                cp.style.margin = '6px 0';
                cp.innerHTML = `<i class="fa-solid fa-user"></i> ${c}`;

                const delC = document.createElement('button');
                delC.textContent = 'Delete';
                delC.title = 'Delete comment';
                delC.style.marginLeft = '12px';
                delC.style.cursor = 'pointer';
                delC.addEventListener('click', () => deleteComment(index, ci));

                row.appendChild(cp);
                row.appendChild(delC);
                commentsList.appendChild(row);
            });
        }

        // Toggle comment box
        commentSpan.addEventListener('click', () => {
            commentBox.style.display = commentBox.style.display === 'none' ? 'block' : 'none';
        });

        postEl.appendChild(h4);
        postEl.appendChild(p);
        postEl.appendChild(actions);
        postEl.appendChild(commentBox);
        postEl.appendChild(commentsList);

        container.appendChild(postEl);
    });
}

function addPost() {
    const input = document.getElementById("postInput");

    if (input.value.trim() === "") return;

    const newPost = {
        user: currentUser.name,
        text: input.value,
        likes: 0,
        comments: []
    };

    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    input.value = "";
    renderPosts();
}

function likePost(index) {
    posts[index].likes += 1;
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

function deleteComment(postIndex, commentIndex) {
    if (!posts[postIndex] || !Array.isArray(posts[postIndex].comments)) return;
    posts[postIndex].comments.splice(commentIndex, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
}

function logout() {
    localStorage.removeItem("currentUser");
    alert("You have been logged out");
    window.location.href = "login.html";
}

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            mobileMenu.classList.remove('show');
        }
    });
}

renderPosts();