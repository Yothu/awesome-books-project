"use strict";

function Book(name, author) {
  this.name = name;
  this.author = author;
}

function setLocalStorage() {
  var localObj = localStorage.getItem('bookArray');
  var bookContainer = document.getElementById('bookContainer');

  for (var i = 0; i < JSON.parse(localObj).length; i++) {
    var bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.innerHTML = "\n    <p>".concat(JSON.parse(localObj)[i].name, "</p>\n    <p>").concat(JSON.parse(localObj)[i].author, "</p>\n    <button>Remove</button>\n    <hr size=\"2\" width=\"100%\" color=\"gray\">\n    ");
    bookContainer.appendChild(bookDiv);
  }
}

function addBook(book) {
  bookArray.push(book);
  localStorage.setItem('bookArray', JSON.stringify(bookArray));
  var bookContainer = document.getElementById('bookContainer');
  var bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  bookDiv.innerHTML = "\n  <p>".concat(book.name, "</p>\n  <p>").concat(book.author, "</p>\n  <button>Remove</button>\n  <hr size=\"2\" width=\"100%\" color=\"gray\">\n  ");
  bookContainer.appendChild(bookDiv);
  return bookArray;
}

function createBook() {
  var name = document.getElementById('addName').value;
  var author = document.getElementById('addAuthor').value;
  return new Book(name, author);
}

window.onload = function () {
  var localObj = localStorage.getItem('bookArray');

  if (localObj != null) {
    setLocalStorage();
  }
};

var bookArray = [];

if (localStorage.getItem('bookArray') != null) {
  bookArray = JSON.parse(localStorage.getItem('bookArray'));
}