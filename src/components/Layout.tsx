import * as React from 'react';

import useDialogStore from '@/lib/zustand/useDialogStore';

import Alert from '@/components/Alert';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { open, state, handleClose, handleSubmit } = useDialogStore();

  return (
    <>
      {children}
      <Alert
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
        options={state}
      />
    </>
  );
}
