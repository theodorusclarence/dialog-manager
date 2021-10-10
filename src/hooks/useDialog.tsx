import useDialogStore from '@/lib/zustand/useDialogStore';

export default function useDialog() {
  return useDialogStore((state) => state.dialog);
}
