function makeElem(src) {
    var img = document.createElement('img');
    img.src = src;
    img.style.height = '200px'
    img.style.width = '50%'
    img.setAttribute('class', 'dynamicclass')
    return {
        img
    }
}
var div = document.querySelector('.boxedright');

var fileinput = document.querySelector('.file');
fileinput.addEventListener('change', () => {
    var img = fileinput.files[0];
    var filereader = new FileReader();
    filereader.onload = (event) => {
        var url = event.target.result;
        div.appendChild(makeElem(url).img);
        document.querySelector('.hiddenimg').value = url;
    }
    filereader.readAsDataURL(img);
});

var urlinput = document.querySelector('.url');
urlinput.addEventListener('change', () => {
    var url = urlinput.value;
    div.appendChild(makeElem(url).img);
    document.querySelector('.hiddenimg').value = url;
});

function clear() {
    alert('hey');
    document.querySelector('.dynamicclass').src = '';
    document.querySelector('.hiddenimg').value = ' ';
    document.querySelector('.dynamicclass').remove()
}

var button = document.querySelector('.btnclear');
button.addEventListener('click', clear);




var textarea = document.querySelector('#tags');
var divtag = document.querySelector('.textt');
var inp = document.querySelector('.inp');

function checkTags() {
    if (textarea.value.includes(',')) {
        var data = textarea.value.split(',');
        document.querySelector('#tags').value = ' ';
        var p = document.createElement('p');
        p.classList.add('ptag');
        p.innerHTML = data[0];
        divtag.appendChild(p);
        var dynamic = divtag.textContent;
        inp.value = dynamic;
        console.log(inp);
    }
}