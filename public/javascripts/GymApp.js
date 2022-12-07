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
};

// function loadJson(path, succes, error) {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 succes(JSON.parse(xhr.responseText));
//             } else {
//                 if (error)
//                     error(xhr);
//             }
//         }
//     };
//     xhr.open('GET', path, true);
//     xhr.send();
// };

// var nameList = '';
// loadJson('http://localhost:3000/users/json', function (users) {
//     for (let user of users) {
//         let name = user.username;
//         console.log(name)
//         nameList += name
//     };
// },
//     function (xhr) { console.error(xhr) });


// document.getElementById('show').addEventListener('click', function () {
//     document.getElementById('list').innerHTML += nameList;
// });

$(document).ready(function () {

    $('#show').click(function () {
        var list = document.getElementById('list');
        var userId = document.getElementById('userId').value;
        $.getJSON('http://localhost:3000/users/json?id=' + userId, function (users) {
            users.forEach(user => {
                const li = document.createElement('li');
                (li).append(user.username);
                list.appendChild(li);
            });
        });
        $(list).empty()
    });
});

