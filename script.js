function Book(name, author) {
  this.name = name;
  this.author = author;
}

window.onload = function() {
  setLocalStorage();
}

function setLocalStorage() {
  const localObj = localStorage.getItem('bookArray');
  const bookContainer = document.getElementById('bookContainer');
  for (let i = 0; i < JSON.parse(localObj).length; i++) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.innerHTML = `
    <p>${JSON.parse(localObj)[i].name}</p>
    <p>${JSON.parse(localObj)[i].author}</p>
    <button>Remove</button>
    <hr size="2" width="100%" color="gray">
    `;
    bookContainer.appendChild(bookDiv);
  }
}

function addBook(book) {
  bookArray.push(book);
  localStorage.setItem('bookArray', JSON.stringify(bookArray));

  const bookContainer = document.getElementById('bookContainer');

  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  bookDiv.innerHTML = `
  <p>${book.name}</p>
  <p>${book.author}</p>
  <button>Remove</button>
  <hr size="2" width="100%" color="gray">
  `;

  bookContainer.appendChild(bookDiv);

  return bookArray;
}

function createBook() {
  const name = document.getElementById('addName').value;
  const author = document.getElementById('addAuthor').value;

  return new Book(name, author);
}

function createHTMLBook(params) {
  
}

let bookArray = JSON.parse(localStorage.getItem('bookArray'));

console.log(bookArray);