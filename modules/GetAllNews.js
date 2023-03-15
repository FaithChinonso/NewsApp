const apiKey = "YOUR_API_KEY";
const apiUrl = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
const pageSize = 10;
let currentPage = 1;

const newsContainer = document.querySelector("#news-container");
const paginationContainer = document.querySelector("#pagination");

async function fetchNews() {
  try {
    const response = await fetch(
      `${apiUrl}|/news?page=${currentPage}&limit=${pageSize}`
    );
    const data = await response.json();
    return data.articles;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// function renderNews(articles) {
//   newsContainer.innerHTML = "";
//   articles.forEach(article => {
//     const articleElement = document.createElement("div");
//     articleElement.innerHTML = `
//         <h2>${article.title}</h2>
//         <img src="${article.urlToImage}" alt="${article.title}">
//         <p>${article.description}</p>
//         <a href="${article.url}" target="_blank">Read more</a>
//       `;
//     newsContainer.appendChild(articleElement);
//   });
// }

// function renderPagination(totalResults) {
//   paginationContainer.innerHTML = "";
//   const totalPages = Math.ceil(totalResults / pageSize);
//   for (let i = 1; i <= totalPages; i++) {
//     const buttonElement = document.createElement("button");
//     buttonElement.textContent = i;
//     buttonElement.addEventListener("click", () => {
//       currentPage = i;
//       fetchNews().then(renderNews);
//     });
//     paginationContainer.appendChild(buttonElement);
//   }
// }

// async function init() {
//     const data = await fetchNews();
//     renderNews(data);
//     renderPagination(data.totalResults);
//   }

//   init();
