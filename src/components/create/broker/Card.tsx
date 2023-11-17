// @ts-nocheck
import { useEffect, useState } from "react";
import { secretKey,serverURL } from "../../../config";
import decryptData from "../../../security/decryption";
import PocketBase from 'pocketbase';
import { BsCheckSquareFill } from "react-icons/bs";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { toast } from "react-hot-toast";
import Edit from './Edit'
import { AiOutlineEdit } from "react-icons/ai";
import {RiDeleteBinLine} from 'react-icons/ri'
const pb = new PocketBase(serverURL);

function Card({data,set_print_data,print_data}) {
    const [factory,set_factory] = useState('')
    const [warehouse, set_warehouse] = useState('')
    const [price_max, set_price_max] = useState('')
    const [record_id, set_record_id] = useState()
    const [Status, set_status] = useState(false)
    const [current_bidder, set_current_bidder] = useState('')
   useEffect(() => {
    const factory_record = decryptData(`${secretKey}`,'factories')
    
    
    factory_record.map((content)=>{
        if(content.id === data.Factory){
            set_factory(content.Company_name)
        }
    })
    const warehouse_record = decryptData(`${secretKey}`,'warehouses')
    if(warehouse_record){

        warehouse_record.map((content)=>{
            if(content.id === data.Warehose){
                set_warehouse(content.Company_name)
            }
        })
    }
   }, [])
   
    
    useEffect(()=>{
        (async()=>{
            const record = await pb.collection('auction_info').getFirstListItem(`catalog="${data.id}"`, {
                expand: 'relField1,relField2.subRelField',
            });
            if(record){
                set_record_id(record.id)
                set_status(record.Status)
                set_price_max(record.price_max)
                const record2 = await pb.collection('users').
                getFirstListItem(`id="${record.bidder_current}"`);
                if(record2)
                {
                 
                  
                    set_current_bidder(record2.username)
                    
                }
            }
        })()
    },[data])
  
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
      const rowData = {
        Lot_number: data.Lot_number,
        Invoice: data.Invoice,
        Factory: factory,
        Grade: data.Grade,
        Net_weight: data.Net_weight,
        Package: data.Package,
        Total_kg: data.Total_kg,
        Grand_total: data.Grand_total,
        Offer_price: data.Offer_price,
        Collection: data.Collection,
        Gross_weight: data.Gross_weight,
        Season: data.Season,
        Warehouse: warehouse,
        Category: data.Category,
        PriceMax: price_max,
        Status: Status ? "Sold" : "Unsold",
    };
    // console.log(rowData);
    
    useEffect(()=>{
      if (factory && warehouse) {
        set_print_data((prevDataArray) => [...prevDataArray, rowData]);
      }
    },[factory])
    // set_print_data((prevDataArray) => [...prevDataArray, rowData]);
    return (
      <>
        <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Lot_number}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Invoice}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{factory}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{warehouse}</td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Grade}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Gross_weight}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Net_weight}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Package}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Total_kg}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Grand_total}</td>


        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Category}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Offer_price}</td>
       <td className="flex justify-center">
<td className="px-4 py-4 whitespace-nowrap flex items-center justify-center text-sm font-medium">
            <a onClick={handle_edit_mode} className="text-black hover:text-black/50" href="#">
                <AiOutlineEdit />
            </a>
        </td>
        <td className="px-4 py-4 whitespace-nowrap flex items-center justify-center text-sm font-medium">
            <a onClick={handle_delete} className="text-red-500 hover:text-red-500" href="#"><RiDeleteBinLine /></a>
        </td>
</td>    </tr>
<div className={`${edit_style}`}>
  {/* {data} */}
      <Edit click={handle_edit_mode} data={data} />

  </div>
</>

    )
}

export default Card;
