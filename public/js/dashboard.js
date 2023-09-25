const form = document.getElementById("add-blog-post");

const title = document.querySelector('#blog-title').value.trim();
const post = document.querySelector('#blog-post').value.trim();

document.querySelector("#add-Blog-btn").addEventListener("click", function () {
  form.style.display = "block";
});