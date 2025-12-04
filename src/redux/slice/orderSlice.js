import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'order',
    initialState: {
        deliveryInfo: [{}],
        count: 0,
        total: 0,
    },
    reducers: {
        addToCart(state, action) {
            const check = state.list.findIndex((book) => book.proID === action.payload.proID);
            if (check !== -1) {
                state.list[check].quantity += action.payload.quantity;
            } else {
                state.list.push(action.payload);
            }
            state.count = state.list.reduce((sum, current) => sum + current?.quantity, 0);
            state.total = state.list.reduce((sum, current) => sum + current?.price * current?.quantity, 0);
        },
        updateQuantity(state, action) {
            const check = state.list.findIndex((product) => product.proID === action.payload.proID);
            if (check !== -1) {
                state.list[check].quantity = action.payload.quantity;
            }
            state.count = state.list.reduce((sum, current) => sum + current?.quantity, 0);
            state.total = state.list.reduce((sum, current) => sum + current?.price * current?.quantity, 0);
        },
        removeItem(state, action) {
            state.list = state.list.filter((product) => product.proID !== action.payload.proID);
            state.count = state.list.reduce((sum, current) => sum + current?.quantity, 0);
            state.total = state.list.reduce((sum, current) => sum + current?.price * current?.quantity, 0);
        },
    },
});

const { actions, reducer } = cartSlice;

export const { addToCart, updateQuantity, removeItem } = actions;

export default reducer;
