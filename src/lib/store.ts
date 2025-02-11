import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkMode/darkMode";

export const makeStore = () => {
  return configureStore({
    reducer: {
      darkMode: darkModeReducer, // Menambahkan darkMode reducer ke dalam store
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
