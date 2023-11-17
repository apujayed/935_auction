// @ts-nocheck
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import { serverURL } from '../../../config';
const pb = new PocketBase(serverURL);
pb.autoCancellation(false)

function CurrentCataloug({ current_catalog,set_catalog_id,set_offer_price,set_input_default,set_price_max }) {
    const [lot_number, set_lot_number] = useState()
    const [invoice_number, set_invoice_number] = useState()
    const [factory, set_factory] = useState()
    const [grade, set_grade] = useState()
    const [pkgs, set_pkgs] = useState()
    const [Offer_price, set_Offer_price] = useState()
    const [current_bidder, set_current_bidder] = useState()
    const [current_bidder_name, set_current_bidder_name] = useState()
    const [highest, set_highest] = useState()
    const [auction_info, set_auction_info] = useState()

    useEffect(()=>{
        if(highest !== undefined){
            set_price_max(highest)
        }
        else{
            set_price_max(undefined) 
        }
    },[highest])
    useEffect(()=>{
        set_current_bidder(undefined) 
        set_highest(undefined)
    },[current_catalog])
    useEffect(() => {
        if (current_catalog !== undefined) {
            pb.collection('auction_info').subscribe('*', function (e) {
              
                
                if (e.record.catalog === current_catalog.id) {
                    
                    set_highest(e.record.price_max)
                    set_current_bidder(e.record.bidder_current)
                }
            });
            set_pkgs(current_catalog.Package)
            set_catalog_id(current_catalog.id)
            set_offer_price(current_catalog.Offer_price)
            set_lot_number(current_catalog.Lot_number)
            set_invoice_number(current_catalog.Invoice)
            set_grade(current_catalog.Grade);
            (async () => {
                try {
                    set_Offer_price(current_catalog.Offer_price)
                    const FactoryRecord = await pb.collection('profiles').getOne(current_catalog.Factory, {
                        expand: 'relField1,relField2.subRelField',
                    });
                    set_factory(FactoryRecord.Company_name)
                }
                catch (error) {
                    // 
                }
                // console.log()
                const record = await pb.collection('auction_info').getFirstListItem(`id="${current_catalog.id}"`, {
                    expand: 'relField1,relField2.subRelField',
                });
                if (record) {
                    
                    set_highest(record.price_max)
                    set_input_default(record.price_max)
                    const record2 = await pb.collection('users').
                        getFirstListItem(`id="${record.bidder_current}"`);
                    if (record2) {
                        set_current_bidder(record2.username)
                    }
                }
                else{
                    set_highest(undefined)
                }
            })()
        }
        return () => {
            pb.collection("auction_info").unsubscribe("*")
          };
    }, [current_catalog])
  
    useEffect(() => {
        (async () => {
            const record = await pb.collection('users').getFirstListItem(`id="${current_bidder}"`, {
                expand: 'relField1,relField2.subRelField',
            });
            if (record) {
                set_current_bidder_name(record.username)
            } else{
                set_highest(undefined)
            }
        })()

    }, [current_bidder])
    useEffect(()=>{
       
        if(current_catalog !== undefined){
            
        
            (async()=>{
                try{
                    const record = await pb.collection('auction_info').getFirstListItem(`catalog="${current_catalog.id}"`, {
                        expand: 'relField1,relField2.subRelField',
                    });
                    if(record){

                        set_highest(record.price_max)
                        set_current_bidder(record.bidder_current)
                    }
                }
                catch(error){
                    // console.log(error)
                }
            })()
        }
    },[current_catalog])
    const lotstatus = pb.authStore.model.username=== current_bidder_name ;
   const lotstatus_color = lotstatus?'bg-green-500 px-2 py-1 rounded-md ml-2  text-[11px] text-white':'bg-red-500 px-2 py-1 rounded-md ml-2  text-[11px] text-white';
   const difference =  highest-Offer_price;

   
    return (

        <>  
        <p className="text-center font-semibold p-2">Current Lot</p>
        <div className="grid grid-cols-2 gap-2">
        <div className="p-2 shadow-lg bg-white rounded-lg flex flex-col justify-between  ">
  <div className="flex flex-row items-center">
    <div className="w-full flex flex-col justify-center items-center">
      <p className="text-md text-black/50">Lot</p>
      <p className="text-md font-semibold">{lot_number}</p>
    </div>
    <div className="divider-vertical" style={{ borderLeft: '1px solid grey', height: '100%' }}></div>

    <div className="w-full flex flex-col justify-center items-center">
      <p className="text-md text-black/50">Invoice</p>
      <p className="text-md font-semibold">{invoice_number}</p>
    </div>
  </div>
</div>

        <div className="p-2 shadow-lg bg-white rounded-lg flex flex-col items-center">
          <p className="text-black/50 text-md">Factory</p>
          <p className="font-semibold text-sm text-center">{factory}</p>
        </div>
        <div className="p-2 shadow-lg bg-white rounded-lg flex flex-col items-center">
          <p className="text-black/50 text-md">Grade</p>
          <p className="font-semibold text-sm">{grade}</p>
        </div>
        <div className="p-2 shadow-lg bg-white rounded-lg flex flex-col items-center">
          <p className="text-black/50 text-md">Package</p>
          <p className="font-semibold text-sm">{pkgs} bag</p>
        </div>
        <div className="p-2 shadow-lg bg-white rounded-lg flex flex-col items-center">
          <p className="text-black/50  text-md">Offer</p>
          <p className="font-semibold text-sm">{Offer_price}</p>
        </div>
        <div className="p-2 shadow-lg bg-white rounded-lg flex flex-col items-center">
          <p className="text-black/50  text-md">Highest</p>
          <p className="font-semibold text-sm">{highest ? highest   : '--'} {highest ? (
    <span className={lotstatus_color}>
      {difference > 0 ? '+' : ''}
      {difference}
    </span>
  ) : '--'}</p>
        </div>
        {/* <div className="p-2 bg-white rounded-lg flex flex-col items-center">
          <p className="font-semibold text-md">Paragraph 1</p>
          <p className="text-sm">Paragraph 2</p>
        </div> */}
      </div>
          
        </>
    )
}

export default CurrentCataloug;
