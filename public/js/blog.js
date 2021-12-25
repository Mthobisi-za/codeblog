function makeEleme(title, content, author, id) {
    var fullImg;
    var imgev = content.split(' ');
    imgev.forEach(element => {
        if (element.includes('src=')) {
            var ele = element.split('src=');
            fullImg = ele[1]
        }
    });
    var descript = content.split('<p></p>');
    descript.forEach(element => {
        if (element.includes('<p>')) {

        }
    });
    //variables
    //variables
    var fullString = `
            <h1 class="title">Tittle : ${title}</h1>
            <p>${content}</p>
            <p>by ${author}</p> <br>
            <button class="btn bg-info"> <a class="nav-item nav-link" href="/post/${id}"> Read More</a>  </button>
            <br> <br>
    `
    var rightString = `<br>
    <img src=${fullImg}>`

    var left = document.createElement('div');
    var right = document.createElement('div');
    left.classList.add('left');
    left.innerHTML = fullString;
    right.classList.add('right');
    right.innerHTML = rightString;
    return {
        left,
        right
    }
}
var div = document.querySelector('.table');
async function start() {
    var data = await axios.get('/data');
    for (let i = 0; i < data.data.length; i++) {
        const ele = data.data[i];
        var content = JSON.parse(ele.content);
        console.log(ele);
        var dataleft = makeEleme(ele.title, content, ele.author, ele.id).left;
        var dataright = makeEleme(ele.title, content, ele.author, ele.id).right;
        div.appendChild(dataleft);
        div.appendChild(dataright);
    }
}
start();