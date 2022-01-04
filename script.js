function Book(name, author) {
  this.name = name;
  this.author = author;
}

class Books {
  constructor() {
    this.storage = [];
  }

  add(book) {
    this.storage.push(book);
  }

  remove(index) {
    this.storage.splice(index, 1);
  }

  set setBooks(books) {
    this.storage = books;
  }
}

function saveBooksInLocalStorage(books) {
  localStorage.setItem('bookArray', JSON.stringify(books));
}

function getBooksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('bookArray'));
}

const bookStor = new Books();

function removeBook(remButt) {
  const books = remButt.parentElement.parentElement.children;
  for (let i = 0; i < books.length; i += 1) {
    if (remButt.parentElement === books[i]) {
      bookStor.remove(i);
      saveBooksInLocalStorage(bookStor.storage);
      break;
    }
  }
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

  remButt.addEventListener('click', () => {
    removeBook(remButt);
    remButt.parentElement.remove();
  });

  const line = document.createElement('hr');
  line.setAttribute('size', '2');
  line.setAttribute('width', '100%');
  line.setAttribute('color', 'gray');
  bookDiv.appendChild(line);

  return bookDiv;
}

function setLocalStorage() {
  const localObj = localStorage.getItem('bookArray');
  const bookContainer = document.getElementById('bookContainer');
  for (let i = 0; i < JSON.parse(localObj).length; i += 1) {
    const { name } = JSON.parse(localObj)[i];
    const { author } = JSON.parse(localObj)[i];
    bookContainer.appendChild(createHTMLBook(name, author));
  }
}

function addBook(newBook) {
  bookStor.add(newBook);

  saveBooksInLocalStorage(bookStor.storage);

  const bookContainer = document.getElementById('bookContainer');
  bookContainer.appendChild(createHTMLBook(newBook.name, newBook.author));
}

const addBookbtn = document.getElementById('addBookbtn');
addBookbtn.onclick = function addABook() {
  const name = document.getElementById('addName').value;
  const author = document.getElementById('addAuthor').value;

  const newBook = new Book(name, author);

  addBook(newBook);
};

const localObj = localStorage.getItem('bookArray');
if (localObj != null) {
  setLocalStorage();
}

if (localStorage.getItem('bookArray') != null) {
  bookStor.setBooks = getBooksFromLocalStorage();
}
