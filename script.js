function Book(name, author) {
  this.name = name;
  this.author = author;
}

function addBook(book) {
  
}

function createBook() {
  const name = document.getElementById('addName').value;
  const author = document.getElementById('addAuthor').value;

  return new Book(name, author);
}

let bookArray = [];

addBook(createBook());