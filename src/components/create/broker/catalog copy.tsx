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
const pb = new PocketBase(serverURL);
pb.autoCancellation(false)

import { VscPackage } from "react-icons/vsc";
import { FaBoxOpen } from "react-icons/fa";
import decryptData from "../../../security/decryption";
function Catalog() {
  const [factory, setFactoryArray] = useState([])
  const [profileDATA,setprofilesDATA] = useState()
  const [ratingDATA,setRatingData] = useState()
  const [totalKG, setTotalKG] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [sample_collection, setSampleCollection] = useState(0)
  const [factorySELECTED, setFactorySELECTED] = useState()
  const [warehouse, setWarehouseArray] = useState([])
  const [warehouseSELECTED, setWarehouseSELECTED] = useState()
  const [grade, setGrade] = useState(['BOP','BOP (S) (C)','BOP (C)' ,'GBOP', 'GBOP (S) (C)','GBOP (C)','GOF','GOF (S) (C)', 'GOF (C)','OF','OF (S) (C)','OF (C)','FOF','FOF (S) (C)','FOF (C)','PF','PF (S) (C)','PF (C)','RD','RD (S) (C)','RD (C)','CD','CD (S) (C)','CD (C)'])
  const [gradeSELECTED, setGradeSELECTED] = useState()
  const [season, setSeason] = useState()
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
  useEffect(()=>{
    if(categorySELECTED === 'LEAF'){
      setSampleCollection(1.5)
    }
    else if(categorySELECTED === 'DUST'){
      setSampleCollection(0.8)
    }else if(categorySELECTED === 'SUPPLEMENT'){
      setSampleCollection(0.5)
    }
  },[categorySELECTED])
  useEffect(() => {
    (async () => {
      const records = await pb.collection('profiles').getFullList({
        sort: '-created',
      })
      setprofilesDATA(records)
      const FactoryArray: any = [], WareHouseArray: any = [];
      const factory_records = decryptData(`${secretKey}`,'factories')
      factory_records.map((content, index) => {
        FactoryArray.push(content.Company_name)
      })
      setFactoryArray(FactoryArray)
      const warehouse_records = decryptData(`${secretKey}`,'warehouses')
      warehouse_records.map((content, index) => {
        WareHouseArray.push(content.Company_name)
      })
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

  const createProfile = () => {
    if(!processing){
      set_processing(true)
      let warehouseID = null;
      let factoryID = null;
      let leafID = null;
      let liquorID = null;
     
      const factory_records = decryptData(`${secretKey}`,'factories')
      factory_records.map((content, index) => {
        if(content.Company_name === factorySELECTED){
          factoryID = content.id
        }
      })
      const warehouse_records = decryptData(`${secretKey}`,'warehouses')
      warehouse_records.map((content, index) => {
        if(content.Company_name === warehouseSELECTED){
          warehouseID = content.id
        }
      })
      const leaf_records = decryptData(`${secretKey}`,'leafs')
      leaf_records.map((content, index) => {
        if(content.Name === leafSELECTED){
          leafID = content.id
        }
      })
      const liquor_records = decryptData(`${secretKey}`,'liquors')
      liquor_records.map((content, index) => {
        if(content.Name === liquorSELECTED){
          liquorID = content.id
        }
      })
      const season_data = formState.season ? formState.season : `${season[0]}`
      console.log(season_data)
        const data = {
          "Sale_number": parseInt(formState.salenumber),
          "Lot_number": parseInt(formState.lotnumber),
          "Invoice": formState.invoicenumber,
          "Total_kg": parseInt(totalKG),
          "Grand_total": parseFloat(grandTotal),
          "Offer_price": parseInt(formState.offerprice),
          "Category": categorySELECTED,
          "Grade": gradeSELECTED,
          "brokersID": pb.authStore.model.id,
          "Factory": factoryID,
          "Liquor_rating": liquorID,
          "Warehose": warehouseID,
          "Leaf_rating": leafID,
          "Season": season_data,
          "Gross_weight": parseFloat(formState.grossweight), 
          "Net_weight": parseInt(formState.netweight),
          "Collection": parseFloat(sample_collection),
          "Package": parseInt(formState.package)
      };
        try {
          (async()=>{
            await pb.collection('catalog').create(data);
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
        <Input handle_input_change={handle_change} icon={GoNumber} title="Sale number" type="number" placeholder="Sale number here..." />
        <div className="h-2"></div>
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
        <Input defaultValue={season} handle_input_change={handle_change} icon={CiViewTimeline} title="Season" type="text" placeholder="Season e.g. 2022 2023" />

<div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={IoPricetagsOutline} title="Offer price" type="number" placeholder="Offer price here..." />
        <div className="h-3"></div>
        <p className="mb-2">Leaf Rating</p>
        <ComboBoxComponent selected={leafSELECTED} data={leaf} change={SetLeafSELECTED} />
        <div className="h-3"></div>
        <p className="mb-2">Liquor Rating</p>
        <ComboBoxComponent selected={liquorSELECTED} data={liquor} change={setLiquorSELECTED} />
        <div className="h-3"></div>
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
