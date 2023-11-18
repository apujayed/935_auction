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
    const [status, set_status] = useState(false)
    const [current_catalog_id, set_current_catalog_id] = useState()
    useEffect(()=>{
        if(current_catalog !== undefined){
            (async()=>{
                try{
                    const record = await pb.collection('auction_info').getFirstListItem(`catalog="${current_catalog.id}"`, {
                        expand: 'relField1,relField2.subRelField',
                    });
                    if(record){
                        console.log(record);
                        
                        set_current_catalog_id(record.id)
                        set_status(record.Status)
                    }
                }
                catch(error){
                    set_status(false)
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
            console.log(current_catalog);
            set_factory(current_catalog.expand.Factory.Company_name)
            set_lot_number(current_catalog.Lot_number)
            set_invoice_number(current_catalog.Invoice)
        }
    },[current_catalog])
    const status_color = status ? 'px-4 py-1 text-sm text-green-600 font-semibold bg-green-400 text-white rounded-full border border-green-200' :  'px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 bg-red-400 text-white';

    
    return (
        <>
        <div className=" bg-white p-1 rounded-md">
        <p className="mb-2 text-center  text-black/100 font-semibold">Previous lot</p>
        <hr />

</div>

<a href="#">
              <div class="flex items-center space-x-4 p-3.5 rounded-md bg-gray-100">
                <span class="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546z"></path>
                  </svg>
                </span>
                <div class="flex flex-col flex-1">
                  <h3 class="text-sm font-medium">{factory}</h3>
                  <div class="divide-x divide-gray-200 mt-auto">
                    <span class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
                     #Lot {lot_number}
                    </span>
                    <span class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
                      #{invoice_number}
                    </span>
                    
                  </div>
                </div>
              
                <div className="w-1/5 flex justify-center items-center"> {/* 40% width */}
  <span className={status_color}> {status ? 'Sold' : 'Unsold'}</span>
    </div>
              </div>
            </a>


   </>
    )
}

export default PreviousCataloug;
