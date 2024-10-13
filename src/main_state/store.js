import { configureStore } from '@reduxjs/toolkit'

// import counterReducer from '../features/counter/counterSlice.js';
import counterState from './states/counterSlice.js';
import windowData from './states/windowData.js';
import subscribeState from './states/subscribeState.js';

import windowModalReloadState from './states/windowModalReload.js';

import cardDescriptionState from './states/description/cardDescriptionState.js';
import showReactQuillState from './states/description/showReactQuillState.js';

import windowNameState from './states/modalHeader/windowName.js';

export const store = configureStore({
  reducer: {
    counter_test: counterState,
    windowData: windowData,
    subscribeState: subscribeState,
    windowModalReloadState: windowModalReloadState,
    cardDescriptionState: cardDescriptionState,
    showReactQuillState: showReactQuillState,

    windowNameState: windowNameState,

  },
})
