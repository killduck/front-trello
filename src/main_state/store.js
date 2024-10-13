import { configureStore } from '@reduxjs/toolkit'

// import counterReducer from '../features/counter/counterSlice.js';
import counterState from './states/counterSlice.js';
import windowData from './states/windowData.js';
import subscribeState from './states/subscribeState.js';

import windowModalReloadState from './states/windowModalReload.js';

import cardDescriptionState from './states/description/cardDescriptionState.js';
import showReactQuillState from './states/description/showReactQuillState.js';

import windowNameState from './states/modalHeader/windowName.js';
import modalCardMemberState from './states/modalCardMember/modalCardMember.js';
import cardUsersState from './states/cardUsersState.js';

export const store = configureStore({
  reducer: {
    counter_test: counterState,

    cardUsersState: cardUsersState,
    windowData: windowData,
    subscribeState: subscribeState,
    windowModalReloadState: windowModalReloadState,
    cardDescriptionState: cardDescriptionState,
    showReactQuillState: showReactQuillState,

    windowNameState: windowNameState,
    modalCardMemberState: modalCardMemberState,

  },
})
