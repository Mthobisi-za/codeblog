function makeEleme(title, content, author, id) {
    var fullString = `
            <h1 class="title">${title}</h1>
            <p>${content}</p>
            <p>by ${author}</p> <br>
            <button class="btn bg-info"> <a class="nav-item nav-link" href="/post/${id}"> Read More</a>  </button>
            <br> <br>
    `
    var left = document.createElement('div');
    div.classList.add('left');
    left.innerHTML = fullString;
    return {
        left
    }
}
var div = document.querySelector('.table');
async function start() {
    var data = await axios.get('/data');
    for (let i = 0; i < data.data.length; i++) {
        const ele = data.data[i];
        console.log(ele);
        var data = makeEleme(ele.title, ele.content, ele.author, ele.id).left;
        div.appendChild(data);
    }
}
start();