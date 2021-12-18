var textarea = document.querySelector('#tags');
var div = document.querySelector('.text');
var inp = document.querySelector('.inp');

function checkTags() {
    if (textarea.value.includes(',')) {
        var data = textarea.value.split(',');
        document.querySelector('#tags').value = ' ';
        var p = document.createElement('p');
        p.classList.add('ptag');
        p.innerHTML = data[0];
        div.appendChild(p);
        var dynamic = div.textContent;
        inp.value = dynamic;
        console.log(inp);
    }
}