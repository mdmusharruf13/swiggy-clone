import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurantSlice",
    initialState: {
        restaurantsData: []
    },
    reducers: {
        setAllRestaurants: (state, action) => {
            state.restaurantsData = action.payload;
        },

    }
});

export default restaurantSlice.reducer;
export const { setAllRestaurants, getMenus } = restaurantSlice.actions;