// @ts-nocheck
import { useEffect, useState } from "react";
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
  const [sold, set_sold] = useState(false)
  useEffect(()=>{
    if(data){
      (async()=>{
        const record = await pb.collection('auction_info').getFirstListItem(`catalog="${data.id}"`, {
          expand: 'relField1,relField2.subRelField',
      });
      if(record && record.Status === true){
        set_sold(true)
      }
      })()
    }
  },[])
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

      const edit_style = editMode ? `` : `hidden`;
    return (
<>
{!sold ? <>
<tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Sale_number}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Lot_number}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Lot_number}</td> */}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{truncateInvoiceNumber(data.Invoice, 10)}</td>
<td className="flex justify-center">
<td className="px-4 py-4 whitespace-nowrap flex items-center justify-center text-sm font-medium">
            <a onClick={handle_edit_mode} className="text-black hover:text-black/50" href="#">
                <AiOutlineEdit />
            </a>
        </td>
        {/* <td className="px-4 py-4 whitespace-nowrap flex items-center justify-center text-sm font-medium">
            <a className="text-red-500 hover:text-red-500" href="#"><RiDeleteBinLine /></a>
        </td> */}
</td>
    </tr>
<div className={`${edit_style}`}>
      <Edit set_sold={set_sold} click={handle_edit_mode} data={data} />

  </div></>:null}
</>
    )
}
export default Card;
