// @ts-nocheck
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {RiDeleteBinLine} from 'react-icons/ri'
import Input from "../../input/input";
import Edit from './Edit'
import { toast } from "react-hot-toast";
import PocketBase from 'pocketbase';
import { serverURL } from '../../../config';
const pb = new PocketBase(serverURL);
function Card({data}:any) {
  const [editMode, setEditMode] = useState(false);

    function truncateInvoiceNumber(invoiceNumber:any, maxLength:number) {
        if (invoiceNumber.length <= maxLength) {
          return invoiceNumber;
        } else {
          return invoiceNumber.substring(0, maxLength) + "...";
        }
      }
      const handle_edit_mode =()=>{
        setEditMode(!editMode)
      }
      const delete_function = async()=>{
        try{
          await pb.collection('catalog').delete(`${data.id}`);
          window.location.reload()
        }
        catch(error){
          console.log(error)
          throw new error
        }
      }
      const handle_delete =()=>{
        toast((t) => (
          <span>
            <span className="text-black font-semibold">Are you sure? </span>
            <button className="ml-2 px-6 py-2 text-white rounded-lg bg-red-500" onClick={() => {
              toast.dismiss(t.id)
              toast.promise(
                delete_function(),
                 {
                   loading: 'Please wait...',
                   success: <b>Deleted successfully!</b>,
                   error: <b>Something went wrong!</b>,
                 }
               );
            }}>
              Delete
            </button>
          </span>
        ));
      }
      const edit_style = editMode ? `` : `hidden`;
    return (
<>
<tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Sale_number}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Lot_number}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{truncateInvoiceNumber(data.Invoice, 10)}</td>
<td className="flex justify-center">
<td className="px-4 py-4 whitespace-nowrap flex items-center justify-center text-sm font-medium">
            <a onClick={handle_edit_mode} className="text-black hover:text-black/50" href="#">
                <AiOutlineEdit />
            </a>
        </td>
        <td className="px-4 py-4 whitespace-nowrap flex items-center justify-center text-sm font-medium">
            <a onClick={handle_delete} className="text-red-500 hover:text-red-500" href="#"><RiDeleteBinLine /></a>
        </td>
</td>
    </tr>
<div className={`${edit_style}`}>
      <Edit click={handle_edit_mode} data={data} />

  </div></>
    )
}
export default Card;
