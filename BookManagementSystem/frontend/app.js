const apiUrl = 'http://localhost:8080/books';

document.getElementById('addBookForm').addEventListener('submit', addOrUpdateBook);

function fetchBooks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const booksTableBody = document.getElementById('booksTableBody');
            booksTableBody.innerHTML = '';
            data.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.publicationYear}</td>
                    <td>
                        <button onclick="deleteBook('${book.id}')">Delete</button>
                    </td>
                `;
                booksTableBody.appendChild(row);
            });
        });
}

function addOrUpdateBook(event) {
    event.preventDefault();
    const id = document.getElementById('bookId').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publicationYear = document.getElementById('publicationYear').value;

    const book = { title, author, publicationYear };

    if (id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(fetchBooks);
    } else {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(fetchBooks);
    }
}

function deleteBook(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    }).then(fetchBooks);
}

fetchBooks();
