const addFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const post = document.querySelector('#blog-post').value.trim();

  if (title && post) {
    const response = await fetch('/api/Blogs', {
      method: 'POST',
      body: JSON.stringify({ title, post }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.getElementById('add-blog-post').addEventListener('submit', addFormHandler);