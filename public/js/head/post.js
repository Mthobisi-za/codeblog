function updateHead(title, description, tags, author) {
    var head = document.querySelector('head');
    var string = document.createElement('div');
    string.innerHTML = `
    <title>${title}| Code Blog</title>
    <meta http-equiv="content-language" content="en">
    <meta charset="UTF-8">
    <meta name="keywords" content="Blog Website, Free online content, tutorial blog, news, trends, ${tags}">
    <meta name="author" content="${author}">
    <meta name="publisher" content="${author}">
    <meta name="copyright" content="${author}">
    <meta name="description" content="${description}">
    <meta name="page-topic" content="${title} | codeBlog">
    <meta name="page-type" content="Blogging">
    <meta name="audience" content="Everyone">
    <meta name="robots" content="index, follow">`
    head.appendChild(string);
}

(async() => {
    var titler = document.querySelector('.title');
    var datar = await axios.get('/axios/post/' + titler.textContent);
    var changedr = datar.data
    var title = changedr.title;
    var description = changedr.description;
    var tags = changedr.tags;
    var author = changedr.author;
    updateHead(title, description, tags, author);
})();