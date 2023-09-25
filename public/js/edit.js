const editFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#blog-title').value.trim();
  const post = document.querySelector('#blog-post').value.trim();
  const id = window.location.toString().split("/")[window.location.toString().split("/").length - 2];

  const response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title, post,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert("Blog post not edited.");
  }
}

document.querySelector('.edit-blog-post').addEventListener("submit", editFormHandler);