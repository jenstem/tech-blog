const deleteFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[window.location.toString().split("/").length - 2];

  const response = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert("Blog post not deleted.");
  }
}

document.querySelector(".delete-blog-btn").addEventListener("click", deleteFormHandler);