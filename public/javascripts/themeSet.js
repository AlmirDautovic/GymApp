const btn1 = document.getElementById('dark');
const btn2 = document.getElementById('white');

btn1.addEventListener('click', function onClick(event) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = 'white';
    event.target.classList.add('btn-light');
});

btn2.addEventListener('click', function onClick(event) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = 'black';
    event.target.classList.add('btn-light');
});
