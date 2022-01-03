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

  remButt.addEventListener('click', function () {
    console.log("CHILDREN:", remButt.parentElement.parentElement.children);
    console.log("BEFORE:",bookArray);
    removeBook(remButt);
    remButt.parentElement.remove();

    console.log("AFTER:",bookArray);
  });

  const line = document.createElement('hr');
  line.setAttribute('size','2');
  line.setAttribute('width','100%');
  line.setAttribute('color', 'gray');
  bookDiv.appendChild(line);

  return bookDiv;
}

function removeBook(remButt) {
  const books = remButt.parentElement.parentElement.children;
  for (let i = 0; i < books.length; i++) {
    if (remButt.parentElement == books[i]) {
      bookArray.splice(i,1);
      localStorage.setItem('bookArray', JSON.stringify(bookArray));
      break;
    }
  }
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

const localObj = localStorage.getItem('bookArray');
if (localObj != null) {
  setLocalStorage();
}

let bookArray = [];
if (localStorage.getItem('bookArray') != null) {
  bookArray = JSON.parse(localStorage.getItem('bookArray'));
}
