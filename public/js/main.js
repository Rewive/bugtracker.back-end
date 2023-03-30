let progress = 0;
let switchpas = false;
let switchlog = false;
let progressbar = document.querySelector('#progress');
let login = document.querySelector('#login');
let password = document.querySelector('#password');
let block1 = document.querySelector('#b1');
let block2 = document.querySelector('#b2');
let block3 = document.querySelector('#b3');
let invite = document.querySelector('#in');
let sing = document.querySelector('#sing');
let singform = document.querySelector('#singform');
let formex = document.querySelector('#formed');
let render = document.querySelector('#render');

formex.addEventListener(`submit`, async (event) => {
    event.preventDefault();
    let data = { login: login.value, password: password.value };
    let response = await fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const req = await response.json();
        if (req.status === "OK") {
            fetch('html/action.html')
                .then(response => response.text())
                .then(html => {
                    render.innerHTML = html;
                    let script = document.createElement('script');
                    script.src = 'js/action.js';
                    document.body.appendChild(script);
                    document.scripts[1].remove();
                });
            console.log(`Успех!`);
        }
    } else {
        const errors = await response.json();
        console.log(errors);
    }
});

sing.addEventListener(`click`, async (event) => {
    singform.submit();
});

password.addEventListener('input', function () {
    if (password.value != `` && progress == 0 && switchpas == false && switchlog == false && password.value.length >= 8) {
        progress = 1;
        switchpas = true;
        progressbar.style.width = '25%';
    } else if (password.value != '' && progress == 1 && switchpas == false && switchlog == true && password.value.length >= 8) {
        progress = 2;
        switchpas = true;
        block2.classList.remove(`btn-secondary`);
        invite.classList.remove(`dis`);
        block2.classList.add(`bg-blue`);
        block1.classList.add(`bg-green`);
        progressbar.style.width = '50%';
    } else if (password.value == '' && progress == 1 && switchpas == true && switchlog == false || password.value.length < 8 && progress == 1 && switchpas == true && switchlog == false) {
        progress = 0;
        switchpas = false;
        block2.classList.add(`btn-secondary`);
        invite.classList.add(`dis`);
        block2.classList.remove(`bg-blue`);
        block1.classList.remove(`bg-green`);
        progressbar.style.width = '0%';
    } else if (password.value == '' && progress == 2 && switchpas == true && switchlog == true || password.value.length < 8 && progress == 2 && switchpas == true && switchlog == true) {
        progress = 1;
        switchpas = false;
        block2.classList.add(`btn-secondary`);
        invite.classList.add(`dis`);
        block2.classList.remove(`bg-blue`);
        block1.classList.remove(`bg-green`);
        progressbar.style.width = '25%';
    }
});

login.addEventListener('input', function () {
    if (login.value != `` && progress == 0 && switchpas == false && switchlog == false && login.value.length >= 5) {
        progress = 1;
        switchlog = true;
        progressbar.style.width = '25%';
    } else if (login.value != '' && progress == 1 && switchpas == true && switchlog == false && login.value.length >= 5) {
        progress = 2;
        switchlog = true;
        block2.classList.remove(`btn-secondary`);
        invite.classList.remove(`dis`);
        block2.classList.add(`bg-blue`);
        block1.classList.add(`bg-green`);
        progressbar.style.width = '50%';
    } else if (login.value == '' && progress == 1 && switchpas == false && switchlog == true || login.value.length < 5 && progress == 1 && switchpas == false && switchlog == true) {
        progress = 0;
        switchlog = false;
        block2.classList.add(`btn-secondary`);
        invite.classList.add(`dis`);
        block2.classList.remove(`bg-blue`);
        block1.classList.remove(`bg-green`);
        progressbar.style.width = '0%';
    } else if (login.value == '' && progress == 2 && switchpas == true && switchlog == true || progress == 2 && switchpas == true && switchlog == true && login.value.length < 5) {
        progress = 1;
        switchlog = false;
        block2.classList.add(`btn-secondary`);
        invite.classList.add(`dis`);
        block2.classList.remove(`bg-blue`);
        block1.classList.remove(`bg-green`);
        progressbar.style.width = '25%';
    }
});