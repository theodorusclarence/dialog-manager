import * as React from 'react';

import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';
import Layout from '@/components/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  const dialog = useDialog();
  const [status, setStatus] = React.useState<string>(
    'Click one of the dialog!'
  );

  function openDanger() {
    setStatus('Danger Dialog Opened');
    dialog({
      title: 'Danger!',
      description: (
        <>
          This is a <strong className='text-red-600'>danger dialog</strong>.
        </>
      ),
      catchOnCancel: true,
      submitText: 'OH YES',
      variant: 'danger',
    })
      .then(() => setStatus('Danger Dialog: Submitted'))
      .catch(() => setStatus('Danger Dialog: Rejected'));
  }

  function openWarning() {
    setStatus('Warning Dialog Opened');
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
  }

  function openSuccess() {
    setStatus("Success Dialog Opened (this one don't catch reject)");
    dialog({
      title: 'Success!',
      description: (
        <>
          This is a <strong className='text-green-600'>success dialog</strong>.
        </>
      ),
      // Can be omitted
      catchOnCancel: false,
      submitText: 'Cool',
      variant: 'success',
    }).then(() => setStatus('Success Dialog: Submitted'));
  }

  return (
    // Check /components/Layout.tsx for DialogStore initialization.
    // I usually put the Layout in _app.tsx
    <Layout>
      <Seo />

      <main>
        <section className='bg-gray-50'>
          <div className='flex flex-col items-center justify-center min-h-screen text-center layout'>
            <h1 className='text-2xl md:text-4xl'>Dialog Manager</h1>
            <p className='mt-2 text-sm text-gray-800'>
              A code example about Dialog Manager using TypeScript, Zustand with
              Immer, and Tailwind CSS
            </p>
            <CustomLink
              href='https://github.com/theodorusclarence/dialog-manager'
              className='mt-2 text-sm font-medium text-gray-700'
            >
              Check the repository
            </CustomLink>

            <div className='flex flex-col gap-2 mt-6 md:flex-row'>
              <Button onClick={openDanger}>Danger Dialog</Button>
              <Button onClick={openWarning}>Warning Dialog</Button>
              <Button onClick={openSuccess}>Success Dialog</Button>
            </div>

            <div className='mt-8'>
              <p className='font-semibold underline'>Status</p>
              <p className='mt-2 text-sm text-gray-800'>{status}</p>
            </div>

            <footer className='absolute text-gray-700 bottom-2'>
              © {new Date().getFullYear()} By{' '}
              <CustomLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                Theodorus Clarence
              </CustomLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
