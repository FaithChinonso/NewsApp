const limit = 10;
let currentPage = 1;
const author = document.getElementById("author");
const title = document.getElementById("title");
const url = document.getElementById("url");
const avatar = document.getElementById("avatar");
const authorEdit = document.getElementById("author-edit");
const titleEdit = document.getElementById("title-edit");
const urlEdit = document.getElementById("url-edit");
const avatarEdit = document.getElementById("avatar-edit");
const newsContainer = document.getElementById("news-container");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const newsButton = document.getElementById("add-news-btn");

const newsForm = document.getElementById("news-form");

function fetchNews() {
  fetch(
    `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news?page=${currentPage}&limit=${limit}`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      newsContainer.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        const newsItem = data[i];

        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const img = document.createElement("img");
        const readMoreButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        const flex = document.createElement("div");
        const innerFlex = document.createElement("div");
        const wrapper = document.createElement("div");
        flex.classList.add("cover");
        innerFlex.classList.add("innerCover");
        wrapper.classList.add("imageWrapper");
        const editForm = document.getElementById("edit-form");

        h2.textContent = newsItem.title;
        p.textContent = newsItem.author;
        img.src = newsItem.avatar;
        readMoreButton.setAttribute("data-news-id", newsItem.id);
        readMoreButton.textContent = "Read More";
        deleteButton.setAttribute("data-news-id", newsItem.id);
        deleteButton.textContent = "Delete News";
        editButton.setAttribute("data-news-id", newsItem.id);
        editButton.textContent = "Edit News";
        innerFlex.appendChild(readMoreButton);
        innerFlex.appendChild(deleteButton);
        innerFlex.appendChild(editButton);
        wrapper.appendChild(img);
        flex.appendChild(editForm);
        flex.appendChild(h2);
        flex.appendChild(p);
        flex.appendChild(wrapper);
        flex.appendChild(innerFlex);

        newsContainer.appendChild(flex);
        newsContainer.appendChild(newsButton);
        newsContainer.appendChild(newsForm);

        readMoreButton.addEventListener("click", () => {
          const newsId = readMoreButton.getAttribute("data-news-id");
          // Redirect to single news page
          window.location.href = `news.html?id=${newsId}`;
        });
        deleteButton.addEventListener("click", async () => {
          const newsId = readMoreButton.getAttribute("data-news-id");
          try {
            const response = await fetch(
              `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}`,
              {
                method: "DELETE",
              }
            );

            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        });
        editButton.addEventListener("click", () => {
          editForm.style.display = "block";
          const newsId = readMoreButton.getAttribute("data-news-id");
          editForm.addEventListener("submit", async event => {
            event.preventDefault();

            const avatarFile = avatarEdit.files[0];
            const auth = authorEdit.value;
            const ur = urlEdit.value;
            const titl = titleEdit.value;

            const formData = new FormData();

            formData.append("avatar", avatarFile);
            formData.append("author", auth);
            formData.append("title", titl);
            formData.append("url", ur);

            console.log("clicked");

            try {
              const response = await fetch(
                `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}`,
                {
                  method: "PUT",
                  body: formData,
                }
              );

              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          });
        });
      }

      newsButton.addEventListener("click", () => {
        newsForm.style.display = "block";
      });

      // Enable or disable the back button based on the current page number
      if (currentPage > 1) {
        backBtn.disabled = false;
      } else {
        backBtn.disabled = true;
      }

      // Enable or disable the next button based on the number of news items returned
      if (data.length === limit) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    })
    .catch(error => console.error(error));
}

newsButton.classList.add("addButton");

// Handle back button click event
backBtn.addEventListener("click", () => {
  currentPage--;
  fetchNews();
});

// Handle next button click event
nextBtn.addEventListener("click", () => {
  currentPage++;
  fetchNews();
});

// Fetch news for the initial page load
fetchNews();

newsForm.addEventListener("submit", async event => {
  event.preventDefault();

  const avatarFile = avatar.files[0];
  const auth = author.value;
  const ur = url.value;
  const titl = title.value;

  const formData = new FormData();

  formData.append("avatar", avatarFile);
  formData.append("author", auth);
  formData.append("title", titl);
  formData.append("url", ur);

  console.log("clicked");

  try {
    const response = await fetch(
      `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news`,
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
