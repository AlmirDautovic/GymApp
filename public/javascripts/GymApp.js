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
var show = document.getElementById('show');
if (show != null) {
    show.addEventListener('click', function () {
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
}


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

var deleteBtn = document.getElementById('deleteUser');

const deleteUser = async () => {
    try {
        var currentId = deleteBtn.value;
        var ul = document.getElementById('userList');
        ul.innerHTML = ''
        const res = await fetch('http://localhost:3000/users/delete?id=' + currentId);
        const status = res.status;
        console.log(status)
        if (status == 200) {
            const res2 = await fetch('http://localhost:3000/users/json')
            const users = await res2.json();
            for (let user of users) {
                var li = document.createElement('li');
                li.append(user.username)
                ul.appendChild(li);
            }
        }
    } catch (error) {
        console.log('error!!', error)
    }
}

if (deleteBtn != null) {
    deleteBtn.addEventListener('click', deleteUser)
}



