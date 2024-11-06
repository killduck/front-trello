import { setNewNameField } from './modalHeader/windowName';
import { 
  setMembersWindow, 
  setShowUserCard } from './modalCardMember/modalCardMember';
import { 
  setMatchSearch, 
  setSearchNewCardUser } from './cardUsersState';
import { setShowLabelsWindow } from './modalCardLabel/modalCardLabel';
import { setDueDateWindow } from './modalDueDate/modalDueDate';
import { setShowReactQuillState } from './description/showReactQuillState';
import { setActivityEditorShow } from './modalActivity/modalActivity';
import { 
  setAttachmentWindow, 
  setShowCardOptions, 
  setShowCardOptionsFileDel, 
  setShowCardOptionsLinkDel, 
  setShowCardOptionsLinkUpdate } from './modalAttachment/modalAttachment';
import { setShowCardDel } from './modalCardDel';

export const onRemoving_onFrames = () => (dispatch) => {
  dispatch(setNewNameField(false));
  dispatch(setMembersWindow(false));
  dispatch(setMatchSearch(''));
  dispatch(setSearchNewCardUser([]));
  dispatch(setShowLabelsWindow(false));
  dispatch(setDueDateWindow(false));
  dispatch(setShowReactQuillState(false));
  dispatch(setShowUserCard(null));
  dispatch(setActivityEditorShow(null));  
  dispatch(setAttachmentWindow(false));
  dispatch(setShowCardOptions(false));
  dispatch(setShowCardOptionsFileDel(false));
  dispatch(setShowCardOptionsLinkUpdate(false));
  dispatch(setShowCardOptionsLinkDel(false));
  dispatch(setShowCardDel(false));
}