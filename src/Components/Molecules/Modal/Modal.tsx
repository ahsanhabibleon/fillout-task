import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

export default function Modal({
  title = '',
  visible = false,
  children = <></>,
  onCloseModal = () => {},
}: {
  title?: string;
  visible?: boolean;
  children?: ReactNode;
  onCloseModal?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [visible]);

  function closeModal() {
    setIsOpen(false);
    onCloseModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium px-6 py-4 leading-6 text-gray-900 border-b border-b-[1px] border-gray-300"
                  >
                    {title || 'Modal title'}
                  </DialogTitle>
                  <div className="px-6 pb-6">{children}</div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
