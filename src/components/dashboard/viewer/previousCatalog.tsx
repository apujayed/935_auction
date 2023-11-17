// @ts-nocheck
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import { serverURL } from '../../../config';
const pb = new PocketBase(serverURL);
pb.autoCancellation(false)

function PreviousCataloug({ current_catalog }) {
    const [lot_number, set_lot_number] = useState()
    const [invoice_number, set_invoice_number] = useState()
    const [factory, set_factory] = useState()
    const [status, set_status] = useState()
    const [current_catalog_id, set_current_catalog_id] = useState()
    useEffect(()=>{
        if(current_catalog !== undefined){
            (async()=>{
                try{
                    const record = await pb.collection('auction_info').getFirstListItem(`catalog="${current_catalog.id}"`, {
                        expand: 'relField1,relField2.subRelField',
                    });
                    if(record){
                        set_current_catalog_id(record.id)
                        set_status(record.Status)
                    }
                }
                catch(error){
                    console.log(error)
                }
            })()
        }
    },[current_catalog])
useEffect(()=>{

        // Subscribe to changes only in the specified record
        pb.collection('auction_info').subscribe('*', function (e) {

            if(e.record.catalog === current_catalog.id){
            set_status(e.record.Status)
        }
        });
        return () => {
            pb.collection("auction_info").unsubscribe("*")
          };
},[current_catalog])

    // useEffect(()=>{
    //     console.log(current_catalog_id)

    // },[current_catalog_id])
    useEffect(()=>{
        if(current_catalog !== undefined){
            set_lot_number(current_catalog.Lot_number)
            set_invoice_number(current_catalog.Invoice)
        }
    },[current_catalog])
    const status_color = status ? 'px-4 py-1 text-sm text-green-600 font-semibold rounded-full border border-green-200' :  'px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200';

    
    return (
        <>
        <div className=" bg-white p-1 rounded-md">
        <p className="mb-2 text-center  text-black/100 font-semibold">Previous lot</p>
        <hr />
 <div className="flex flex-row">
  <div className="w-3/5 text-black"> {/* 60% width */}
   
  <p><span className="text-black/50 my-px">Lot  :</span>{lot_number}</p>
            <p><span className="text-black/50 my-px">Invoice  :</span>{invoice_number}</p>
    
     </div>
  <div className="w-2/5 flex justify-center items-center"> {/* 40% width */}
  <span className={status_color}> {status ? 'Sold' : 'Unsold'}</span>
    </div>
</div>
</div>
   </>
    )
}

export default PreviousCataloug;
