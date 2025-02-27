import { createSlice } from "@reduxjs/toolkit";

interface ICredentials {
  email: string;
  password: string;
}

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    baseCredentials: {} as ICredentials,
  },
  reducers: {},
});

export const {} = credentialsSlice.actions;

export const credentialsSliceReducer = credentialsSlice.reducer;
