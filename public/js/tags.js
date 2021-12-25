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