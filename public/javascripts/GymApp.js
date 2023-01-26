// part of code for changing to dark or white background on home page:

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


// Function that is used on single user page (view user details) to show other users:

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


// Function for dinamically display content on user page, without refreshing after deleting user

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
    xhr.open("DELETE", 'http://localhost:3000/users/delete?id=' + id, true);
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == '200') {
            redirectAfterDelete();
        }
        else {
            console.error(error)
        }
    }
    xhr.send(null)
}

function redirectAfterDelete() {
    var url = "http://localhost:3000/";
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            redirectPage()
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
}

function redirectPage() {
    let baseUrl = window.location.origin
    console.log(baseUrl)
    window.location.replace(baseUrl + '/users'); // because it is impossible to redirect page with ajax req i used this 2 lines
    //of code to redirect with client side
}

function deleteOne(element) {
    removeOneUser(element.value)
}

// Function for dimanically display content on user page after selecting user to: all, active or inactive

function usersOnChange(value) {
    var url = "http://localhost:3000/users/change";
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url + "?status=" + value, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        var h1 = document.getElementById('allusers');
        var ul = document.getElementById('userList');
        if (xhr.readyState == 4 && xhr.status == "200") {
            ul.innerHTML = '';
            h1.innerText = "List of all users:"
            for (let user of users) {
                let active = '';
                let profile_picture = '/public/images/profile/np_profile_img.jpg';
                if (user.status) {
                    active = 'checked';
                }

                ul.innerHTML +=
                    '<li>' +
                    '<div class="row">' +
                    '<div class="col-md-1 col-sm">' +
                    '<img src="' + profile_picture + '" width="50px" height="50px" class="img-fluid"' + '>' +
                    '</div>' +
                    '<div class="col-md-2 col-sm text-md">' + user.username + '</div>' +
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
            console.error(users);
        }
    }
    xhr.send();
}

function getStatusValue(selectValue) {
    var value = selectValue.value;
    console.log(value)
    usersOnChange(value)
}