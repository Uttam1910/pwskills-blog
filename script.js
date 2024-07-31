document.addEventListener('DOMContentLoaded', () => {
    // Handle form submission
    if (document.getElementById('blog-form')) {
        document.getElementById('blog-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const poster = document.getElementById('poster').value;
            const description = document.getElementById('description').value;
            const content = document.getElementById('content').value;
            const image = document.getElementById('image').files[0];

            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                const blog = { title, poster, description, content, imageUrl };
                addBlog(blog);
            };
            if (image) {
                reader.readAsDataURL(image);
            } else {
                const blog = { title, poster, description, content, imageUrl: '' };
                addBlog(blog);
            }
        });
    }

    // Load blogs on home page
    if (document.getElementById('blogs')) {
        renderBlogs();
    }

    // Load blog details on detail page
    if (document.getElementById('blog-detail')) {
        const params = new URLSearchParams(window.location.search);
        const index = params.get('index');
        renderBlogDetail(index);
    }
});

const addBlog = (blog) => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    alert('Blog added successfully!');
    window.location.href = 'index.html'; // Redirect to home page
};

const deleteBlog = (index) => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.splice(index, 1);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    renderBlogs();
    alert('Blog deleted successfully!');
};

const renderBlogs = () => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogsContainer = document.querySelector('.blogs-container');
    blogsContainer.innerHTML = '';
    blogs.forEach((blog, index) => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <img src="${blog.imageUrl}" alt="${blog.title}">
            <div class="card-content">
                <h2>${blog.title}</h2>
                <p>${blog.description}</p>
                <button onclick="viewBlog(${index})">Read</button>
                <button onclick="deleteBlog(${index})" class="delete-btn">Delete</button>
            </div>
        `;
        blogsContainer.appendChild(blogCard);
    });
};

const viewBlog = (index) => {
    window.location.href = `blog-detail.html?index=${index}`;
};

const renderBlogDetail = (index) => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs[index];
    const blogDetailContainer = document.getElementById('blog-detail');
    blogDetailContainer.innerHTML = `
        <h2>${blog.title}</h2>
        <img src="${blog.imageUrl}" alt="${blog.title}">
        <p>${blog.description}</p>
        <div>${blog.content}</div>
    `;
};
