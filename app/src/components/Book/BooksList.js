import React from 'react';


const BooksList = ({ isLoading, books, isLoggedIn, deleteBook, getBook, dispatch }) => {

    const [deletedBook, setDeletedBook] = React.useState(null);

    const bookList = books.length > 0 ? books?.map((book) => (

        <li className='list-group-item d-flex  justify-content-between align-items-center' key={book.id}>
            <div>{book.title}</div>
            <div className='btn-group' role='group'>
                <button type='button' className='btn btn-primary' onClick={() => dispatch(getBook(book.id))}>
                    Info
                </button>
                <button type='button' className='btn btn-danger'
                    disabled={!isLoggedIn}
                    onClick={() => dispatch(deleteBook(book)).unwrap()
                        .then((originalPromiseResult) => {
                            setDeletedBook(originalPromiseResult.title);
                        })
                        .catch((rejectedValueOrSerializedError) => {
                            console.log(rejectedValueOrSerializedError);
                        })}
                >
                    Delete
                </button>
            </div>
        </li>

    )) : 'There are no books available!';

    return (
        <div>
            {
                deletedBook && <div class="alert alert-success" role="alert">
                    {deletedBook} book has been deleted
                </div>
            }
            <h2>Books List</h2>
            {
                isLoading ? 'loading...' :
                    <ul className='list-group'>
                        {bookList}
                    </ul>
            }
        </div>
    );
};

export default BooksList;