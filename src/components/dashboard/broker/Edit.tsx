// @ts-nocheck
import Input from "../../input/input";

import Button from "../../button/button";

import ComboBoxComponent from "../../combobox/combobox";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PocketBase from 'pocketbase';
import { serverURL } from '../../../config';
const pb = new PocketBase(serverURL);
pb.autoCancellation(false)

import { LiaTimesSolid } from 'react-icons/lia'

import { RiPriceTag2Line } from "react-icons/ri";
import { MdTipsAndUpdates  } from "react-icons/md";
function Catalog({ selectedrow,click, data,set_sold }) {
 
  const [username, set_username] = useState([])
  const [usernameSELECTED, set_usernameSELECTED] = useState()
  const [price, set_price] = useState()
  const [lot, set_lot] = useState()
  const [factory, set_factory] = useState()
  const [username_records, set_username_records] = useState([])
  const [auction_info_record, set_auction_info_record] = useState()
  const [formState, setFormState] = useState({

  });
  const [loader, setloader] = useState(false);

  const handle_change = (event: any) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  useEffect(() => {
    (async () => {
      
      setloader(true)
    
    
      const users_records = await pb.collection('users').getFullList({
        sort: '-created',
        expand: 'reference'
      });
     
      set_username_records(users_records)

      let username_array = []
      users_records.map((content) => {
        if(content.expand.reference.Account_type === 'Bidder'){
          username_array.push(content.username)
        }
        // records.map((content2)=>{
        //   if(content.reference === content2.id && content2.Account_type === 'Bidder'){
        //     username_array.push(content.username)
        //   }
        // })
        // if (content.id === auction_info_record.bidder_current) {
        //   set_usernameSELECTED(content.username)
        // }
      })
      set_username(username_array);
      setloader(false)
      const auction_info_record = await pb.collection('auction_info').getFirstListItem(`catalog="${data}"`,{
        expand: 'catalog,catalog.Factory',
    });
      if (auction_info_record) {
     
        set_auction_info_record(auction_info_record)
        set_price(auction_info_record.price_max)
        set_sold(auction_info_record.Status)
        set_lot(auction_info_record.expand.catalog.Lot_number)
        set_factory(auction_info_record.expand.catalog.expand.Factory.Company_name)
        
      }

      users_records.map((content) => {
        if (content.id === auction_info_record.bidder_current) {
          set_usernameSELECTED(content.username)
        
        
        }
      
      })

  
    })()
  }, [])



  const updateProfile = async () => {
    
    try {
      // await pb.collection('catalog').update(`${data.id}`, data2);
      if(formState.maxbid || usernameSELECTED){
        if(auction_info_record){
          let current_bidder = '';
          username_records.map((content)=>{
            if(content.username === usernameSELECTED){
              current_bidder = content.id;
            }
          })
          let bidders_array = []
          bidders_array = auction_info_record.bidders;
          auction_info_record.bidders.map((content)=>{
            if(content !== current_bidder){
              bidders_array.push(current_bidder)
            }
          })
          let price_max = formState.maxbid ? formState.maxbid : auction_info_record.price_max
          const data_new_update = {
            "price_max": price_max,
            "bidders": bidders_array,
            "bidder_current": current_bidder,
            "Status": true
        };
        const record = await pb.collection('auction_info').update(`${auction_info_record.id}`, data_new_update);
        setTimeout(()=>{
          window.location.reload()
        },1000)
        }
        else{
          let current_bidder = '';
          username_records.map((content)=>{
            if(content.username === usernameSELECTED){
              current_bidder = content.id;
            }
          })
          const data_new = {
            "catalog": data,
            "price_max": formState.maxbid,
            "bidders": [
                `${current_bidder}`
            ],
            "bidder_current": current_bidder,
            "Status": true
        };         
        const record = await pb.collection('auction_info').create(data_new);
        setTimeout(()=>{
          window.location.reload()
        },1000)
        }
      }
    }
    catch (error) {
      throw new Error
    }
  }
  const handle_submit = (event: any) => {
    event.preventDefault();
    toast.promise(
      updateProfile(),
      {
        loading: 'Please wait...',
        success: <b>Catalog updated!</b>,
        error: <b>Something went wrong!</b>,
      }
    );
  }
  // console.log(selectedrow);
  
  return (
    <div className='p-4  bg-white z-50 w-screen h-screen overflow-y-scroll fixed inset-0'>
       {loader ? (
            <>
             <div className="flex flex-col items-center justify-center h-screen">
             <svg className="animate-spin w-10 h-10 stroke-slate-500" viewBox="0 0 256 256">
    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    </line>
    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    </line>
    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    </line>
    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    </line>
    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    </line>
    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    </line>
    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    </line>
    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
    </line>
  </svg>
      <p className="mt-4 text-lg text-gray-700">Fetching data...</p>
    </div>
          </>
          ) : (<>
      <form onSubmit={handle_submit} className="mx-auto max-w-md shadow sm:p-8 p-4 rounded-lg">
         <div onClick={click} className="cursor-pointer hover:bg-black/80 duration-300 text-2xl right-4 sm:right-10 bg-black text-white p-4 rounded-lg z-50 md:right-24 md:text-4xl fixed"><LiaTimesSolid /></div>
     
        <div className="h-2"></div> 
        <h1>Lot No : {selectedrow.Lot_number}</h1>     
        <h1>Grade  : {selectedrow.Grade}</h1>
        <h1>Invoice  : {selectedrow.Invoice}</h1>
        <h1>Factory  : <span className="text-bold">{selectedrow.expand.Factory.Company_name}</span></h1>
        <h1>Offer  : {selectedrow.Offer_price}</h1>

        <Input required_value={false} handle_input_change={handle_change} icon={RiPriceTag2Line} defaultValue={price} title="Max bid" type="number" placeholder="Max bid amount here..." />
        <div className="h-3"></div>
        <p className="mb-2">Buyer</p>
        <ComboBoxComponent selected={usernameSELECTED} data={username} change={set_usernameSELECTED} />
        <div className="h-3"></div>

        <div className="h-3"></div>
        <Button type="submit" name="Update Catalog" icon={MdTipsAndUpdates} />

      </form>
      </>)}

    </div>

  )
}

export default Catalog;
