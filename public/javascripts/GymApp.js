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

// var deleteBtn = document.getElementsByClassName('btn btn-sm btn-danger');
// console.log(deleteBtn)
// const deleteBtnArr = [...deleteBtn]
// console.log(deleteBtnArr)
// console.log(deleteBtn[1].attributes.value.value)
// const deleteUser = async (id) => {
//     try {
//         var h1 = document.getElementById('allusers');
//         // var currentId = deleteBtn.value;
//         var ul = document.getElementById('userList');
//         const res = await fetch('http://localhost:3000/users/delete?id=' + id);
//         const status = res.status;
//         if (status == 200) {
//             const res2 = await fetch('http://localhost:3000/users/json')
//             const users = await res2.json();
//             ul.innerHTML = '';
//             h1.innerText = "List of all users:"
//             for (let user of users) {
//                 let active = '';
//                 if (user.status) {
//                     active = 'checked';
//                 }
//                 ul.innerHTML +=
//                     '<li>' +
//                     '<div class="row">' + '<br/>' +
//                     '<div class="col-md-5 col-sm text-md">' + user.username + '</div>' +
//                     '<div class="col-md-2 col-sm-12">' +
//                     '<div class="form-check">' +
//                     '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled="" ' + active + '>' +
//                     '<label class="form-check-label" for="flexCheckDefault">Active</label>' +
//                     '</div>' +
//                     '</div>' +
//                     '<div class="col-md-2 col-sm-12">' +
//                     '<a role="button" class="btn btn-outline-dark" href="/users/' + user._id +
//                     '" style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .65rem;">' +
//                     'Show More' +
//                     '</a>' +
//                     '</div>' +
//                     '<div class="col-md-2 col-sm-12">' +
//                     '<button type="button" class="btn btn-sm btn-danger" onclick="getUser(this)" value="' + user._id + '"' +
//                     'name="deleteBtn">Delete user</button>' +
//                     '</div>' +
//                     '</div>' +
//                     '</li>';
//             }
//         }

//     } catch (error) {
//         console.log('error!!', error)
//     }
// }


function deleteUser(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:3000/users/delete?id=' + id, true);

    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == '200') {
            createContent();
        }
        else {
            console.log('ERROR!', error)
        }
    }
    xhr.send()
};

function createContent() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/users/json', true);

    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        var h1 = document.getElementById('allusers');
        var ul = document.getElementById('userList');
        if (xhr.readyState == 4 && xhr.status == '200') {
            ul.innerHTML = '';
            h1.innerText = "List of all users:"
            for (let user of users) {
                let active = '';
                if (user.status) {
                    active = 'checked';
                }
                ul.innerHTML +=
                    '<li>' +
                    '<div class="row">' + '<br/>' +
                    '<div class="col-md-5 col-sm text-md">' + user.username + '</div>' +
                    '<div class="col-md-2 col-sm-12">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled="" ' + active + '>' +
                    '<label class="form-check-label" for="flexCheckDefault">Active</label>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-md-2 col-sm-12">' +
                    '<a role="button" class="btn btn-outline-dark" href="/users/' + user._id +
                    '" style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .65rem;">' +
                    'Show More' +
                    '</a>' +
                    '</div>' +
                    '<div class="col-md-2 col-sm-12">' +
                    '<button type="button" class="btn btn-sm btn-danger" onclick="getUser(this)" value="' + user._id + '"' +
                    'name="deleteBtn">Delete user</button>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            }
        } else {
            console.error(users)
        }
    }
    xhr.send()
}

function getUser(element) {
    deleteUser(element.value)
}

function removeOneUser(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", 'http://localhost:3000/users?id=' + id, true);
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == '200') {
            console.log("SUCCESS!");
        }
        else {
            console.log('ERROR!', error)
        }
    }
    xhr.send()
}

function deleteOne(element) {
    removeOneUser(element.value)
}