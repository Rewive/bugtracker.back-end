let leader = document.querySelector(`#leader`);
let qa = document.querySelector(`#pm`);
let pm = document.querySelector(`#qa`);
let dev = document.querySelector(`#dev`);
let b3 = document.querySelector(`#b3`);
let fprogress = document.querySelector(`#progress-selector`);
let sel = document.querySelector(`#sel`);
let out = document.querySelector(`#out`);
let select = document.querySelector(`#sel`);

form = document.querySelector(`#forms`);

form.addEventListener(`submit`, async (event) => {
    event.preventDefault();
    let data = { job: select.value };
    let response = await fetch("/select", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const req = await response.json();
        if (req.status === "OK") {
            fetch('html/presure.html')
                .then(response => response.text())
                .then(html => {
                    render.innerHTML = html;
                    let script = document.createElement('script');
                    script.src = 'js/presure.js';
                    document.body.appendChild(script);
                });
            console.log(`Успех!`);
        }
    } else {
        const errors = await response.json();
        console.log(errors);
    }
});

leader.addEventListener(`click`, function () {
    leader.classList.remove(`dim`);
    qa.classList.add(`dim`);
    pm.classList.add(`dim`);
    dev.classList.add(`dim`);
    fprogress.style.width = `50%`;
    b3.classList.remove(`btn-secondary`);
    out.classList.remove(`outdim`);
    b3.classList.add(`btn-primary`);
    sel.selectedIndex = 0;
})

qa.addEventListener(`click`, function () {
    leader.classList.add(`dim`);
    qa.classList.remove(`dim`);
    pm.classList.add(`dim`);
    dev.classList.add(`dim`);
    fprogress.style.width = `50%`;
    b3.classList.remove(`btn-secondary`);
    out.classList.remove(`outdim`);
    b3.classList.add(`btn-primary`);
    sel.selectedIndex = 1;
})

pm.addEventListener(`click`, function () {
    leader.classList.add(`dim`);
    qa.classList.add(`dim`);
    pm.classList.remove(`dim`);
    dev.classList.add(`dim`);
    fprogress.style.width = `50%`;
    b3.classList.remove(`btn-secondary`);
    out.classList.remove(`outdim`);
    b3.classList.add(`btn-primary`);
    sel.selectedIndex = 2;
})

dev.addEventListener(`click`, function () {
    leader.classList.add(`dim`)
    qa.classList.add(`dim`)
    pm.classList.add(`dim`)
    dev.classList.remove(`dim`)
    fprogress.style.width = `50%`;
    b3.classList.remove(`btn-secondary`);
    out.classList.remove(`outdim`);
    b3.classList.add(`btn-primary`);
    sel.selectedIndex = 3;
})

