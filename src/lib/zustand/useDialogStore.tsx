// Code inspired by https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe
// If you prefer to use Context API, refer to that link

import produce from 'immer';
import create from 'zustand';

import { AlertOptions } from '@/components/Alert';

type DialogStoreType = {
  awaitingPromise: {
    resolve?: () => void;
    reject?: () => void;
  };
  open: boolean;
  state: AlertOptions;
  dialog: (options: Partial<AlertOptions>) => Promise<void>;
  handleClose: () => void;
  handleSubmit: () => void;
};

const useDialogStore = create<DialogStoreType>((set) => ({
  awaitingPromise: {},
  open: false,
  state: {
    title: 'Title',
    description: 'Description',
    submitText: 'Yes',
    variant: 'warning',
    catchOnCancel: false,
  },
  dialog: (options) => {
    set(
      produce((state: DialogStoreType) => {
        state.open = true;
        state.state = { ...state.state, ...options };
      })
    );
    return new Promise<void>((resolve, reject) => {
      set(
        produce((state: DialogStoreType) => {
          state.awaitingPromise = { resolve, reject };
        })
      );
    });
  },
  handleClose: () => {
    set(
      produce((state: DialogStoreType) => {
        // Allowing us to catch the promise
        // Set catchOnCancel to false if you are not catching promise
        // to avoid uncatched promise error.
        state.state.catchOnCancel && state.awaitingPromise?.reject?.();
        state.open = false;
      })
    );
  },
  handleSubmit: () => {
    set(
      produce((state: DialogStoreType) => {
        state.awaitingPromise?.resolve?.();
        state.open = false;
      })
    );
  },
}));

export default useDialogStore;
