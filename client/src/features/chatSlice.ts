import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/UserListProps";

interface ChatState {
     userList: User[];
     messages: { user: string; text: string }[];
}

const initialState: ChatState = {
     userList: [],
     messages: [],
};

const chatSlice = createSlice({
     name: "chat",
     initialState,
     reducers: {
          setUserList(state, action: PayloadAction<User[]>) {
               state.userList = action.payload;
          },
          addMessage(state, action: PayloadAction<{ user: string; text: string }>) {
               state.messages.push(action.payload);
          },
     },
});

export const { setUserList, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
