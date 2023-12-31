// @ts-nocheck
import Input from "../../input/input";
import { GoNumber } from 'react-icons/go'
import { MdCollectionsBookmark } from 'react-icons/md'
import { SiWeightsandbiases } from 'react-icons/si'
import { LiaFileInvoiceDollarSolid, LiaWeightSolid } from 'react-icons/lia'
import { IoLayersOutline, IoPricetagsOutline } from 'react-icons/io5'
import {CiViewTimeline} from 'react-icons/ci'
import { BsCollection } from 'react-icons/bs'
import FormField from "../../formfileld/formfield";
import Button from "../../button/button";
import { BiSolidObjectsHorizontalLeft } from 'react-icons/bi';
import ComboBoxComponent from "../../combobox/combobox";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PocketBase from 'pocketbase';
import { serverURL,secretKey } from '../../../config';
import useApiData from "../../../security/useApiData";
import FormFields from "../../input/FormFields";
const pb = new PocketBase(serverURL);
pb.autoCancellation(false)

import { VscPackage } from "react-icons/vsc";
import { FaBoxOpen } from "react-icons/fa";
import decryptData from "../../../security/decryption";
import crypto from 'crypto-js';

function Catalog() {
  // const { api_key, timestamps, timestamp } = useApiData();

  const [factory, setFactoryArray] = useState([])
  const [profileDATA,setprofilesDATA] = useState()
  const [ratingDATA,setRatingData] = useState()
  const [totalKG, setTotalKG] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [sample_collection, setSampleCollection] = useState(0)
  const [factorySELECTED, setFactorySELECTED] = useState()
  const [warehouse, setWarehouseArray] = useState([])
  const [warehouseSELECTED, setWarehouseSELECTED] = useState()
  const [grade, setGrade] = useState(['BOP', 'BOP (S)', 'BOP (S) (C)', 'BOP (C)', 'BOP(S)(C) Special', 'GBOP', 'GBOP (S)', 'GBOP (S) (C)', 'GBOP (C)', 'GBOP(C) BT-2', 'GBOP(C) Special', 'GOF', 'GOF (S)', 'GOF (S) (C)', 'GOF(C) BT-2', 'GOF (C)', 'GOF(C) Special', 'OF', 'OF (S)', 'OF (S) (C)', 'OF (C)', 'OF(C) Special', 'FOF', 'FOF (S) (C)', 'FOF (C)', 'PF', 'PF (S) (C)', 'PF (C)', 'PF(C) Special', 'RD', 'RD (S) (C)', 'RD (C)', 'CD', 'CD (S) (C)', 'CD (C)', 'CD(C) Special', 'DUST', 'DUST(S)(C)', 'DUST(C)', 'PD', 'PD(C)', 'PD(S)(C)', 'DM PF(C)'])
  const [gradeSELECTED, setGradeSELECTED] = useState()
  const [season, setSeason] = useState()
  const [sale, setSale] = useState()
  const [season_s, set_season_s] = useState()
  const [seasonSELECTED, setSeasonSELECTED] = useState()
  const [category, setCategory] = useState(['DUST', 'LEAF', 'SUPPLEMENT'])
  const [categorySELECTED, setCategorySELECTED] = useState()
  const [leaf, SetLeaf] = useState([])
  const [leafSELECTED, SetLeafSELECTED] = useState()
  const [liquor, setLiquor] = useState([])
  const [processing, set_processing] = useState(false)
  const [liquorSELECTED, setLiquorSELECTED] = useState()
  const [formState, setFormState] = useState({

  });

  const handle_change = (event: any) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))

  };

  
  useEffect(()=>{
    if(formState.package !== undefined && formState.netweight !== undefined ){
      setTotalKG(formState.package * formState.netweight)
    }
  },[formState])
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
  
  // useEffect(()=>{
  //   if(categorySELECTED === 'LEAF'){
  //     setSampleCollection(1.5)
  //   }
  //   else if(categorySELECTED === 'DUST'){
  //     setSampleCollection(0.8)
  //   }else if(categorySELECTED === 'SUPPLEMENT'){
  //     setSampleCollection(0.5)
  //   }
  // },[categorySELECTED])
  const [factoryArray, setFactoryarray] = useState([])
  const [warehouseArray, setWarehousearray] = useState([])
  useEffect(() => {
    (async () => {
      const records = await pb.collection('profiles').getFullList({
        sort: '-created',
      })
      setprofilesDATA(records)
      const FactoryArray: any = [], WareHouseArray: any = [];
      const factory_records = decryptData(`${secretKey}`,'factories')
      setFactoryarray(factory_records)
      factory_records.map((content, index) => {
        FactoryArray.push(content.Company_name)
      })
      setFactoryArray(FactoryArray)
      const warehouse_records = decryptData(`${secretKey}`,'warehouses')
      warehouse_records.map((content, index) => {
        WareHouseArray.push(content.Company_name)
      })
      setWarehousearray(warehouse_records)
      setWarehouseArray(WareHouseArray)

      const recordsData = await pb.collection('rating').getFullList();
      setRatingData(recordsData)
      const LeafArray: any = [], LiquorArray: any = [];
      const leaf_records = decryptData(`${secretKey}`,'leafs')
      leaf_records.map((content, index) => {
          LeafArray.push(content.Name)
      })
      SetLeaf(LeafArray)
      const liquor_records = decryptData(`${secretKey}`,'liquors')
      liquor_records.map((content, index) => {
        LiquorArray.push(content.Name)
      })
      setLiquor(LiquorArray)
      // Get the current year
      const currentYear: number = new Date().getFullYear();

      // // Get the next year
      const nextYear: number = currentYear + 1;
      const seasonArray: any = []
      seasonArray.push(`${currentYear} ${nextYear}`)
      setSeason(seasonArray)
      setSeasonSELECTED(seasonArray[0])
    })()

  }, [])

  useEffect(() => {
 (async()=>{

  const get_eligibility = await pb.collection('Eligibility').getFullList({
    sort: '-created',
});


if(get_eligibility){
  setSale(get_eligibility[0].Sale_Number)
  set_season_s(get_eligibility[0].Season)
}
 })()

  }, [])
  



// console.log("Current Timestamp:", timestamps.currentTimestamp);
// console.log("Modified Timestamp:", timestamps.modifiedTimestamp);

const [factoryId, setFactory] = useState()
const [warehouseId, setWarehouse] = useState()

const getSelectdata = (value) => { // Accept 'name' as a parameter
  setFactory(value)

};
const getSelectdata2 = (value) => { // Accept 'name' as a parameter
  setWarehouse(value)

};
  const createProfile = () => {
    const generateHMAC = (data, secretKey) => {
      const hmac = crypto.HmacSHA256(data, secretKey);
      return crypto.enc.Hex.stringify(hmac);
    };

    const timestamps = new Date().toISOString().replace("T", " ");
    const currentTimestampl = new Date().getTime();
    const futureTimestamp = currentTimestampl + 30000;
    const timestamp =  futureTimestamp.toString();
    const secretKey = 'mySecretKey';

    // Generate HMAC
    const api_key = generateHMAC(timestamp, secretKey);
    if(!processing){
      set_processing(true)
    
      const season_data = formState.season ? formState.season : `${season[0]}`
      const sale_data = formState.sale ? formState.sale : `${sale[0]}`
  
        const data = {
          "Sale_number": sale,
          "Lot_number": parseInt(formState.lotnumber),
          "Invoice": formState.invoicenumber,
          "Total_kg": parseInt(totalKG),
          "Grand_total": parseFloat(grandTotal),
          "Offer_price": parseInt(formState.offerprice),
          "Category": categorySELECTED,
          "Grade": gradeSELECTED,
          "brokersID": pb.authStore.model.id,
          "Factory": factoryId,
          "Liquor_rating": '35c0uc9dbzwxxou',
          "Warehose": warehouseId,
          "Leaf_rating": '5w5eayb1g8gwmek',
          "Season": season_data,
          "Gross_weight": parseFloat(formState.grossweight), 
          "Net_weight": parseInt(formState.netweight),
          "Collection": parseFloat(sample_collection),
          "Package": parseInt(formState.package),
          "Api_kye":"c7195c1327745d485c6f97dff140ccf2c07ec906",
          "Decryption_kye":"8cf93508bf7074ca492e4b418b8a9fec8e25b5cf",
          "Whitelist":"https://64.15.255.69",
          "Remarks": formState.remarks,
          "Timestapm":timestamps,
      };
        try {
          (async()=>{
            await pb.collection('catalog').create(data,{
              headers: {
                'time_stamp': timestamp,
                'created': timestamps,
                'api_key': api_key
              },
            });
            toast.success('Catalog created successfully!')
                window.location.reload()
          })()
        }
        catch (error) {
          toast.error(error)
        }
    }
  }

  const handle_submit = (event: any) => {
    event.preventDefault();
    createProfile()
  }
  const handle_keydown = (event) => {
    // Check if the Enter key was pressed (key code 13)
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };
  return (
    <div className='p-4'>
      <form onSubmit={handle_submit}    onKeyDown={handle_keydown}className="mx-auto shadow sm:p-8 p-4 rounded-lg">
      {/* <Input defaultValue={season} handle_input_change={handle_change} icon={CiViewTimeline} title="Season" type="text" placeholder="Season e.g. 2022 2023" />

<div className="h-2"></div>
        <Input handle_input_change={handle_change} defaultValue={sale} icon={GoNumber} title="Sale number" type="number" placeholder="Sale number here..." />
        <div className="h-2"></div> */}
        {/* <p className="mb-2">Factory </p> */}
        <FormFields
                     label="Factory"
          name="Factory"
          value={factoryId}
          type="select"
          options={factoryArray.map((type) => ({
            value: type.id,
            label: type.Company_name,
          }))}
          onChange={(value) => getSelectdata(value, "Factory",0)}
        />
  <div className="h-3"></div>
<FormFields
                     label="Warehouse"
          name="Warehouse"
          value={warehouseId}
          type="select"
          options={warehouseArray.map((type) => ({
            value: type.id,
            label: type.Company_name,
          }))}
          onChange={(value) => getSelectdata2(value, "Warehouse",0)}
        />
        {/* <ComboBoxComponent selected={factorySELECTED} data={factory} change={setFactorySELECTED} />
        <div className="h-3"></div>
        <p className="mb-2">Warehouse</p>
        <ComboBoxComponent selected={warehouseSELECTED} data={warehouse} change={setWarehouseSELECTED} /> */}
        <div className="h-3"></div>
        <p className="mb-2">Grade</p>
        <ComboBoxComponent selected={gradeSELECTED} data={grade} change={setGradeSELECTED} />
        <div className="h-3"></div>
        <p className="mb-2">Category</p>
        <ComboBoxComponent selected={categorySELECTED} data={category} change={setCategorySELECTED} />
        <div className="h-3"></div>
        <Input handle_input_change={handle_change} icon={IoLayersOutline} title="Lot number" type="number" placeholder="Lot number here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={LiaFileInvoiceDollarSolid} title="Invoice number" type="text" placeholder="Invoice number here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={SiWeightsandbiases} title="Gross weight" type="text" placeholder="Gross weight here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={LiaWeightSolid} title="Net weight" type="number" placeholder="Net weight here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={VscPackage} title="Package" type="number" placeholder="Package here..." />

        <div className="h-2"></div>
       
        <Input handle_input_change={handle_change} icon={IoPricetagsOutline} title="Offer price" type="number" placeholder="Offer price here..." />
        <div className="h-3"></div>
        <Input defaultValue={'N/A'} handle_input_change={handle_change} icon={VscPackage} title="Remarks" type="text" placeholder="Remarks here..." />

<div className="h-2"></div>
        {/* <p className="mb-2">Leaf Rating</p>
        <ComboBoxComponent selected={leafSELECTED} data={leaf} change={SetLeafSELECTED} />
        <div className="h-3"></div>
        <p className="mb-2">Liquor Rating</p>
        <ComboBoxComponent selected={liquorSELECTED} data={liquor} change={setLiquorSELECTED} />
        <div className="h-3"></div> */}
     
        <div className="flex items-center justify-around">
        <p>Total KG: <span className="font-semibold text-black/50">{totalKG}</span></p>
        <p>Grand Total: <span className="font-semibold text-black/50">{grandTotal}</span></p>
        <p>Collection: <span className="font-semibold text-black/50">{sample_collection}</span></p>
        </div>
        <div className="h-3"></div>
        <Button type="submit" name="Create Catalog" icon={FaBoxOpen} />
      </form>
    </div>

  )
}

export default Catalog;
