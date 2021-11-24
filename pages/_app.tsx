import '../styles/globals.css'
import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from '../src/store'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const store = useStore()
  const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp

// export type UserState = {
//   name: string
//   Id?: string
//   uid: string
//   displayName: string
// };

// const initialState: UserState = { 
//   name: "",
//   Id: "",
//   uid: "",
//   displayName: ""
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     increment(state) {
//       // state.value++;
//     },
//   },
// });

// export const store = configureStore({
//   reducer: {
//     counter: userSlice.reducer,
//   },
// });

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }
// export default MyApp;
