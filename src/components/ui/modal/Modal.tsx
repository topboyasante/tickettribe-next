import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

type ModalProps = {
  ModalTitle: string;
  ModalContent: ReactNode;
  ModalIsOpen: boolean;
  CloseModal:()=>void
};

function Modal({ ModalIsOpen, ModalTitle, ModalContent, CloseModal }: ModalProps) {

  return (
    <Transition appear show={ModalIsOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={CloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-clash"
                >
                  {ModalTitle}
                </Dialog.Title>
                <section>{ModalContent}</section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;