"use strict";

function Book(name, author) {
  this.name = name;
  this.author = author;
}

function addBook(book) {
  bookArray.push(book);
  console.log(bookArray);
}

function createBook() {
  var name = document.getElementById('addName').value;
  var author = document.getElementById('addAuthor').value;
  return new Book(name, author);
}

var bookArray = [];