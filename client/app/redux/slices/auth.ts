import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/axios";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: any) => {
    const { data } = await instance.post("/login", params);

    return data;
  }
);

export const fetchLogin = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await instance.get("/my-profile");

  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.data = null;

      window.localStorage.removeItem("token");
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    // @ts-ignore
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    // @ts-ignore
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    // @ts-ignore
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    // @ts-ignore
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    // @ts-ignore
    [fetchLogin.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const { logout } = authSlice.actions;

export const selectIsAuth = (state: any) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
