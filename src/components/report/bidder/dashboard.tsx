// @ts-nocheck
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import Input from "../../input/input";

import { serverURL,secretKey } from '../../../config';

import { toast } from "react-hot-toast";
import decryptData from "../../../security/decryption";
import AllLot from "./AllLot";
import ComboBoxComponent from "../../combobox/combobox";
import { MdOutlinePointOfSale } from "react-icons/md";

const pb = new PocketBase(serverURL);
pb.autoCancellation(false)


function BrokerDashboard() {

    
    const [season, setSEASON] = useState([])

    const [all_catalog,set_all_catalog] = useState([])

    // real-time update
    const [all_lot, set_all_lot] = useState(false)
    const [seasonSELECTED,setSeasonSELECTED] = useState()
    const [saleSELECTED,setSaleSELECTED] = useState()
    
    const [statusSELECTED,setStatusSELECTED] = useState(true)

    const [sell_data,set_sell_data] = useState([])
  const handleChange = (event) => {
    const selectedBool = event.target.value === 'true'; // Convert the selected value to a boolean
    setStatusSELECTED(selectedBool);
  };
   
    const handleInputChange =(event)=>{
        setSaleSELECTED(event.target.value) 
    }

    // console.log(sell_data);
    
    return (

<div>


<AllLot seasonSELECTED={seasonSELECTED} saleSELECTED={saleSELECTED}set_all_lot={set_all_lot} catalog={all_catalog} statusSELECTED={statusSELECTED}  set_sell_data={set_sell_data} sell_data={sell_data}/>
{console.log(statusSELECTED)
}
<br />


</div>
    )
}

export default BrokerDashboard;
