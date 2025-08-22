const myLibrary = [new Book('East of Eden', 'John Steinbeck', 600), new Book('The Stranger', 'Albert Camus', 102)];

const dialog = document.querySelector('dialog');
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

function Book(title, author, pageCount) {
    if (!new.target) {
        throw Error('Use the new keyword you dummy.');
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = false;
    this.getDetails = function () {
        return `${this.title} by ${this.author} - ${this.pageCount} pages.`;
    }
}


function handleOnLoad() {
    renderLibrary(myLibrary);
}

function renderLibrary(library) {
    const containerDiv = document.getElementById('container');
    if (containerDiv.hasChildNodes()) {
        while (containerDiv.hasChildNodes()) {
            containerDiv.removeChild(containerDiv.firstChild);
        }
    }
    library.map((book) => {
        const newDiv = document.createElement('div');
        if (book.read) {
            newDiv.className = 'read-card';
        } else {
            newDiv.className = 'unread-card';
        }

        newDiv.dataset.id = book.id;
        const details = document.createTextNode(book.getDetails());
        newDiv.appendChild(details);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove book from library";
        removeButton.addEventListener("click", () => {
            removeBookFromLibrary(book);
        });
        const markAsReadButton = document.createElement('button');
        book.read ? markAsReadButton.textContent = "READ" : markAsReadButton.textContent = "NOT READ";
        markAsReadButton.addEventListener("click", () => {
            book.read = !book.read;
            if (book.read) {
                markAsReadButton.textContent = "READ"
                newDiv.className = 'read-card';
            } else {
                markAsReadButton.textContent = "NOT READ"
                newDiv.className = 'unread-card';
            }
        });
        newDiv.append(markAsReadButton);
        newDiv.append(removeButton);

        containerDiv.append(newDiv);
    });
}

function addToLibrary(event) {
    event.preventDefault();
    const newBook = new Book(event.target[0].value, event.target[1].value, event.target[2].value)
    myLibrary.push(newBook);
    handleOnLoad(myLibrary);
}

function removeBookFromLibrary(book) {
    const index = myLibrary.indexOf(book);
    if (index > -1) {
        myLibrary.splice(index, 1);
        const element = document.querySelector(`div[data-id="${book.id}"]`);
        element.remove();
    }
}

