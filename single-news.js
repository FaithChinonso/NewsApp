const id = new URLSearchParams(window.location.search).get("id");
const newsContainer = document.getElementById("news-cover");
const newsCard = document.getElementById("news-images");
const newsCommentsContainer = document.getElementById("news-comments");
const group = document.getElementById("group");
const wrapper = document.getElementById("image-wrapper");
const textWrapper = document.getElementById("text-wrapper");
const title = document.getElementById("news-title");
const image = document.getElementById("news-avatar");
const header = document.getElementById("header");
const commentHeader = document.getElementById("comment-header");
const addNewCommentButton = document.getElementById("add-comment-btn");
const addNewImageButton = document.getElementById("add-image-btn");
const commentForm = document.getElementById("comment-form");
const imageForm = document.getElementById("image-form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const avatarInput = document.getElementById("avatar");
const avatarImage = document.getElementById("avatar-image");
const comments = document.createElement("div");

async function fetchNewsById(id) {
  const response = await fetch(
    `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${id}`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

async function fetchNewsImages(id) {
  const response = await fetch(
    `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${id}/images`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

async function fetchNewsComments(id) {
  const response = await fetch(
    `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${id}/comments`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

async function renderNewsItem(id) {
  const [newsItem, newsImages, newsComments] = await Promise.all([
    fetchNewsById(id),
    fetchNewsImages(id),
    fetchNewsComments(id),
  ]);

  //   const newsItem = fetchNewsById(id);
  //   const newsImages = fetchNewsImages(id);
  //   const newsComments = fetchNewsComments(id);
  console.log(newsImages, newsItem, newsComments);
  console.log(newsImages);
  // Create the HTML for the news item, images, and comments

  title.textContent = newsItem.title;

  const content = document.getElementById("news-author");
  content.textContent = newsItem.author;

  image.src = newsItem.avatar;
  wrapper.appendChild(image);
  textWrapper.appendChild(title);
  textWrapper.appendChild(content);
  group.appendChild(wrapper);
  group.appendChild(textWrapper);

  newsCard.appendChild(header);
  newsCommentsContainer.appendChild(commentHeader);
  newsCommentsContainer.appendChild(addNewCommentButton);
  newsCard.appendChild(addNewImageButton);
  addNewCommentButton.addEventListener("click", () => {
    commentForm.style.display = "block";
  });
  addNewImageButton.addEventListener("click", () => {
    imageForm.style.display = "block";
  });

  for (let i = 0; i < newsImages.length; i++) {
    const image = newsImages[i];
    const img = document.createElement("img");
    img.src = image.image;
    newsCard.appendChild(img);
  }
  for (let i = 0; i < newsComments.length; i++) {
    const comment = newsComments[i];
    const img = document.createElement("img");
    img.src = comment.avatar;
    const name = document.createElement("h2");
    name.textContent = comment.name;
    const time = document.createElement("p");
    time.textContent = comment.createdAt;
    comments.appendChild(img);
    comments.appendChild(name);
    comments.appendChild(time);
    newsCommentsContainer.appendChild(comments);
  }
  newsContainer.appendChild(group);
  newsContainer.appendChild(newsCard);
  newsContainer.appendChild(newsCommentsContainer);
  newsCommentsContainer.appendChild(commentForm);
  newsCard.appendChild(imageForm);
}

renderNewsItem(id);

commentForm.addEventListener("submit", async event => {
  event.preventDefault();

  const name = nameInput.value;
  const comment = messageInput.value;

  const avatarFile = avatarInput.files[0];
  const avatarName = avatarFile.name;
  const avatarType = avatarFile.type;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("comment", comment);
  formData.append("avatar", avatarFile);

  try {
    const response = await fetch(
      `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${id}/comments`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

imageForm.addEventListener("submit", async event => {
  event.preventDefault();

  const avatarFile = avatarImage.files[0];

  const formData = new FormData();

  formData.append("image", avatarFile);

  try {
    const response = await fetch(
      `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${id}/images`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
