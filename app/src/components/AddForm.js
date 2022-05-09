import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertBook } from '../store/bookSlice';

const AddForm = () => {

    const { isLoggedIn } = useSelector(state => state.auth);

    const [insertedBook, setInsertedBook] = useState(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const handleTitle = (title) =>
        setTitle(title.target.value);
    const handlePrice = (price) =>
        setPrice(price.target.value);
    const handleDescription = (description) =>
        setDescription(description.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const book = { title, description, price }
        dispatch(insertBook(book)).unwrap()
            .then((originalPromiseResult) => {
                setInsertedBook(originalPromiseResult.title);
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError);
            });

        setTitle('');
        setPrice('');
        setDescription('');
    }
    return (
        <div className='row' >
            <div className='col-6 offset-3 mt-3'>
                <h2>Insert Book</h2>
                <form>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' className='form-control' id='title' required
                            value={title}
                            onChange={handleTitle} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='price'>Price</label>
                        <input type='number' className='form-control' id='price' required
                            value={price}
                            onChange={handlePrice} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Description'>Description</label>
                        <textarea
                            className='form-control'
                            id='Description'
                            rows='3'
                            required
                            value={description}
                            onChange={handleDescription}
                        ></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary' disabled={!isLoggedIn} onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
            {
                insertedBook &&
                <div className="alert alert-success" role="alert">
                    {insertedBook} book has been inserted
                </div>
            }
        </div >
    );
};

export default AddForm;