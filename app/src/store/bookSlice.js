import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logInsert } from './reportSlice';

export const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('http://localhost:3005/books');
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getBook = createAsyncThunk('book/getBook', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`http://localhost:3005/books/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const deleteBook = createAsyncThunk('book/deleteBook', async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`http://localhost:3005/books/${book.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
        return book;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const insertBook = createAsyncThunk('book/insertBook', async (book, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
        book.userName = getState().auth.name;
        const res = await fetch('http://localhost:3005/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(book)
        });
        const data = await res.json();
        dispatch(logInsert({ message: `${book.title} has been added` }));
        return data;
    } catch (error) {
        dispatch(logInsert({ message: `${book.title} has not been added` }));
        return rejectWithValue(error.message);
    }
})

const bookSlice = createSlice({
    name: 'book',
    initialState: { books: [], isLoading: false, error: null, book: {} },
    extraReducers: {
        // getBooks
        [getBooks.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = action.payload;
        },
        [getBooks.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // insertBook
        [insertBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books.push(action.payload);
        },
        [insertBook.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // deleteBook
        [deleteBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = state.books.filter(book => book.id !== action.payload.id);
        },
        [deleteBook.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // getBook
        [getBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.book = action.payload;
        },
        [getBook.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});


export default bookSlice.reducer;
