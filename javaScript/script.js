console.log("This  is project 2");
show_table();
function show_table() {
    let bookObj;
    let obj = localStorage.getItem("obj");
    if (obj == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(obj);
    }
    bookObj.forEach(function (element, index) {
        let table = document.getElementById("myTable");
        let html = `<tr>
    <td>${element.bookName}</td>
    <td>${element.authorName}</td>
    <td>${element.category}</td>
  </tr>`;
        table.innerHTML += html;
    });
}


class Books {
    constructor(bookName, authorName, category) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.category = category;
    }
}

class Display {

    add(book) {
        let table = document.getElementById("myTable");
        let html = `<tr>
        <td>${book.bookName}</td>
        <td>${book.authorName}</td>
        <td>${book.type}</td>
      </tr>`;
        table.innerHTML += html;
    }

    clear() {
        let myData = document.getElementById("myForm");
        myData.reset();
    }

    validate(book) {
        if (book.bookName.length > 2 && book.authorName.length > 2) {
            return true;
        } else {
            return false;
        }
    }

    alert_user(type, message) {
        let alert = document.getElementById("myAlert");
        let boldText;
        if (type == "success") {
            boldText = "Congratulations!";
        } else {
            boldText = "Ops Error!";
        }
        let alert_msg = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${boldText}:</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        alert.innerHTML = alert_msg;
        setTimeout(function () {
            alert.innerHTML = "";
        }, 3000);

    }

}

class local_Storage {

    add_local(book) {
        let bookObj;
        let obj = localStorage.getItem("obj");
        if (obj == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(obj);
        }
        bookObj.push(book);
        localStorage.setItem("obj", JSON.stringify(bookObj));
    }

}

let myData = document.getElementById("myForm");
myData.addEventListener("submit", function (e) {
    e.preventDefault();
    let type;
    let bookName = document.getElementById("bookName").value;
    let authorName = document.getElementById("authorName").value;
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    let others = document.getElementById("others");
    if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    } else {
        type = others.value;
    }
    let curr_books = new Books(bookName, authorName, type);
    let display_books = new Display();
    let storage = new local_Storage();
    if (display_books.validate(curr_books)) {
        display_books.add(curr_books);
        storage.add_local(curr_books);
        display_books.clear();
        display_books.alert_user("success", "Your Book has been added successfully");
    } else {
        display_books.alert_user("danger", "Sorry we can't add your book");
    }

})

