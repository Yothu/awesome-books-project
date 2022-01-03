function Book(name, author) {
  this.name = name;
  this.author = author;
}

function createHTMLBook(bName, bAuthor) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');

  const name = document.createElement('p');
  name.textContent = bName;
  bookDiv.appendChild(name);

  const author = document.createElement('p');
  author.textContent = bAuthor;
  bookDiv.appendChild(author);

  const remButt = document.createElement('button');
  remButt.textContent = 'Remove';
  remButt.classList.add('remButton');
  bookDiv.appendChild(remButt);

  const line = document.createElement('hr');
  line.setAttribute('size','2');
  line.setAttribute('width','100%');
  line.setAttribute('color', 'gray');
  bookDiv.appendChild(line);

  return bookDiv;
}

function setLocalStorage() {
  const localObj = localStorage.getItem('bookArray');
  const bookContainer = document.getElementById('bookContainer');
  for (let i = 0; i < JSON.parse(localObj).length; i++) {
    bookContainer.appendChild(createHTMLBook(JSON.parse(localObj)[i].name, JSON.parse(localObj)[i].author));
  }
}

function addBook(book) {
  bookArray.push(book);
  localStorage.setItem('bookArray', JSON.stringify(bookArray));

  const bookContainer = document.getElementById('bookContainer');
  bookContainer.appendChild(createHTMLBook(book.name, book.author));

  return bookArray;
}

function createBook() {
  const name = document.getElementById('addName').value;
  const author = document.getElementById('addAuthor').value;

  return new Book(name, author);
}

window.onload = function() {
  setLocalStorage();
}

let bookArray = JSON.parse(localStorage.getItem('bookArray'));


console.log("RemoveButtons:", document.querySelectorAll('.remButton'));

let remButtons = document.querySelectorAll('.remButton');

// remButtons.forEach((button) => {
//   button.addEventListener('click', button.parentElement.remove());
// });

