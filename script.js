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
  bookDiv.classList.add('book', 'd-flex', 'justify-content-between', 'p-2');
  const name = document.createElement('p');
  name.textContent = `${bName} by ${bAuthor}`;
  name.classList.add('align-self-center', 'my-1');
  bookDiv.appendChild(name);
  const remButt = document.createElement('button');
  remButt.textContent = 'Remove';
  remButt.classList.add('remButton', 'border', 'border-2', 'border-dark');
  bookDiv.appendChild(remButt);
  remButt.addEventListener('click', () => {
    removeBook(remButt);
    remButt.parentElement.remove();
  });
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
  if (name !== '' && author !== '') {
    const newBook = new Book(name, author);
    addBook(newBook);
    document.getElementById('addName').value = null;
    document.getElementById('addAuthor').value = null;
  }
};
const localObj = localStorage.getItem('bookArray');
if (localObj != null) {
  setLocalStorage();
}
if (localStorage.getItem('bookArray') != null) {
  bookStor.setBooks = getBooksFromLocalStorage();
}