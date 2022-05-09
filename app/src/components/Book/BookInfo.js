import React from 'react';
import { useSelector } from 'react-redux';

const BookInfo = () => {

    const book = useSelector(state => state.books.book);

    return (
        <>
            <h2>Book Details</h2>

            {Object.values(book).length > 0 ? (
                <div>
                    <p className='fw-bold'>Title: {book.title}</p>
                    <p className='fw-bold'>Author: {book.userName}</p>
                    <p className='fw-light'>Description: {book.description}</p>
                    <p className='fst-italic'>Price: {book.price}</p>
                </div>
            ) : (
                <div className='alert alert-secondary' role='alert'>
                    There is no book selected yet. Please select!
                </div>
            )}

        </>
    );
};

export default BookInfo;