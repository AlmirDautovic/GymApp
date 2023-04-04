
//code for changing to dark or white background on home page:

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
        var listTitle = document.getElementById('listTitle').innerHTML = "Other registered users:"
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
    var element = document.querySelector('button[class="page-link active"]');
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:3000/users/delete?id=' + id, true);
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == '200') {
            // createContent();
            pagination(element);
            // var page = element.value;
            // var queryString = '?page=' + page;
            // redirectPage(queryString)
        }
        else {
            console.log('ERROR!', error)
        }
    }
    xhr.send();
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
            ul.innerHTML = getHtmlForListOfUsers(users)
        } else {
            console.error(users);
        }
    }
    xhr.send();
}

function getUser(element) {
    deleteUser(element.value);
}

// delete single user on view user details page

function removeOneUser(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", 'http://localhost:3000/users/delete?id=' + id, true);
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == '200') {
            redirectAfterDelete();
        }
        else {
            console.error(error);
        }
    }
    xhr.send(null);
}

function redirectAfterDelete() {
    var url = "http://localhost:3000/";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            redirectPage();
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
}

function redirectPage(queryString = "") {
    let baseUrl = window.location.origin;
    // console.log(baseUrl)
    window.location.replace(baseUrl + '/login' + queryString); // because it is impossible to redirect page with ajax req i used this 2 lines
    //of code to redirect with client side
}

function deleteOne(element) {
    removeOneUser(element.value);
}

// Function for dimanically display content on user page after selecting user to: all, active or inactive

function usersOnChange(value) {
    // let pageNumber = document.getElementById()
    // console.log(value)

    // var url = "http://localhost:3000/test";
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', url + "?status=" + value + "&page=1", true);
    // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    // xhr.onload = function () {
    //     // console.log(xhr.response)

    //     console.log(data.next.page)
    //     var users = JSON.parse(xhr.responseText);
    //     // console.log(users);
    //     var displayNumbers = document.getElementById('pagination');
    //     displayNumbers.innerHTML = '';
    //     var h1 = document.getElementById('allusers');
    //     var ul = document.getElementById('userList');
    //     if (xhr.readyState == 4 && xhr.status == "200") {
    //         ul.innerHTML = '';
    //         h1.innerText = "List of all users:"
    //         ul.innerHTML = getHtmlForListOfUsers(users.results);
    //         // displayNumbers.innerHTML = createButtons(xhr.response);
    //         // addActiveClass(xhr.response);
    //     } else {
    //         console.error(users);
    //     }
    // }
    // xhr.send();

    // let status = value;
    // searchedName = document.getElementById('search_input').value;
    var h1 = document.getElementById('allusers');
    var alertContent = document.getElementById('searchAlert');

    var userListElement = document.getElementById('userList');
    var displayNumbers = document.getElementById('pagination');
    userListElement.innerHTML = '';
    displayNumbers.innerHTML = '';

    axios.get('http://localhost:3000/pagination', { params: { status: value } })
        .then(res => {
            // searchAllert.innerHTML = ''
            // searchAllert.className = ''
            alertContent.innerHTML = '';
            h1.innerText = "List of all users:"
            var users = res.data.results;
            userListElement.innerHTML = getHtmlForListOfUsers(users);
            displayNumbers.innerHTML = createButtons(res);
            addActiveClass(res);
            // document.getElementById('search_input').value = searchedName
            // console.log(document.getElementById('search_input').value)
        })
        .catch(err => console.log(err))
}


//Function for dinamically create content after deleting user on users page, or selecting users by their status on users page
function getHtmlForListOfUsers(users) {
    var content = '';
    for (let user of users) {
        document.getElementById('search_input').value = '';
        let active = '';
        let profile_picture_path = '/public/images/profile/';
        if (user.status) {
            active = 'checked';
        }
        content +=
            '<li>' +
            '<div class="row align-items-center align-middle">' +
            '<div class="col-md-1 col-sm">' +
            '<img src="' + profile_picture_path + user.profile_image + '" style="height: 50px; width:50px"" class="img-fluid"' + '>' +
            '</div>' +
            '<div class="col-md-2 col-sm text-md">' + user.username + '</div>' +
            '<div class="col-md-1 col-sm-12">' +
            '<div class="form-check">' +
            '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled="" ' + active + '>' +
            '<label class="form-check-label" for="flexCheckDefault">Active</label>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-2 col-sm-12" style="width:100px;">' +
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
    return content;
}

function getStatusValue(selectValue) {
    var value = selectValue.value;
    usersOnChange(value);
    console.log(value)
}

// gym equipment page

function postGymItem() {
    var url = "http://localhost:3000/gymequipment";
    var item = {};
    item.item_name = document.getElementById('item_name').value;
    // item.image_url = document.getElementById('image_url').value;
    var json = JSON.stringify(item);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var items = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            getGymItems();
        } else {
            console.error(items);
        }
    }
    xhr.send(json);
};

function getGymItems() {
    var url = "http://localhost:3000/gymitem";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        var items = JSON.parse(xhr.responseText);
        var itemList = document.getElementById('orderedList');
        if (xhr.readyState == 4 && xhr.status == '200') {
            itemList.innerHTML = createListOfItems(items);
        } else {
            console.error(items);
        }
    }
    xhr.send();
}

function createListOfItems(items) {
    var content = '';
    for (let item of items) {
        content +=
            '<li>' +
            '<div class="row align-items-center">' +
            '<div class="col-md-2 col-sm text-md">' + item.item_name + '</div>' +
            '</div>' +
            '</li>'
    };
    return content;
}

function displayItems() {
    postGymItem();
    document.getElementById('item_name').value = ''
}


// displaying current date in blog post form
if (document.getElementById("date") != null) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    document.getElementById("date").value = today;
};


// search user option:
var searchedName;
function getSearchResults() {
    var alertContent = document.getElementById('searchAlert');
    searchedName = document.getElementById('search_input').value;
    var userListElement = document.getElementById('userList');
    userListElement.innerHTML = '';
    var displayNumbers = document.getElementById('pagination');
    displayNumbers.innerHTML = '';
    // if (searchedName != '') {
    //     document.getElementById('search_allert').hidden = true;
    //     axios.get('http://localhost:3000/pagination', { params: { username: searchedName } })
    //         .then(res => {
    //             // console.log(res.data.totalPageNumber)
    //             // let totalPageNumber = res.data.totalPageNumber;
    //             // console.log(searchedName)
    //             let users = res.data.results;
    //             console.log(users.length)
    //             userListElement.innerHTML = getHtmlForListOfUsers(users);
    //             displayNumbers.innerHTML = createButtons(res);
    //             addActiveClass(res);
    //             document.getElementById('search_input').value = searchedName;
    //             console.log(document.getElementById('search_input').value);
    //         })
    //         .catch(err => console.log(err))
    // } else {
    //     document.getElementById('search_allert').removeAttribute('hidden');
    // }
    // document.getElementById('search_allert').hidden = true;
    axios.get('http://localhost:3000/pagination', { params: { username: searchedName } })
        .then(res => {
            // console.log(res.data.totalPageNumber)
            // let totalPageNumber = res.data.totalPageNumber;
            // console.log(searchedName)
            let users = res.data.results;
            console.log(users.length)
            if (users.length > 0 && searchedName != '') {
                userListElement.innerHTML = getHtmlForListOfUsers(users);
                displayNumbers.innerHTML = createButtons(res);
                addActiveClass(res);
            } else {
                alertContent.innerHTML = searchAllert(searchedName, users)
            }

            // alertContent.innerHTML = searchAllert(searchedName, users)
            document.getElementById('search_input').value = searchedName;
            // console.log(document.getElementById('search_input').value);
        })
        .catch(err => console.log(err))
}

function searchAllert(searchedName, users) {
    let content = '';
    let alertText = '';
    let alertClass = '';
    if (searchedName == '') {
        alertText = ' Invalid action! (Searched term must contain more than 2 characters) Please insert valid user name, ex. "John Smith"';
        alertClass = 'danger';
    }
    if (users.length < 1) {
        alertText = 'There are no matching results for Your searched term! Please check if you wrote it correctly'
        alertClass = 'info'
    }
    content += `
    <div class="alert alert-${alertClass}" role="alert" id="search_allert">
    ${alertText}
    </div>
    `
    return content;

}

// Pagination :

let buttons = document.getElementsByClassName('page-link');
function addActiveClass(res) {
    for (let button of buttons) {
        let page = button.innerHTML;
        if (page == res.data.currentPage) {
            button.classList.add('active')
        }
    }
}

function pagination(element) {
    let pageNumber = element.value;
    let searchedName = document.getElementById('search_input').value;
    let status = document.getElementById('status').value;
    console.log(status)
    var userListElement = document.getElementById('userList');
    var displayNumbers = document.getElementById('pagination');
    userListElement.innerHTML = '';
    displayNumbers.innerHTML = '';
    axios.get('http://localhost:3000/pagination', { params: { page: pageNumber, status: status, username: searchedName } })
        .then(res => {
            var users = res.data.results;
            userListElement.innerHTML = getHtmlForListOfUsers(users);
            displayNumbers.innerHTML = createButtons(res);
            addActiveClass(res);
            document.getElementById('search_input').value = searchedName;
            console.log(document.getElementById('search_input').value);
            if (userListElement.innerHTML == '') {
                axios.get('http://localhost:3000/pagination', { params: { page: pageNumber - 1, status: status, username: searchedName } })
                    .then(res => {
                        console.log(res.data)
                        var users = res.data.results;
                        console.log(users)
                        userListElement.innerHTML = getHtmlForListOfUsers(users);
                        displayNumbers.innerHTML = createButtons(res);
                        addActiveClass(res);
                        document.getElementById('search_input').value = searchedName;
                        console.log(document.getElementById('search_input').value);
                    })
            }
        })
        .catch(err => console.log(err))
}

function createButtons(res) {
    var content = '';
    var previousDisable = '';
    var nextDisable = '';
    if (res.data.next == undefined || res.data.currentPage == res.data.totalPageNumber) {
        nextDisable = 'disabled'
    }
    if (res.data.previous == undefined) {
        previousDisable = 'disabled'
    }
    content +=
        `
    <li class="page-item ${previousDisable}">
    <button class="page-link" value=${res.data.currentPage - 1} onclick="pagination(this)" ${previousDisable}>Previous</button>
    </li>
    `
    for (i = 1; i <= res.data.totalPageNumber; i++) {
        content +=
            `
        <li class="page-item">
        <button class="page-link" value=${i} onclick="pagination(this)">${i}</button>
        </li>
        `
    }
    content +=
        `
    <li class="page-item ${nextDisable}">
    <button class="page-link" value=${res.data.currentPage + 1} onclick="pagination(this)" ${nextDisable}>Next</button>
    </li>
    `
    return content;
}


