import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AppState } from "../rootReducer";
import { fetchTokenPrice } from "@/lib/api";

export interface BalanceStateType {
  price: number;
  isUsdPriceLoading: boolean;
}

const INIT_STATE: BalanceStateType = {
  price: 0,
  isUsdPriceLoading: false,
};

export const fetchUsdPrice = createAsyncThunk<number, { tokenId: string; controller: AbortController }>(
  "BALANCE/FETCH_USD_PRICE",
  ({ tokenId, controller }) => {
    return new Promise<number>((resolve, reject) => {
      fetchTokenPrice(tokenId)
        .then((price) => {
          resolve(price);
        })
        .catch((error) => {
          reject(error);
        });
      controller.signal.addEventListener("abort", () => reject());
    });
  }
);

const balanceSlice = createSlice({
  name: "BALANCE_STATE",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsdPrice.pending, (state) => {
      state.isUsdPriceLoading = true;
    })
    .addCase(fetchUsdPrice.fulfilled, (state, action) => {
      state.price = action.payload;
      state.isUsdPriceLoading = false;
    })
    .addCase(fetchUsdPrice.rejected, (state) => {
      state.isUsdPriceLoading = false;
    })
  },
});

export const selectBalanceSlice = (state: AppState): BalanceStateType =>
  state.balance;

export default balanceSlice.reducer;
