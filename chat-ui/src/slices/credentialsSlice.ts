import { createSlice } from "@reduxjs/toolkit";

interface ICredentials {
  email: string;
  username: string;
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

export default credentialsSlice.reducer;
