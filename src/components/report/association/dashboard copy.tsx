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
    useEffect(() => {
        (async () => {
            try {

              
                // setData(records)
                const records2 = decryptData(`${secretKey}`, 'catalogs')
                
                const uniqueSeasons = [...new Set(records2.map(item => item.Season))];
               
                setSEASON(uniqueSeasons)
                const e_record = await pb.collection('Eligibility').getFullList();
                // set_e_record(e_record[0])
                setSeasonSELECTED(e_record[0].Season)
                setSaleSELECTED(e_record[0].Sale_Number)
                // setStatusSELECTED(options[0])
            }
            catch (error: any) {
                toast.error(error.message)
            }
        })()

    }, [])
    useEffect(() => {
        set_sell_data([]);
        (async () => {

            // const record = await pb.collection('catalog').getFirstListItem('Grade="BOP"', {
            //     expand: 'Factory',
            // });
            // console.log(record.expand.Factory.Company_name);
            
            // const e_record = await pb.collection('Eligibility').getFullList();
            // setSeasonSELECTED(e_record[0].Season)
            // setSaleSELECTED(e_record[0].Sale_Number)
            const CatalogRecord = await pb.collection('catalog').getFullList({
                filter: "Season = '2023 2024' && Sale_number = 1",
              });
         console.log(CatalogRecord);
              
              let filtered_catalog = CatalogRecord.filter((content) => {
                return content.Season === seasonSELECTED && content.Sale_number === parseInt(saleSELECTED);
              }).map((content) => {
                // Add the bidder key to each object
                content.bidder = 'your_bidder_value_here';
                return content;
              });
              console.log(filtered_catalog);
              
            set_all_catalog(filtered_catalog)



         const auction_info = await pb.collection('auction_info').getFullList({
            sort: '-created',
        });
      
          
          const newArray = filtered_catalog.map(item => {
            const matchingObject = auction_info.find(obj => obj.catalog === item.id);
            if (matchingObject) {
              return {
                ...item,
                pricemax: matchingObject.price_max
              };
            } else {
              return {
                ...item,
                pricemax: ""
              };
            }
          });
          
         


        })()


    }, [seasonSELECTED,saleSELECTED,statusSELECTED])
    const handleInputChange =(event)=>{
        setSaleSELECTED(event.target.value) 
    }

    // console.log(all_catalog);
    
    return (

<div>

<div className="flex mt-6 justify-between items-center p-4 sm:w-[600px] mx-auto">
                    <div className="w-1/2">
                    <p className="mb-2">Select season</p>
                    <ComboBoxComponent selected={seasonSELECTED} data={season} change={setSeasonSELECTED} />
                    </div>
                    <div className="w-2"></div>
                    <div className="w-1/2">
                    <Input
                        title="Sale Number"
                        type="number"
                        defaultValue={saleSELECTED}
                        placeholder="Sale number here..."
                        handle_input_change={handleInputChange}
                        icon={MdOutlinePointOfSale}
                    />
                    </div>
                    <div className="w-2"></div>
                    <div className="w-1/2">
                    <p className="mb-2">Status</p>
                    <select    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-black caret-black"
         id="myDropdown" value={statusSELECTED.toString()} onChange={handleChange}>
        <option value="true">Sold</option>
        <option value="false">Unsold</option>
      </select>

 

                 
                    </div>

                    </div> 
<AllLot set_all_lot={set_all_lot} catalog={all_catalog} statusSELECTED={statusSELECTED}  set_sell_data={set_sell_data} sell_data={sell_data}/>

<br />


</div>
    )
}

export default BrokerDashboard;
