"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function Book(name, author) {
  this.name = name;
  this.author = author;
}

var Books =
/*#__PURE__*/
function () {
  function Books() {
    _classCallCheck(this, Books);

    this.storage = [];
  }

  _createClass(Books, [{
    key: "add",
    value: function add(book) {
      this.storage.push(book);
    }
  }, {
    key: "remove",
    value: function remove(index) {
      this.storage.splice(index, 1);
    }
  }, {
    key: "setBooks",
    set: function set(books) {
      this.storage = books;
    }
  }]);

  return Books;
}();

function saveBooksInLocalStorage(books) {
  localStorage.setItem('bookArray', JSON.stringify(books));
}

function getBooksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('bookArray'));
}

var bookStor = new Books();

function removeBook(remButt) {
  var books = remButt.parentElement.parentElement.children;

  for (var i = 0; i < books.length; i += 1) {
    if (remButt.parentElement === books[i]) {
      bookStor.remove(i);
      saveBooksInLocalStorage(bookStor.storage);
      break;
    }
  }
}

function createHTMLBook(bName, bAuthor) {
  var bookDiv = document.createElement('div');
  bookDiv.classList.add('book', 'd-flex', 'bg-gray', 'justify-content-between', 'p-2');
  var name = document.createElement('p');
  name.textContent = "".concat(bName, " by ").concat(bAuthor);
  name.classList.add('align-self-center', 'my-1');
  bookDiv.appendChild(name);
  var remButt = document.createElement('button');
  remButt.textContent = 'Remove';
  remButt.classList.add('remButton', 'border', 'border-2', 'border-dark');
  bookDiv.appendChild(remButt);
  remButt.addEventListener('click', function () {
    removeBook(remButt);
    remButt.parentElement.remove();
  });
  return bookDiv;
}

function setLocalStorage() {
  var localObj = localStorage.getItem('bookArray');
  var bookContainer = document.getElementById('bookContainer');

  for (var i = 0; i < JSON.parse(localObj).length; i += 1) {
    var name = JSON.parse(localObj)[i].name;
    var author = JSON.parse(localObj)[i].author;
    bookContainer.appendChild(createHTMLBook(name, author));
  }
}

function addBook(newBook) {
  bookStor.add(newBook);
  saveBooksInLocalStorage(bookStor.storage);
  var bookContainer = document.getElementById('bookContainer');
  bookContainer.appendChild(createHTMLBook(newBook.name, newBook.author));
}

var addBookbtn = document.getElementById('addBookbtn');

addBookbtn.onclick = function addABook() {
  var name = document.getElementById('addName').value;
  var author = document.getElementById('addAuthor').value;

  if (name !== '' && author !== '') {
    var newBook = new Book(name, author);
    addBook(newBook);
    document.getElementById('addName').value = null;
    document.getElementById('addAuthor').value = null;
  }
};

var localObj = localStorage.getItem('bookArray');

if (localObj != null) {
  setLocalStorage();
}

if (localStorage.getItem('bookArray') != null) {
  bookStor.setBooks = getBooksFromLocalStorage();
}