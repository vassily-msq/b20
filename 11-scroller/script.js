const postContainer = document.getElementById('post-container');
const loading  = document.querySelector('.loader');
const filter = document.getElementById('filter');

var limit = 3;
var page = 1;


// Fetch posts from API
async function getPosts() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  const data = await response.json();

  return data;
  
}

// Show loader and fetch more posts
function showLoading() {

  loading.classList.add('show');

  setTimeout(() => {

    loading.classList.remove('show');
    setTimeout(() => {
      page++;
      console.log(page);
      showPosts();
    }, 600);
  }, 1000);

}

async function showPosts() {
  const posts = await getPosts();
  console.log(posts);

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;
    postContainer.appendChild(postEl);


    
  });
}

// Filter posts by input
function filterPosts(e) {
  // console.log(e.target.value);
  term = e.target.value.toUpperCase();
  // Node list
  posts = document.querySelectorAll('.post'); 
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}


showPosts();

window.addEventListener('scroll', () => {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  if (scrollTop + clientHeight > scrollHeight-5) {
    showLoading();
  }
});


filter.addEventListener('input', filterPosts);