import { useDispatch } from "react-redux";
import { setNewNameField } from "../main_state/states/modalHeader/windowName";
import { setMembersWindow, setShowUserCard } from "../main_state/states/modalCardMember/modalCardMember";
import { setMatchSearch, setSearchNewCardUser } from "../main_state/states/cardUsersState";
import { setShowLabelsWindow } from "../main_state/states/modalCardLabel/modalCardLabel";
import { setDueDateWindow } from "../main_state/states/modalDueDate/modalDueDate";
import { setShowReactQuillState } from "../main_state/states/description/showReactQuillState";
import { setActivityEditorShow } from "../main_state/states/modalActivity/modalActivity";
import { setAttachmentWindow, setShowCardOptions, setShowCardOptionsFileDel, setShowCardOptionsLinkDel, setShowCardOptionsLinkUpdate } from "../main_state/states/modalAttachment/modalAttachment";
import { setShowCardDel } from "../main_state/states/modalCardDel";

export const onRemoving_onFrames = (dispatch) => {
// export default function onRemoving_onFrames(){
  console.log('onRemoving_onFrames', dispatch);

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
