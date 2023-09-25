const commentFormHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#comment').value.trim();
  const blogId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  if (body) {
    console.log(body, blogId);
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ blog_id: blogId, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/blogs/${blogId}`);
    } else {
      alert('Please complete comment.');
    }
  }
};

document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);


const deleteFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  const response = await fetch(`/api/comments/${event.target.value}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace("/blogs/" + id);
  } else {
    alert('Your comment has not been deleted.');
  }
};

if (document.querySelector(".delete-comment-btn")) {
  document.querySelector(".delete-comment-btn").addEventListener("click", deleteFormHandler);
};