import { useEffect, useState } from "react";

import PocketBase from 'pocketbase';
import { serverURL,secretKey } from '../../../config';
import Card from "./Card";
import decryptData from "../../../security/decryption";
import CatalogueReport from "../../reuseable/CatalogueReport";
const pb = new PocketBase(serverURL);
pb.autoCancellation(false)

function Action() {
    const [records, setRecords] = useState([])
    const [print_data, set_print_data] = useState([])


    useEffect(() => {
        (async() => {
            const ID = pb.authStore.model.id;
            const catalog_records = decryptData(`${secretKey}`,'catalogs');
  
            const filtered_catalog =[]
            const Eligibility_records = await pb.collection('Eligibility').getFullList({
                sort: '-created',
            });
            // console.log(profile_records[0].id)
      
            
            catalog_records.map((content)=>{
                if(content.brokersID === ID && content.Season === Eligibility_records[0].Season && content.Sale_number === parseInt(Eligibility_records[0].Sale_Number) ){
                    filtered_catalog.push(content)
                }
            })
            setRecords(filtered_catalog)
        })()
    }, [])
    return (
        <div className="shadow-md bg-white rounded-lg h-fit m-4">
            <div className="py-3 px-6 border-b border-dashed">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold tracking-tight text-slate-900">Your catalog</h4>
                  
                    <CatalogueReport  data={print_data}/>
                </div>
            </div>
            <div className="p-4">
                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="border rounded-lg shadow-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lot </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Factory</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">G.Weight</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N.Weight</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total kg</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">G.Total kg</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Offer Price</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edit/Delete</th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">

                                    {
                                        records.map((content) => {
                                            return <Card data={content} set_print_data={set_print_data} print_data={print_data}/>
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Action;