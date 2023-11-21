// @ts-nocheck
import Input from "../../input/input";
import { SiWeightsandbiases } from 'react-icons/si'
import { LiaFileInvoiceDollarSolid, LiaTimesSolid, LiaWeightSolid } from 'react-icons/lia'
import { IoLayersOutline, IoPricetagsOutline } from 'react-icons/io5'

import Button from "../../button/button";
import ComboBoxComponent from "../../combobox/combobox";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PocketBase from 'pocketbase';
import { serverURL } from '../../../config';
const pb = new PocketBase(serverURL);
pb.autoCancellation(false)

import { VscPackage } from "react-icons/vsc";
import { FaBoxOpen } from "react-icons/fa";
import { RiPriceTag2Line } from "react-icons/ri";
import { MdTipsAndUpdates } from "react-icons/md";
function Catalog({ click, data }) {

  const [factory, setFactoryArray] = useState([])
  const [profileDATA, setprofilesDATA] = useState()
  const [ratingDATA, setRatingData] = useState()
  const [totalKG, setTotalKG] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [sample_collection, setSampleCollection] = useState(0)
  const [factorySELECTED, setFactorySELECTED] = useState()
  const [warehouse, setWarehouseArray] = useState([])
  const [warehouseSELECTED, setWarehouseSELECTED] = useState()
  const [grade, setGrade] = useState(['BOP', 'BOP (S)', 'BOP (S) (C)', 'BOP (C)', 'BOP(S)(C) Special', 'GBOP', 'GBOP (S)', 'GBOP (S) (C)', 'GBOP (C)', 'GBOP(C) BT-2', 'GBOP(C) Special', 'GOF', 'GOF (S)', 'GOF (S) (C)', 'GOF(C) BT-2', 'GOF (C)', 'GOF(C) Special', 'OF', 'OF (S)', 'OF (S) (C)', 'OF (C)', 'OF(C) Special', 'FOF', 'FOF (S) (C)', 'FOF (C)', 'PF', 'PF (S) (C)', 'PF (C)', 'PF(C) Special', 'RD', 'RD (S) (C)', 'RD (C)', 'CD', 'CD (S) (C)', 'CD (C)', 'CD(C) Special', 'DUST', 'DUST(S)(C)', 'DUST(C)', 'PD', 'PD(C)', 'PD(S)(C)', 'DM PF(C)'])
  const [gradeSELECTED, setGradeSELECTED] = useState(grade[0])
  const [season, setSeason] = useState()
  const [seasonSELECTED, setSeasonSELECTED] = useState()
  const [category, setCategory] = useState(['DUST', 'LEAF', 'SUPPLEMENT'])
  const [categorySELECTED, setCategorySELECTED] = useState(category[0])
  const [leaf, SetLeaf] = useState([])
  const [leafSELECTED, SetLeafSELECTED] = useState()
  const [liquor, setLiquor] = useState([])
  const [username, set_username] = useState([])
  const [usernameSELECTED, set_usernameSELECTED] = useState()
  const [price, set_price] = useState()
  const [username_records, set_username_records] = useState([])
  const [auction_info_record, set_auction_info_record] = useState()
  const [liquorSELECTED, setLiquorSELECTED] = useState()
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
   
      const recordsData = await pb.collection('rating').getFullList();
      setRatingData(recordsData)
      setloader(true)
      const LeafArray: any = [], LiquorArray: any = [];
      let selectedLEAF = null
      let selectedLIQUOR = null
      recordsData.map((content, index) => {
        if (content.Type === 'Leaf') {
          LeafArray.push(content.Name)
        }
        if (content.Type === 'Leaf' && content.id === data.Leaf_rating) {
          selectedLEAF = content.Name
        }
        if (content.Type === 'Liquor') {
          LiquorArray.push(content.Name)
        }
        if (content.Type === 'Liquor' && content.id === data.Liquor_rating) {
          selectedLIQUOR = content.Name
        }
      })
      
      SetLeaf(LeafArray)
      LeafArray.map((content, index) => {
        if (content === selectedLEAF) {
          SetLeafSELECTED(LeafArray[index])
        }
      })
      LiquorArray.map((content, index) => {
        if (content === selectedLIQUOR) {
          setLiquorSELECTED(LiquorArray[index])
        }
      })
      setLiquor(LiquorArray)
      const records = await pb.collection('profiles').getFullList({
        sort: '-created',
      })
      setprofilesDATA(records)
      const FactoryArray: any = [], WareHouseArray: any = [];
      let FactorySELECTED, WarehouseSELECTED;
      records.map((content, index) => {
        if (content.Account_type === 'Factory') {
          FactoryArray.push(content.Company_name)
        }
        if (content.Account_type === 'Factory' && content.id === data.Factory) {
          FactorySELECTED = content.Company_name
        }
        if (content.Account_type === 'Warehouse') {
          WareHouseArray.push(content.Company_name)
        }
        
        if (content.Account_type === 'Warehouse' && content.id === data.Warehose) {
          WarehouseSELECTED = content.Company_name
        }
        
      })
      setloader(false)
      setFactoryArray(FactoryArray)

      setWarehouseArray(WareHouseArray)


      FactoryArray.map((content, index) => {
        if (content === FactorySELECTED) {
          setFactorySELECTED(FactoryArray[index])
        }
      })
      WareHouseArray.map((content, index) => {
        if (content === WarehouseSELECTED) {
          setWarehouseSELECTED(WareHouseArray[index])
        }
      })
      category.map((content, index) => {
        if (content === data.Category) {
          setCategorySELECTED(category[index])
        }
      })
      grade.map((content, index) => {
        if (content === data.Grade) {
          setGradeSELECTED(grade[index])
        }
      })
      setTotalKG(data.Package * data.Net_weight)

      const users_records = await pb.collection('users').getFullList({
        sort: '-created',
      });
      set_username_records(users_records)
      let username_array = []
      users_records.map((content) => {
        username_array.push(content.username)
        // if (content.id === auction_info_record.bidder_current) {
        //   set_usernameSELECTED(content.username)
        // }
      })
      set_username(username_array);

      const auction_info_record = await pb.collection('auction_info').getFirstListItem(`catalog="${data.id}"`);
      if (auction_info_record) {
        set_auction_info_record(auction_info_record)
        set_price(auction_info_record.price_max)
      }

      users_records.map((content) => {
        if (content.id === auction_info_record.bidder_current) {
          set_usernameSELECTED(content.username)
        }
      })
    

    })()
    setloader(false)
  }, [])
  useEffect(()=>{
    setGrandTotal(totalKG - sample_collection)
  },[totalKG])
  useEffect(()=>{
    setGrandTotal(totalKG - sample_collection)
  },[sample_collection])

  useEffect(() => {
    if (categorySELECTED === 'LEAF') {
      if (formState.package < 10) {
        setSampleCollection(0.75);
      } else {
        setSampleCollection(1.5);
      }
    } else if (categorySELECTED === 'DUST') {
      if (formState.package < 10) {
        setSampleCollection(0.4);
      } else {
        setSampleCollection(0.8);
      }
    } else if (categorySELECTED === 'SUPPLEMENT') {
      if (formState.package < 10) {
        setSampleCollection(0.25);
      } else {
        setSampleCollection(0.5);
      }
    }
  }, [categorySELECTED, formState.package ]);
  useEffect(() => {
    if (formState.package !== undefined && formState.netweight !== undefined) {
      setTotalKG(formState.package * formState.netweight)
    }
  }, [formState])
  useEffect(() => {
    setGrandTotal(totalKG - sample_collection)
  }, [totalKG])
  useEffect(() => {
    setGrandTotal(totalKG - sample_collection)
  }, [sample_collection])

  const updateProfile = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextYear = currentYear + 1;
    const year = `${currentYear} ${nextYear}`
    let warehouseID = null;
    let factoryID = null;
    let leafID = null;
    let liquorID = null;
    profileDATA.map((content) => {
      if (content.Account_type === 'Factory' && factorySELECTED === content.Company_name) {
        factoryID = content.id;
      }
      else if (content.Account_type === 'Warehouse' && warehouseSELECTED === content.Company_name) {
        warehouseID = content.id;
      }
    })
    ratingDATA.map((content) => {
      if (content.Name === leafSELECTED) {
        leafID = content.id
      }
      else if (content.Name === liquorSELECTED) {
        liquorID = content.id
      }
    })

    let sn = formState.salenumber ? formState.salenumber : data.Sale_number,
      ln = formState.lotnumber ? formState.lotnumber : data.Lot_number,
      invn = formState.invoicenumber ? formState.invoicenumber : data.Invoice,
      gw = formState.grossweight ? formState.grossweight : data.Gross_weight,
      nw = formState.netweight ? formState.netweight : data.Net_weight,
      pkg = formState.package ? formState.package : data.Package,
      ofp = formState.offerprice ? formState.offerprice : data.Offer_price,
      rmk = formState.remarks ? formState.remarks : data.Remarks
    const data2 = {
      "Sale_number": sn,
      "Lot_number": ln,
      "Invoice": invn,
      "Offer_price": ofp,
      "Category": categorySELECTED,
      "Grade": gradeSELECTED,
      "brokersID": pb.authStore.model.id,
      "Factory": factoryID,
      "Liquor_rating": liquorID,
      "Warehose": warehouseID,
      "Leaf_rating": leafID,
      "Gross_weight": gw,
      "Net_weight": nw,
      "Collection": sample_collection,
      "Package": pkg,
      "Remarks":rmk,
      "Total_kg": nw * pkg,
      "Grand_total": (nw * pkg) - sample_collection
    };
    try {
      await pb.collection('catalog').update(`${data.id}`, data2);
      // console.log(await pb.collection('catalog').update(`${data.id}`, data2));
      
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
            "catalog": data.id,
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
        {/* <Input handle_input_change={handle_change} icon={GoNumber} title="Sale number" defaultValue={data.Sale_number} type="number" placeholder="Sale number here..." />
        <div className="h-2"></div> */}
         <p className="mb-2">Factory </p>
        <ComboBoxComponent selected={factorySELECTED} data={factory} change={setFactorySELECTED} />
        <div className="h-3"></div>
        <p className="mb-2">Warehouse</p>
        <ComboBoxComponent selected={warehouseSELECTED} data={warehouse} change={setWarehouseSELECTED} />
        <div className="h-3"></div>
        <p className="mb-2">Grade</p>
        <ComboBoxComponent selected={gradeSELECTED} data={grade} change={setGradeSELECTED} />
        <div className="h-3"></div>
        <p className="mb-2">Category</p>
        <ComboBoxComponent selected={categorySELECTED} data={category} change={setCategorySELECTED} />
        <div className="h-3"></div>
        <Input handle_input_change={handle_change} icon={IoLayersOutline} title="Lot number" type="number" defaultValue={data.Lot_number} placeholder="Lot number here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={LiaFileInvoiceDollarSolid} defaultValue={data.Invoice} title="Invoice number" type="text" placeholder="Invoice number here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={SiWeightsandbiases} title="Gross weight" defaultValue={data.Gross_weight} type="number" placeholder="Gross weight here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={LiaWeightSolid} title="Net weight" type="number" defaultValue={data.Net_weight} placeholder="Net weight here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={VscPackage} title="Package" type="number" defaultValue={data.Package} placeholder="Package here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={IoPricetagsOutline} defaultValue={data.Offer_price} title="Offer price" type="number" placeholder="Offer price here..." />
        <div className="h-3"></div>

        <Input handle_input_change={handle_change} icon={IoPricetagsOutline} defaultValue={data.Remarks?data.Remarks:'N/A'} title="Remarks" type="text" placeholder="Remarks here..." />
        <div className="h-3"></div>
        {/* <p className="mb-2">Leaf Rating</p>
        <ComboBoxComponent selected={leafSELECTED} data={leaf} change={SetLeafSELECTED} />
        <div className="h-3"></div>
        <p className="mb-2">Liquor Rating</p>
        <ComboBoxComponent selected={liquorSELECTED} data={liquor} change={setLiquorSELECTED} />
        <div className="h-3"></div> */}
       
        {/* <div className="h-2"></div>
        <Input required_value={false} handle_input_change={handle_change} icon={RiPriceTag2Line} defaultValue={price} title="Max bid" type="number" placeholder="Max bid amount here..." />
        <div className="h-3"></div>
        <p className="mb-2">Buyer</p>
        <ComboBoxComponent selected={usernameSELECTED} data={username} change={set_usernameSELECTED} />
        <div className="h-3"></div> */}

        <div className="h-3"></div>
        <Button type="submit" name="Update Catalog" icon={MdTipsAndUpdates} />

      </form>
      </>)}
    </div>

  )
}

export default Catalog;
