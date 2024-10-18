import { configureStore } from '@reduxjs/toolkit'

import windowData from './states/windowData.js';
import subscribeState from './states/subscribeState.js';

import windowModalReloadState from './states/windowModalReload.js';

import cardDescriptionState from './states/description/cardDescriptionState.js';
import showReactQuillState from './states/description/showReactQuillState.js';

import windowNameState from './states/modalHeader/windowName.js';
import modalCardMemberState from './states/modalCardMember/modalCardMember.js';
import cardUsersState from './states/cardUsersState.js';
import modalCardLabelState from './states/modalCardLabel/modalCardLabel.js';
import modalDueDateState from './states/modalDueDate/modalDueDate.js';
import modalActivityState from './states/modalActivity/modalActivity.js';
import modalAttachmentState from './states/modalAttachment/modalAttachment.js';
import modalCardDelState from './states/modalCardDel.js';


export const store = configureStore({
  reducer: {
    cardUsersState: cardUsersState,
    windowData: windowData,
    subscribeState: subscribeState,
    windowModalReloadState: windowModalReloadState,
    cardDescriptionState: cardDescriptionState,
    showReactQuillState: showReactQuillState,

    windowNameState: windowNameState,
    modalCardMemberState: modalCardMemberState,
    modalCardLabelState: modalCardLabelState,
    modalDueDateState: modalDueDateState,
    modalActivityState: modalActivityState,
    modalAttachmentState: modalAttachmentState,
    modalCardDelState: modalCardDelState,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modal_attachment_state/setAddFiles'],
        // ignoredActionPaths: [''],
        ignoredPaths: ['modalAttachmentState.addFiles'],
      },
    }),
})
