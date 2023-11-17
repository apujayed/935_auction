// @ts-nocheck
import LotCard from "./AlllotCard";
import { useState, useEffect } from "react";
import CatalogueReport from "../../reuseable/CatalogueReport";
import PocketBase from 'pocketbase';
import { BsCheckSquareFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

import { serverURL } from '../../../config';
import useSWR from 'swr';
const pb = new PocketBase(serverURL);
pb.autoCancellation(false);

function AllLot({
  seasonSELECTED,
  saleSELECTED,
  catalog,
  set_all_lot,
  statusSELECTED,
  set_sell_data,
  sell_data,
}) {
  const [filtered_lot, set_filtered_lot] = useState([]);
  const [loader, set_loader] = useState(false);

  const fetchMylot = async () => {
    const e_record = await pb.collection('Eligibility').getFullList();
    console.log(typeof(parseInt(e_record[0].Sale_Number)));
    
                // set_e_record(e_record[0])
                // setSeasonSELECTED(e_record[0].Season)
                // setSaleSELECTED(e_record[0].Sale_Number)
                const records = await pb.collection('auction_info').getFullList({
                  expand: 'catalog,catalog.Factory,catalog.brokersID.reference',
                  sort: '+catalog',
                  filter: `bidder_current = "${pb.authStore.model.id}" && catalog.Season="${e_record[0].Season}" && catalog.Sale_number="${parseInt(e_record[0].Sale_Number)}"`,
                });
    return records;
  };
  
  const { data: myLot, error: myLoterror } = useSWR(
    "mylot",
    fetchMylot,{
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const sumColumns = () => {
    let sums = {
      NetTotal: 0,
      OfferPrice: 0,
      PriceMax: 0,
      // Totalkg: 0,
      // Grand_total: 0,
      // Gross_weight: 0,
    };
  
    if (filtered_lot) {
      
      
      for (const item of filtered_lot) {
        sums.NetTotal += parseFloat(item.Net || 0);
        sums.OfferPrice += parseFloat(item.Offer_price || 0);
        sums.PriceMax += parseFloat(item.price_max || 0);
        // sums.Totalkg += parseFloat(item.Total_kg || 0);
        // sums.Grand_total += parseFloat(item.Grand_total || 0);
        // sums.Gross_weight += parseFloat(item.Gross_weight || 0);
      }
    }
  
    return sums;
  };

  useEffect(() => {
    (async () => {
      const status_fil = myLot.filter((lot) => lot.Status === statusSELECTED);
      set_loader(true);

      const newArray = status_fil.map(item => ({
        "Lot_number": item.expand.catalog.Lot_number,
        "Broker": item.expand.catalog.expand.brokersID.expand.reference.Company_name,
        "Invoice": item.expand.catalog.Invoice,
        "Grade": item.expand.catalog.Grade,
        "Company_name": item.expand.catalog.expand.Factory.Company_name,
        "Offer_price": item.expand.catalog.Offer_price,
        "price_max": item.price_max,
        "Status": item.Status,
        "Net": item.expand.catalog.Grand_total,
        "Created": item.expand.catalog.created,
        // Add other properties as needed
      }));

      newArray.sort((a, b) => new Date(a.Created) - new Date(b.Created));

      set_filtered_lot(newArray);
      set_loader(false);
    })();
  }, [myLot, statusSELECTED]);

  const columnSums = sumColumns();

  
    
  return (
    <div className="mt-12">
  
      <div className="shadow-md w-[80vw] mx-auto bg-white rounded-lg h-fit">
        <div className="py-3 px-6 border-b border-dashed">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold tracking-tight text-slate-900">
             Report
            </h4>
           {/* < CatalogueReport data={sell_data}/> */}
          </div>
        </div>
        <div className="p-4">
        <div className="overflow-y-auto max-h-[500px]">
                        <div className="min-w-full inline-block align-middle">
                        {loader ? (
            <>
             <div className="flex flex-col items-center justify-center w-screen h-screen">
             <svg class="animate-spin w-10 h-10 stroke-slate-500" viewBox="0 0 256 256">
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
          ) : (<> <table className="min-w-[100%] divide-y divide-gray-200">
          <thead>
                      <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lot </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Broker</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Factory</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                          {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net weight</th>
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Pkg</th>
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Total</th> */}
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Net Total</th>
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Offer price</th>
                          {/* <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Collection</th>
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Gross weight</th>
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Season</th>
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Category</th> */}
                          {/* <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Current bidder</th> */}
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Price max</th>
                          <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                  </thead>
              <tbody className="divide-y divide-gray-200">
             {filtered_lot?.map((item,i)=>{
              return(
                  <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.Lot_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.Invoice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.Broker}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.Company_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.Grade}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.Net_weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Package}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Total_kg}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.Net}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.Offer_price}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Collection}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Gross_weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Season}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{warehouse}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.Category}</td> */}
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{current_bidder}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.price_max}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.Status ? <div className="text-green-500 text-xl"><BsCheckSquareFill /></div> : <div className="text-red-500 text-xl"><MdOutlineCancel /></div>}</td>
              </tr> 
              )
             })}
              </tbody>
              <tfoot>
                    <tr>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                        colSpan={4}
                      >
                        Total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Lot total:({filtered_lot.length})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {columnSums.NetTotal.toFixed(2)}  kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                       
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Avg:{(columnSums.PriceMax/filtered_lot.length).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                       Total {((columnSums.PriceMax/filtered_lot.length)*(columnSums.NetTotal)).toFixed(2)} Tk
                      </td>
                      
                  </tr>
                  </tfoot>
          </table></>)}
                           
                        </div>
                    </div>
        </div>
      </div>
    </div>
  );
}

export default AllLot;
