// @ts-ignore
import { useEffect, useState } from "react";
import { Switch } from '@headlessui/react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import PocketBase from 'pocketbase';
import { serverURL } from "../../../config";
import toast from 'react-hot-toast';

const pb = new PocketBase(serverURL);
pb.autoCancellation(false)
function Card({ data, sale, season, e_record }) {
  // const [e_record,set_e_record] = useState()
  let [isOpen, setIsOpen] = useState(false)
  // const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false)
  const [changed, setChanged] = useState(false)
  // const loading_style = loading ? '' : 'hidden';
  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    if (e_record.Profile === data.id && e_record.Sale_Number === sale && e_record.Season === season &&e_record.Eligibility === true) {
      setEnabled(true)
    }
    else {
      setEnabled(false)
    }
  }, [data, season, sale, e_record])


  const handle_save_changes = () => {
    setIsOpen(false);
    (async () => {

      try {

        const data3 = {
          "Season": season,
          "Sale_Number": sale,
          "Profile": data.id,
          "Eligibility": enabled,
          "Completed": false
        }
        await pb.collection('Eligibility').update(`${e_record.id}`, data3);
        toast.success('Eligibility status changed successfully')
        window.location.reload()

      }
      catch (error) {
        toast.error('Something went wrong')
      }
    })()

  }
  function openModal() {
    setIsOpen(true)
  }

  let style = changed ? `` : `hidden`
  const handle_enabled = () => {
    setChanged(!changed)
    setEnabled(!enabled)
  }
  return (
    <tr onClick={() => { openModal() }} className="hover:bg-secondary/10 duration-300 cursor-pointer">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Company_name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Account_type}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Email_address.substring(0, 10) + '...'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
        <Switch
          checked={enabled}
          onChange={handle_enabled}
          className={`${enabled ? 'bg-black' : 'bg-black/20'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>        </td>
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
            <div className="fixed inset-0 " />
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

                  <div className="mb-2">
                    <p className="text-lg text-gray-500">
                      <b>Company Name:</b> {data.Company_name}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-lg text-gray-500">
                      <b>Managing Director:</b> {data.Managing_director}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-lg text-gray-500">
                      <b>Email Address:</b> {data.Email_address}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-lg text-gray-500">
                      <b>Account Type:</b> {data.Account_type}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-lg text-gray-500">
                      <b>BIN Nnumber:</b> {data.Bin_number}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-lg text-gray-500">
                      <b>TIN Number:</b> {data.Tin_number}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-lg text-gray-500">
                      <b>Licence Number:</b> {data.Licence_number}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-lg text-gray-500">
                      <b>Contact Number:</b> {data.Contact_number}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-primary hover:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 mr-1"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                    <button
                      type="button"

                      className={`inline-flex ml-1 justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-primary hover:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${style}`}
                      onClick={handle_save_changes}
                    >
                      Save Changes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


    </tr>
  )
}

export default Card;
