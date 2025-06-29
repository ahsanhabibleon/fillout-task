import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useCallback } from 'react';

const Modal = ({visible = false, title='', children = <></>}) => {

  const handleCloseModal = useCallback(() => {
        console.log('t')
  }, []);
  return (
    <Dialog open={visible} as="div" className="relative z-10 focus:outline-none" onClose={handleCloseModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="modal-content "
            >
              <DialogTitle as="h3">
                {title}
              </DialogTitle>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  );
};

export default Modal;
