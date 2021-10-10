# Dialog Manager

![ts-nextjs-tailwind-starter](https://socialify.git.ci/theodorusclarence/dialog-manager/image?description=1&language=1&owner=1&pattern=Charlie%20Brown&stargazers=1&theme=Dark)

## Code to observe: 
- https://github.com/theodorusclarence/dialog-manager/blob/main/src/pages/index.tsx
- https://github.com/theodorusclarence/dialog-manager/blob/main/src/hooks/useDialog.tsx
- https://github.com/theodorusclarence/dialog-manager/blob/main/src/lib/zustand/useDialogStore.tsx
- https://github.com/theodorusclarence/dialog-manager/blob/main/src/components/Layout.tsx
- https://github.com/theodorusclarence/dialog-manager/blob/main/package.json

## Key Points

### Initialize the store and add the Alert

```tsx
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
```

### Call the dialog

```tsx
import useDialog from '@/hooks/useDialog';

const dialog = useDialog();

dialog({
  title: 'Warning!',
  description: (
    <>
      This is a <strong className='text-yellow-600'>warning dialog</strong>.
    </>
  ),
  catchOnCancel: true,
  submitText: 'Okay',
  variant: 'warning',
})
  .then(() => setStatus('Warning Dialog: Submitted'))
  .catch(() => setStatus('Warning Dialog: Rejected'));
```

If you don't have to catch reject, you can omit `catchOnCancel`

## Attribution

Code is inspired from https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe

Check it out if you prefer to use Context API
