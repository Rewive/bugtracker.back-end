let progress = 0;
let def = 0;
let cnames = false;
let clastname = false;
let cemail = false;
let progressbar = document.querySelector('#progressa');
let names = document.querySelector('#name');
let lastname = document.querySelector('#lastname');
let email = document.querySelector('#email');
let block1 = document.querySelector('#b1');
let block2 = document.querySelector('#b2');
let block3 = document.querySelector('#b3');
let invite = document.querySelector('#next');
let form = document.querySelector('#forms');
const render = document.querySelector('#render');
let id = ``

form.addEventListener(`submit`, async (event) => {
    event.preventDefault();
    let data = { name: names.value, lastname: lastname.value, email: email.value };
    let response = await fetch("/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const req = await response.json();
        if (req.status === "OK") {
            id = req.id;
            fetch('html/verify.html')
                .then(response => response.text())
                .then(html => {
                    render.innerHTML = html;
                    let script = document.createElement('script');
                    script.src = 'js/veryfi.js';
                    document.body.appendChild(script);
                });
            console.log(`Успех!`);
        }
    } else {
        const errors = await response.json();
        console.log(errors.errors[0].msg);
    }
});

names.addEventListener(`input`, () => {
    if (names.value.length >= 2 && cnames != true) {
        progress += 1;
        cnames = true;
    } else if (cnames == true && names.value.length < 2) {
        progress -= 1;
        cnames = false;
    }
    if (progress == 0) {
        progressbar.style.width = '0%';
    } else if (progress == 1) {
        progressbar.style.width = '10%';
    } else if (progress == 2) {
        progressbar.style.width = '20%';
    } else if (progress == 3) {
        progressbar.style.width = '25%';
        block2.classList.remove(`btn-secondary`);
        invite.classList.remove(`dis`);
        block2.classList.add(`bg-blue`);
        block1.classList.remove(`bg-blue`);
        block1.classList.add(`bg-green`);
        progressbar.classList.add(`bg-green`);
        progressbar.classList.remove(`bg-blue`);
    }
});

lastname.addEventListener(`input`, function () {
    if (lastname.value.length >= 2 && clastname != true) {
        progress += 1;
        def = progress;
        clastname = true;
    } else if (lastname == true && lastname.value.length < 2) {
        progress -= 1;
        clastname = false;
    }
    if (progress == 0) {
        progressbar.style.width = '0%';
    } else if (progress == 1) {
        progressbar.style.width = '10%';
    } else if (progress == 2) {
        progressbar.style.width = '20%';
    } else if (progress == 3) {
        progressbar.style.width = '25%';
        block2.classList.remove(`btn-secondary`);
        invite.classList.remove(`dis`);
        block2.classList.add(`bg-blue`);
        block1.classList.remove(`bg-blue`);
        block1.classList.add(`bg-green`);
        progressbar.classList.add(`bg-green`);
        progressbar.classList.remove(`bg-blue`);
    }
});

email.addEventListener(`input`, function () {
    if (email.value.length >= 12 && email.value.includes(`@`) && cemail != true) {
        progress += 1;
        def = progress;
        cemail = true;
    } else if (cemail == true && email.value.length < 12 || !email.value.includes(`@`) && cemail == true) {
        progress -= 1;
        cemail = false;
    }
    if (progress == 0) {
        progressbar.style.width = '0%';
    } else if (progress == 1) {
        progressbar.style.width = '10%';
    } else if (progress == 2) {
        progressbar.style.width = '20%';
    } else if (progress == 3) {
        progressbar.style.width = '25%';
        block2.classList.remove(`btn-secondary`);
        invite.classList.remove(`dis`);
        block2.classList.add(`bg-blue`);
        block1.classList.remove(`bg-blue`);
        block1.classList.add(`bg-green`);
        progressbar.classList.add(`bg-green`);
        progressbar.classList.remove(`bg-blue`);
    }
});
