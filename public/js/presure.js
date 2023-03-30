let product = document.querySelector('#product');
let create = document.querySelector('#create');

out = document.querySelector('#out');
form = document.querySelector('#singform');

form.addEventListener(`submit`, async (event) => {
    event.preventDefault();
    let data = { job: select.value };
    let response = await fetch("/product", {
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


create.addEventListener('click', function () {
    form.submit();
})

product.addEventListener('input', function () {
    if (product.value.length >= 10) {
        out.classList.remove(`outdim`);
    } else {
        out.classList.add(`outdim`);
    }
});