import { configureStore } from '@reduxjs/toolkit'

// import counterReducer from '../features/counter/counterSlice.js';
import counterState from './states/counterSlice.js';
import windowData from './states/windowData.js';
import subscribeState from './states/subscribeState.js';
import cardDescriptionState from './states/cardDescriptionState.js';
import windowModalReloadState from './states/windowModalReload.js';
import showReactQuillState from './states/showReactQuillState.js';

export const store = configureStore({
  reducer: {
    counter_test: counterState,
    windowData: windowData,
    subscribeState: subscribeState,
    cardDescriptionState: cardDescriptionState,
    windowModalReloadState: windowModalReloadState,
    showReactQuillState: showReactQuillState,

  },
})
