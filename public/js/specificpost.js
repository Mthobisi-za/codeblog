function makeElem(content) {
    var div = document.querySelector('.actualContent');
    div.innerHTML = content;
}
(async() => {
    var title = document.querySelector('.title');
    var data = await axios.get('/axios/post/' + title.textContent);
    var changed = JSON.parse(data.data.content)
    makeElem(changed);
})();