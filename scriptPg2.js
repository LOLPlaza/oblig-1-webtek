let posts = document.getElementById("postSection");
let values = [];
let valuesIndex = 0;
const batchSize = 3;

fetch("posts.json")
    .then(response => response.json())
    .then(
        json => {values = json.slice(0, 99);
        renderBatch();}
    );

function renderBatch() {
    if (valuesIndex < values.length) {
        let newPosts = '';
        for (let i = 0 ; i < batchSize ; i++, valuesIndex++) {
                newPosts += `<article class="post-content">
                <h3 class="postTitle">${values[valuesIndex].title}</h3>
                <p class="postContent">${values[valuesIndex].body}</p>
                </article>`;
    }

        let postGrid = document.createElement('article');
        postGrid.className = "postGrid";
        postGrid.innerHTML = newPosts;
        posts.appendChild(postGrid);
    }
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        renderBatch();
    }
});