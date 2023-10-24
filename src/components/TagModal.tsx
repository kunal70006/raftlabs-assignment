import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { TagModalProps } from "../types";
import Button from "../common/Button";
import { useMutation } from "@apollo/client";
import { createTagMutation } from "../graphql/mutations";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";

const TagModal: React.FC<TagModalProps> = ({ closeModal, isOpen, postId }) => {
  const user = useUser();

  const [username, setUsername] = useState("");

  const [createTagMut] = useMutation(createTagMutation(), {
    onCompleted() {
      setUsername("");
    },
    onError(error) {
      toast.error(error.message);
      setUsername("");
    },
  });

  async function handleTag() {
    if (username.length > 0) {
      await createTagMut({
        variables: {
          tagObj: {
            post_id: postId,
            tagged_by: user?.id,
            tagged_user: username,
          },
        },
      });
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-neutral-900 p-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Enter a username (if user exists, they'll see your mention)
                </Dialog.Title>
                <div className="mt-4">
                  <input
                    type="text"
                    className="bg-neutral-600 rounded-lg focus:outline-none text-base pl-4 py-1 disabled:bg-neutral-800 placeholder:text-white w-full text-white"
                    placeholder="username"
                    value={username}
                    onKeyDown={(ev) => {
                      if (ev.key === " ") {
                        ev.preventDefault();
                      }
                    }}
                    onChange={(ev) => setUsername(ev.target.value)}
                    required
                  />
                </div>
                <Button onClick={handleTag} disabled={username.length === 0}>
                  Tag user
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default TagModal;
