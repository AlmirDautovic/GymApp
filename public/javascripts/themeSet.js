// const btn1 = document.getElementById('dark');
// var btn2 = document.getElementById('white');

// btn1.addEventListener('click', function onClick(event) {
//     document.body.style.backgroundColor = "black";
//     document.body.style.color = 'white';
//     event.target.classList.add('btn-light');
//     btn2.classList.add('btn-light')
// });

// btn2.addEventListener('click', function onClick(event) {
//     document.body.style.backgroundColor = "white";
//     document.body.style.color = '#7A7A7A';
//     event.target.classList.add('btn-light');
// });

var switcher = document.getElementById('switch');
if (switcher != null) {
    switcher.addEventListener('change', function onChange(event) {
        let color = document.body.style.backgroundColor;
        if (color === 'black') {
            document.body.style.backgroundColor = 'white'
            document.body.style.color = '#7A7A7A';
        } else {
            document.body.style.backgroundColor = 'black'
            document.body.style.color = 'white';
        }
    })
}

