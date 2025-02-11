// lib/features/darkMode/darkMode.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Tipe state untuk darkMode
interface DarkModeState {
  isDarkMode: boolean;
}

// State awal (default state)
const initialState: DarkModeState = {
  isDarkMode: false, // default light mode
};

// Slice untuk dark mode
const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode; // Toggle antara dark dan light mode
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload; // Set tema sesuai payload
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
