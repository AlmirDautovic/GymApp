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

function loadJson(path, succes, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                succes(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open('GET', path, true);
    xhr.send();
};
document.getElementById('show').addEventListener('click', function () {
    var list = document.getElementById('list');
    list.innerHTML = ''
    var listTitle = document.getElementById('listTitle').innerHTML = "Other users:"
    var userId = document.getElementById('userId').value;
    loadJson('http://localhost:3000/users/json?=' + userId, function (users) {
        for (let user of users) {
            var li = document.createElement('li');
            li.append(user.username);
            list.appendChild(li);
        }
    });
});



// $(document).ready(function () {

//     $('#show').click(function () {
//         var list = document.getElementById('list');
//         var userId = document.getElementById('userId').value;
//         $(list).empty()
//         $.getJSON('http://localhost:3000/users/json?id=' + userId, function (users) {
//             users.forEach(user => {
//                 const li = document.createElement('li');
//                 (li).append(user.username);
//                 list.appendChild(li);
//             });
//         });
//     });
// });

