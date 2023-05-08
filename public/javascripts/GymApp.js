
let homeThemeSwitcher = document.getElementById('switch');
if (homeThemeSwitcher != null) {
    homeThemeSwitcher.addEventListener('change', function onChange(event) {
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
    let xhr = new XMLHttpRequest();
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

let showOtherUsersButton = document.getElementById('show');
if (showOtherUsersButton != null) {
    showOtherUsersButton.addEventListener('click', function () {
        let list = document.getElementById('list');
        list.innerHTML = '';
        let userId = document.getElementById('userId').value;
        loadJson('http://localhost:3000/users/json?=' + userId, function (users) {
            for (let user of users) {
                if (user._id == userId) {
                    continue;
                }
                let li = document.createElement('li');
                li.append(user.username);
                list.appendChild(li);
            }
        });
    });
}


function deleteUserOnUsersPage(element) {
    let activeButtonNumber = document.querySelector('button[class="page-link active"]');
    let id = element.value;
    axios.delete('http://localhost:3000/users/' + id)
        .then(res => {
            createUsersListWithPaginationHtml(activeButtonNumber)
        })
        .catch(err => console.log(err));
};


function removeSelectedUser(element) {
    let id = element.value;
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", 'http://localhost:3000/users/' + id, true);
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == '200') {
            redirectPage();
        }
        else {
            console.error(error);
        }
    }
    xhr.send(null);
}

function redirectPage(queryString = "") {
    let baseUrl = window.location.origin;
    window.location.replace(baseUrl + '/users' + queryString);
}


function displayingUsersBasedOnStatusValue(element) {
    let status = element.value;
    let h1 = document.getElementById('allusers');
    let alertContent = document.getElementById('searchAlert');

    axios.get('http://localhost:3000/pagination', { params: { status: status } })
        .then(res => {
            let role = res.data.role;
            let users = res.data.users.results;
            alertContent.innerHTML = '';
            h1.innerText = "List of all users:"
            createUsersPageContentWithPagination(users, role, res)
        })
        .catch(err => console.log(err));
}


function getHtmlForListOfUsers(users, role) {
    var content = '';
    for (let user of users) {
        document.getElementById('search_input').value = '';
        let rolePrivilege = 'hidden';
        let active = '';
        let profile_picture_path = '/public/images/profile/';
        if (user.status) {
            active = 'checked';
        }
        if (role === 'admin') {
            rolePrivilege = '';
        }
        content +=
            '<li>' +
            '<div class="row align-items-center align-middle">' +
            '<div class="col-md-1 col-sm">' +
            '<img src="' + profile_picture_path + user.profile_image + '" style="height: 50px; width:50px"" class="img-fluid"' + '>' +
            '</div>' +
            '<div class="col-md-2 col-sm text-md">' + user.username +
            '</div>' +
            '<div class="col-md-1 col-sm-12">' +
            '<div class="form-check">' +
            '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled="" ' + active + '>' +
            '<label class="form-check-label" for="flexCheckDefault">Active</label>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-2 col-sm-12" style="width:100px;">' +
            '<a role="button" class="btn btn-outline-dark" href="/users/' + user._id +
            '" style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .70rem;">' +
            'Show More' +
            '</a>' +
            '</div>' +
            '<div class="col-md-2 col-sm-12">' +
            '<button type="button" class="btn btn-sm btn-danger" onclick="deleteUserOnUsersPage(this)" value="' + user._id + '"' +
            'name="deleteBtn"' + rolePrivilege + '>' + 'Delete user</button>' +
            '</div>' +
            '</div>' +
            '</li>';
    }
    return content;
}


function postAndDisplayGymItems() {
    const form = document.getElementById('gymItemForm');
    form.addEventListener('click', function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        axios.post("http://localhost:3000/gymequipment", formData)
            .then(res => {
                getGymItems();
                document.getElementById('item_name').value = '';
                document.getElementById('description').value = '';
                document.getElementById('usage').value = '';
                document.getElementById('item_image').value = '';
            })
            .catch(err => console.log(err))
    })
};

function getGymItems() {
    let url = "http://localhost:3000/gymitem";
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        let items = JSON.parse(xhr.responseText);
        let carouselContent = document.getElementById('carouselContent');
        if (xhr.readyState == 4 && xhr.status == '200') {
            carouselContent.innerHTML = createListOfGymItems(items);
        } else {
            console.error(items);
        }
    }
    xhr.send();
}

function createListOfGymItems(items) {
    let content = '';
    for (let [i, item] of items.entries()) {
        let active = '';

        if (i == 0) {
            active = 'active';
        }
        content +=
            `
            <div class="carousel-item ${active}" style="max-height: 1000px;">
                <img src="/public/images/caruselBackgroundWhite.jpg" class=" w-100 mx-auto" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <img style="width: 200px; height: 200px;"src="/public/images/equipment/${item.item_image}" alt="">
                    <h3>${item.item_name}</h3>
                    <p>${item.description}</p>
                    <p>${item.usage}</p>
                </div>
            </div>
            `
    };
    return content;
}


if (document.getElementById("date") != null) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    let today = year + "-" + month + "-" + day;
    document.getElementById("date").value = today;
};



function getSearchResultsForUsers() {
    let alertContent = document.getElementById('searchAlert');
    let searchedName = document.getElementById('search_input').value;
    let userListElement = document.getElementById('userList');
    userListElement.innerHTML = '';
    let displayNumbers = document.getElementById('pagination');
    displayNumbers.innerHTML = '';
    alertContent.innerHTML = '';
    axios.get('http://localhost:3000/pagination', { params: { username: searchedName } })
        .then(res => {
            let role = res.data.role;
            let users = res.data.users.results;
            if (users.length > 0 && searchedName != '') {
                createUsersPageContentWithPagination(users, role, res)
            } else {
                alertContent.innerHTML = addingAllertsAfterUserSearchsearchAllert(searchedName, users)
            }
            document.getElementById('search_input').value = searchedName;
        })
        .catch(err => console.log(err))
}

function addingAllertsAfterUserSearchsearchAllert(searchedName, users) {
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
    content +=
        `
    <div class="alert alert-${alertClass}" role="alert" id="search_allert">
        ${alertText}
    </div>
    `
    return content;
}


let buttons = document.getElementsByClassName('page-link');
function addActiveClassForButtons(res) {
    for (let button of buttons) {
        let page = button.innerHTML;
        if (page == res.data.users.currentPage) {
            button.classList.add('active')
        }
    }
}

function createUsersListWithPaginationHtml(element) {
    let pageNumber = element.value;
    let searchedName = document.getElementById('search_input').value;
    let status = document.getElementById('status').value;
    let userListElement = document.getElementById('userList');

    axios.get('http://localhost:3000/pagination', { params: { page: pageNumber, status: status, username: searchedName } })
        .then(res => {
            let role = res.data.role;
            let users = res.data.users.results;;
            createUsersPageContentWithPagination(users, role, res)
            document.getElementById('search_input').value = searchedName;
            if (userListElement.innerHTML == '') {
                axios.get('http://localhost:3000/pagination', { params: { page: pageNumber - 1, status: status, username: searchedName } })
                    .then(res => {
                        let users = res.data.users.results;
                        let role = res.data.role;
                        createUsersPageContentWithPagination(users, role, res)
                        document.getElementById('search_input').value = searchedName;
                    })
            }
        })
        .catch(err => console.log(err))
}


function createUsersPageContentWithPagination(users, role, res) {
    let userListElement = document.getElementById('userList');
    userListElement.innerHTML = '';
    let displayNumbers = document.getElementById('pagination');
    displayNumbers.innerHTML = '';
    userListElement.innerHTML = getHtmlForListOfUsers(users, role);
    displayNumbers.innerHTML = createPaginationButtons(res);
    addActiveClassForButtons(res);
}

function createPaginationButtons(res) {
    var content = '';
    var previousDisable = '';
    var nextDisable = '';
    if (res.data.users.next == undefined || res.data.users.currentPage == res.data.users.totalPageNumber) {
        nextDisable = 'disabled'
    }
    if (res.data.users.previous == undefined) {
        previousDisable = 'disabled'
    }
    content +=
        `
        <li class="page-item ${previousDisable}">
            <button class="page-link" value=${res.data.users.currentPage - 1} onclick="createUsersListWithPaginationHtml(this)" ${previousDisable}>Previous</button>
        </li>
    `
    for (i = 1; i <= res.data.users.totalPageNumber; i++) {
        content +=
            `
            <li class="page-item">
                <button class="page-link" value=${i} onclick="createUsersListWithPaginationHtml(this)">${i}</button>
            </li>
        `
    }
    content +=
        `
        <li class="page-item ${nextDisable}">
            <button class="page-link" value=${res.data.users.currentPage + 1} onclick="createUsersListWithPaginationHtml(this)" ${nextDisable}>Next</button>
        </li>
    `
    return content;
}


