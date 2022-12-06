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

        $.getJSON('http://localhost:3000/users/json', function (users, textStatus, jqXHR) {
            users.forEach(user => {
                const li = document.createElement('li');
                $(li).append(user.username);
                const list = document.getElementById('list');
                list.appendChild(li);
            });
        });
    });
});