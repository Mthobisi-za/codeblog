(async() => {
    try {
        var title = document.querySelector('.titleinput')
        console.log(title.value)
        var data = await axios.get('/axios/post/' + title.value);
        var changed = JSON.parse(data.data.content);
        var editor = document.querySelector('#editor');
        editor.innerHTML = changed;
        var description = document.querySelector('.description');
        description.innerHTML = data.data.description;
        var textt = document.querySelector('.textt');
        console.log(data.data.tags)
        var arg = data.data.tags.split(",");
        arg.forEach(element => {
            var p = document.createElement('p');
            p.innerHTML = element;
            p.classList.add('ptag');
            textt.appendChild(p);
        })
    } catch (error) {
        console.log(error);
    }

})();