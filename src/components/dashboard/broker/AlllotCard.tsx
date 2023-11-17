// @ts-nocheck
import { useEffect, useState } from "react";
import { secretKey, serverURL } from "../../../config";
import decryptData from "../../../security/decryption";
import PocketBase from "pocketbase";
import { BsCheckSquareFill } from "react-icons/bs";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { toast } from "react-hot-toast";
const pb = new PocketBase(serverURL);
pb.autoCancellation(false);

function LotCard({ data }) {
  const [factory, set_factory] = useState("");
  const [warehouse, set_warehouse] = useState("");
  const [price_max, set_price_max] = useState("");
  const [record_id, set_record_id] = useState(data.a_id);
  const [Status, set_status] = useState(false);
  const [current_bidder, set_current_bidder] = useState("");
 
 
  const handle_sold = () => {

    
    if(!data.status){
   
        if (data.a_id) {
         
          
            const data = {
              Status: true,
            };
            (async () => {
              try {
  
                
                await pb.collection("auction_info").update(`${record_id}`, data);
                toast.success("Status updated");
                window.location.reload();
              } catch (error) {
                //
              }
            })();
          } else {
            const data2 = {
              catalog: data.id,
              Status: true,
            };
            (async () => {
              try {
                await pb.collection("auction_info").create(data2);
                toast.success("Status updated");
                window.location.reload();
              } catch (error) {}
            })();
          }
    } else{
       toast.error('This lot already sold..!!')
    }
  };
  const handle_un_sold = () => {
   if(!data.status){
    if (record_id) {
        const data = {
          Status: false,
        };
        (async () => {
          try {
            await pb.collection("auction_info").update(`${record_id}`, data);
            toast.success("Status updated");
            window.location.reload();
          } catch (error) {
            //
          }
        })();
      } else {
        const data2 = {
          catalog: data.id,
          Status: false,
        };
        (async () => {
          try {
            await pb.collection("auction_info").create(data2);
            toast.success("Status updated");
            window.location.reload();
          } catch (error) {}
        })();
      }
   } else{
    toast.error("This lot already sold!!")
   }
  };
  return (
    <tr >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.Lot_number}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        {data.Invoice}
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        {factory}
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        {data.Grade}
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        {data.Net_weight}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.Package}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.Total_kg}
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.Grand_total}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.Offer_price}
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.Collection}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.Gross_weight}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.Season}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {warehouse}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.Category}
      </td> */}
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {current_bidder}
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.pricemax}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {data.status ? (
          <div className="text-green-500 text-xl">
            <BsCheckSquareFill />
          </div>
        ) : (
          <div className="text-red-500 text-xl">
            <MdOutlineCancel />
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        <div className="flex items-center">
          <div onClick={handle_sold} className=" cursor-pointer text-xl mr-4">
            <BsCheckSquareFill />
          </div>{" "}
          <div onClick={handle_un_sold} className=" cursor-pointer text-2xl">
            <MdCancel />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default LotCard;
