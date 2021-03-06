import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, deleteBook, getBook } from '../../store/bookSlice';

import BookInfo from './BookInfo';
import BooksList from './BooksList';

import './book.css';

const PostContainer = () => {

    const { isLoading, books } = useSelector((state) => state.books);
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <>
            <hr className='my-5' />
            <div className='row'>
                <div className='col'>
                    <BooksList
                        isLoading={isLoading}
                        books={books}
                        isLoggedIn={isLoggedIn}
                        deleteBook={deleteBook}
                        getBook={getBook}
                        dispatch={dispatch}

                    />
                </div>
                <div className='col side-line'>
                    <BookInfo />
                </div>
            </div>
        </>
    );
};

export default PostContainer;