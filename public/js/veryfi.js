let clogin = false;
let cpassa = false;
let cpassb = false;
let login = document.querySelector('#login');
let passa = document.querySelector('#passworda');
let passb = document.querySelector('#passwordb');

progress = 0
progressbar = document.querySelector('#progressb');
block1 = document.querySelector('#b1');
block2 = document.querySelector('#b2');
block3 = document.querySelector('#b3');
invite = document.querySelector('#next');
form = document.querySelector('#forms');

form.addEventListener(`submit`, async (event) => {
    event.preventDefault();
    let data = { login: login.value, password: passb.value, id: id };
    let response = await fetch("/verify", {
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


login.addEventListener(`input`, function () {
    if (login.value.length >= 5 && clogin != true) {
        progress += 1;
        clogin = true;
    } else if (clogin == true && login.value.length < 5) {
        progress -= 1;
        clogin = false;
    }
    if (progress == 0) {
        progressbar.style.width = '0%';
        invite.classList.add(`dis`);
        progressbar.classList.remove(`bg-green`);
        progressbar.classList.add(`bg-blue`);
        b3.classList.remove(`bg-blue`);
    } else if (progress == 1) {
        progressbar.style.width = '10%';
        invite.classList.add(`dis`);
        progressbar.classList.remove(`bg-green`);
        progressbar.classList.add(`bg-blue`);
        b3.classList.remove(`bg-blue`);
    } else if (progress == 2) {
        progressbar.style.width = '20%';
        invite.classList.add(`dis`);
        progressbar.classList.remove(`bg-green`);
        progressbar.classList.add(`bg-blue`);
        b3.classList.remove(`bg-blue`);
    } else if (progress == 3) {
        progressbar.style.width = '25%';
        invite.classList.remove(`dis`);
        progressbar.classList.add(`bg-green`);
        progressbar.classList.remove(`bg-blue`);
    }
});

passa.addEventListener(`input`, function () {
    if (passa.value.length >= 8 && cpassa != true && passb.value === passa.value) {
        progress += 2;
        cpassa = true;
        cpassb = true;
    } else if (cpassa == true && passa.value.length < 8 || cpassa == true && passb.value != passa.value) {
        progress -= 2;
        cpassa = false;
        cpassb = false;
    }
    if (progress == 0) {
        progressbar.style.width = '0%';
        invite.classList.add(`dis`);
        progressbar.classList.remove(`bg-green`);
        progressbar.classList.add(`bg-blue`);
        b3.classList.remove(`bg-blue`);
    } else if (progress == 1) {
        progressbar.style.width = '10%';
        invite.classList.add(`dis`);
        progressbar.classList.remove(`bg-green`);
        progressbar.classList.add(`bg-blue`);
        b3.classList.remove(`bg-blue`);
    } else if (progress == 2) {
        progressbar.style.width = '20%';
        invite.classList.add(`dis`);
        progressbar.classList.remove(`bg-green`);
        progressbar.classList.add(`bg-blue`);
        b3.classList.remove(`bg-blue`);
    } else if (progress == 3) {
        progressbar.style.width = '25%';
        invite.classList.remove(`dis`);
        progressbar.classList.add(`bg-green`);
        progressbar.classList.remove(`bg-blue`);
    }
});

passb.addEventListener(`input`, function () {
    if (passb.value.length >= 8 && cpassb != true && passa.value === passb.value) {
        progress += 2;
        cpassa = true;
        cpassb = true;
    } else if (cpassb == true && passb.value.length < 8 || cpassb == true && passa.value != passb.value) {
        progress -= 2;
        cpassa = false;
        cpassb = false;
    }
    if (progress == 0) {
        progressbar.style.width = '0%';
        invite.classList.add(`dis`);
        progressbar.classList.remove(`bg-green`);
        progressbar.classList.add(`bg-blue`);
        b3.classList.remove(`bg-blue`);
    } else if (progress == 1) {
        progressbar.style.width = '10%';
        invite.classList.add(`dis`);
        progressbar.classList.remove(`bg-green`);
        progressbar.classList.add(`bg-blue`);
        b3.classList.remove(`bg-blue`);
    } else if (progress == 2) {
        progressbar.style.width = '20%';
        invite.classList.add(`dis`);
        progressbar.classList.remove(`bg-green`);
        progressbar.classList.add(`bg-blue`);
        b3.classList.remove(`bg-blue`);
    } else if (progress == 3) {
        progressbar.style.width = '25%';
        invite.classList.remove(`dis`);
        progressbar.classList.add(`bg-green`);
        progressbar.classList.remove(`bg-blue`);
    }
});