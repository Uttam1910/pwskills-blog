document.addEventListener('DOMContentLoaded', () => {
    const addBlogBtn = document.getElementById('add-blog-btn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const blogForm = document.getElementById('blog-form');
    const blogsContainer = document.getElementById('blogs');

    addBlogBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const poster = document.getElementById('poster').value;
        const description = document.getElementById('description').value;
        const content = document.getElementById('content').value;

        const blog = {
            title,
            poster,
            description,
            content
        };

        addBlog(blog);
        blogForm.reset();
        modal.classList.add('hidden');
    });

    const addBlog = (blog) => {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.push(blog);
        localStorage.setItem('blogs', JSON.stringify(blogs));
        renderBlogs();
    };

    const renderBlogs = () => {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogsContainer.innerHTML = '';
        blogs.forEach((blog, index) => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';

            blogCard.innerHTML = `
                <img src="${blog.poster}" alt="${blog.title}">
                <div class="card-content">
                    <h2>${blog.title}</h2>
                    <p>${blog.description}</p>
                    <button onclick="viewBlog(${index})">Read</button>
                </div>
            `;

            blogsContainer.appendChild(blogCard);
        });
    };

    renderBlogs();
});

const viewBlog = (index) => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs[index];
    alert(`Title: ${blog.title}\n\nContent: ${blog.content}`);
};
