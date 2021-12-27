function makeElem(content) {
    var div = document.querySelector('.actualContent');
    div.innerHTML = content;
    var nextPost = document.querySelector('.a_next');
    nextPost.href = "http://www.google.com/gmail/";
    nextPost.textContent = 'title'
    div.innerHTML = content;
}
(async() => {
    var title = document.querySelector('.title');
    var data = await axios.get('/axios/post/' + title.textContent);
    var changed = JSON.parse(data.data.content)
    makeElem(changed);

})();
(async() => {
    var title = document.querySelector('.title');
    var nextPost = await axios.get('/axios/next/post/' + title.textContent);
    console.log(nextPost.data);
})()