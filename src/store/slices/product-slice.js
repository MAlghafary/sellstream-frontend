const { createSlice } = require("@reduxjs/toolkit");

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    pendingProducts: [],
    loading: false,
    error: null
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    removePendingProduct(state, action) {
      state.pendingProducts = state.pendingProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    setPendingProducts(state, action) {
      state.pendingProducts = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  },
});

export const {
  setProducts,
  setPendingProducts,
  removePendingProduct,
  setLoading,
  setError
} = productSlice.actions;

export default productSlice.reducer;
