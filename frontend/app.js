// API Base URL - Change this to your backend URL
const API_URL = 'http://localhost:5000/api/books';

// DOM Elements
const bookForm = document.getElementById('book-form');
const booksContainer = document.getElementById('books-container');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error-message');
const emptyStateDiv = document.getElementById('empty-state');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const bookCount = document.getElementById('book-count');

// State
let isEditMode = false;
let currentBookId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    bookForm.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', resetForm);
});

// Fetch and display all books
async function loadBooks() {
    try {
        showLoading(true);
        hideError();
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        
        const books = await response.json();
        displayBooks(books);
        
    } catch (error) {
        console.error('Error loading books:', error);
        showError('Failed to load books. Please make sure the server is running.');
    } finally {
        showLoading(false);
    }
}

// Display books in the grid
function displayBooks(books) {
    booksContainer.innerHTML = '';
    bookCount.textContent = books.length;
    
    if (books.length === 0) {
        emptyStateDiv.style.display = 'block';
        return;
    }
    
    emptyStateDiv.style.display = 'none';
    
    books.forEach(book => {
        const bookCard = createBookCard(book);
        booksContainer.appendChild(bookCard);
    });
}

// Create a book card element
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    card.innerHTML = `
        <h3>${escapeHtml(book.title)}</h3>
        <div class="book-info">
            <p><strong>Author:</strong> ${escapeHtml(book.author)}</p>
            <p><strong>Genre:</strong> ${escapeHtml(book.genre)}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            ${book.description ? `<p><strong>Description:</strong> ${escapeHtml(book.description)}</p>` : ''}
        </div>
        <div class="book-actions">
            <button class="btn btn-edit" onclick="editBook('${book._id}')">Edit</button>
            <button class="btn btn-delete" onclick="deleteBook('${book._id}')">Delete</button>
        </div>
    `;
    
    return card;
}

// Handle form submission (Create or Update)
async function handleSubmit(e) {
    e.preventDefault();
    
    const bookData = {
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        genre: document.getElementById('genre').value.trim(),
        year: parseInt(document.getElementById('year').value),
        description: document.getElementById('description').value.trim()
    };
    
    // Frontend validation
    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.year) {
        showToast('Please fill in all required fields', true);
        return;
    }
    
    if (bookData.year < 1000 || bookData.year > 2026) {
        showToast('Please enter a valid year', true);
        return;
    }
    
    try {
        if (isEditMode) {
            await updateBook(currentBookId, bookData);
        } else {
            await createBook(bookData);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast('An error occurred. Please try again.', true);
    }
}

// Create a new book
async function createBook(bookData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create book');
        }
        
        showToast('Book added successfully!');
        resetForm();
        loadBooks();
        
    } catch (error) {
        console.error('Error creating book:', error);
        showToast(error.message, true);
    }
}

// Update an existing book
async function updateBook(id, bookData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update book');
        }
        
        showToast('Book updated successfully!');
        resetForm();
        loadBooks();
        
    } catch (error) {
        console.error('Error updating book:', error);
        showToast(error.message, true);
    }
}

// Edit a book (populate form)
async function editBook(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        
        const book = await response.json();
        
        // Populate form
        document.getElementById('book-id').value = book._id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('genre').value = book.genre;
        document.getElementById('year').value = book.year;
        document.getElementById('description').value = book.description || '';
        
        // Update UI for edit mode
        isEditMode = true;
        currentBookId = id;
        formTitle.textContent = 'Edit Book';
        submitBtn.textContent = 'Update Book';
        cancelBtn.style.display = 'inline-block';
        
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error loading book for edit:', error);
        showToast('Failed to load book details', true);
    }
}

// Delete a book
async function deleteBook(id) {
    if (!confirm('Are you sure you want to delete this book?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete book');
        }
        
        showToast('Book deleted successfully!');
        loadBooks();
        
    } catch (error) {
        console.error('Error deleting book:', error);
        showToast(error.message, true);
    }
}

// Reset form to initial state
function resetForm() {
    bookForm.reset();
    isEditMode = false;
    currentBookId = null;
    formTitle.textContent = 'Add New Book';
    submitBtn.textContent = 'Add Book';
    cancelBtn.style.display = 'none';
}

// Show/hide loading state
function showLoading(show) {
    loadingDiv.style.display = show ? 'block' : 'none';
    booksContainer.style.display = show ? 'none' : 'grid';
}

// Show/hide error message
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    errorDiv.style.display = 'none';
}

// Show toast notification
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${isError ? 'error' : ''} show`;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
