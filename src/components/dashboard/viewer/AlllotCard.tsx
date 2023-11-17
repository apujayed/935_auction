// @ts-nocheck
import { useEffect, useState } from "react";
import { secretKey,serverURL } from "../../../config";
import decryptData from "../../../security/decryption";
import PocketBase from 'pocketbase';
import { BsCheckSquareFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
const pb = new PocketBase(serverURL);
function LotCard({data}) {
    
    const [factory,set_factory] = useState('')
    const [warehouse, set_warehouse] = useState('')
    const [price_max, set_price_max] = useState('')
    const [Status,set_status] = useState(false)
    const [not, set_not] = useState(true)
    const [current_bidder, set_current_bidder] = useState('')
    useEffect(()=>{
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
        (async()=>{
            const record = await pb.collection('auction_info').getFirstListItem(`catalog="${data.id}"`, {
                expand: 'relField1,relField2.subRelField',
            });
            if(record){
                if(record.bidder_current === pb.authStore.model.id){
                    set_not(false)
                    // console.log(record.bidder_current,pb.authStore.model.id)
                    set_status(record.Status)
                    set_price_max(record.price_max)
                    const record2 = await pb.collection('users').
                    getFirstListItem(`id="${record.bidder_current}"`);
                    if(record2)
                    {
                        set_current_bidder(record2.username)
                    }
                }
                else{
                    set_not(true)
                }
            }
        })()
    },[])
    return (
        <>
            {!not ? <>
                <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Lot_number}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Invoice}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{factory}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Grade}</td>
    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Net_weight}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Package}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Total_kg}</td> */}
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Grand_total}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Offer_price}</td>
    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Collection}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Gross_weight}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Season}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{warehouse}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Category}</td> */}
    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{current_bidder}</td> */}
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{price_max}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{Status ? <div className="text-green-500 text-xl"><BsCheckSquareFill /></div> : <div className="text-red-500 text-xl"><MdOutlineCancel /></div>}</td>
</tr> </>:null}
        </>
    )
}

export default LotCard;
