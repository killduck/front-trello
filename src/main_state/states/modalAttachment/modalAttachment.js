import { createSlice } from '@reduxjs/toolkit'

export const modalAttachmentState = createSlice(
  {
    name: 'modal_attachment_state',
    initialState: {
      attachmentWindow : false, 
      showPreloderAttachmentWindow: false, 
      showCardOptions: false, 
      addFiles: [], 
      cardFiles: [], 
      showPreloderFile: false, 
      showCardOptionsFileDel: false, 
      cardLinks: [], 
      startLink: '', 
      showPreloderLink: false, 
      showCardOptionsLinkUpdate: false, 
      showCardOptionsLinkDel: false, 
      newLink: '', 
      newLinkDesc : '', 
    },
    reducers: {
      setAttachmentWindow: (state, action) => { //
        state.attachmentWindow = action.payload; 
      },
      setShowPreloderAttachmentWindow: (state, action) => { 
        state.showPreloderAttachmentWindow = action.payload; 
      },
      setShowCardOptions: (state, action) => { 
        state.showCardOptions = action.payload; 
      },
      setAddFiles: (state, action) => { 
        state.addFiles = action.payload; 
      },
      setCardFiles: (state, action) => { 
        state.cardFiles = action.payload; 
      },
      setCardLinks: (state, action) => { 
        state.cardLinks = action.payload; 
      },
      setStartLink: (state, action) => { 
        state.startLink = action.payload; 
      },
      setShowPreloderFile: (state, action) => { 
        state.showPreloderFile = action.payload; 
      },
      setShowCardOptionsFileDel: (state, action) => { 
        state.showCardOptionsFileDel = action.payload; 
      },
      setShowPreloderLink: (state, action) => { 
        state.showPreloderLink = action.payload; 
      },
      setShowCardOptionsLinkUpdate: (state, action) => { 
        state.showCardOptionsLinkUpdate = action.payload; 
      },
      setShowCardOptionsLinkDel: (state, action) => { 
        state.showCardOptionsLinkDel = action.payload; 
      },
      setNewLink: (state, action) => { 
        state.newLink = action.payload; 
      },
      setNewLinkDesc: (state, action) => { 
        state.newLinkDesc = action.payload; 
      },
    },
  }
)

export const { 
  setAttachmentWindow,
  setShowPreloderAttachmentWindow,
  setShowCardOptions,
  setAddFiles,
  setCardFiles,
  setShowPreloderFile,
  setShowCardOptionsFileDel,
  setCardLinks,
  setStartLink,
  setShowPreloderLink,
  setShowCardOptionsLinkUpdate,
  setShowCardOptionsLinkDel,
  setNewLink,
  setNewLinkDesc,
} = modalAttachmentState.actions

export default modalAttachmentState.reducer