// @ts-nocheck
import { useEffect, useState, Fragment } from "react";
import Card from "./card";
import PocketBase from 'pocketbase';
import { secretKey, serverURL } from "../../../config";
import { toast } from "react-hot-toast";
import { Listbox, Transition } from '@headlessui/react'
import {BsCheckAll} from 'react-icons/bs'
import {FaArrowDownWideShort} from 'react-icons/fa6'
import ComboBoxComponent from "../../combobox/combobox";
import decryptData from "../../../security/decryption";
import Input from "../../input/input";
import { MdOutlinePointOfSale } from "react-icons/md";

const pb = new PocketBase(serverURL)
pb.autoCancellation(false);
function Profiles() {
    const [data, setData] = useState([])
    const [e_record,set_e_record] = useState([])
    const [season, setSEASON] = useState([])
    const [seasonSELECTED,setSeasonSELECTED] = useState()
    const [sale, setSale] = useState([])
    const [saleSELECTED,setSaleSELECTED] = useState()
    const handleInputChange =(event)=>{
        setSaleSELECTED(event.target.value) 
    }
    useEffect(() => {
        (async () => {
            try {

                const records = await pb.collection('profiles').getFullList({
                    sort: '-created',
                    filter: 'Account_type="Broker"'
                });
                setData(records)
                const records2 = decryptData(`${secretKey}`, 'catalogs')
                
                const uniqueSeasons = [...new Set(records2.map(item => item.Season))];
                const uniqueSaleNumbers = [...new Set(records2.map(item => item.Sale_number))];
                setSEASON(uniqueSeasons)
                const e_record = await pb.collection('Eligibility').getFullList();
                set_e_record(e_record[0])
                setSeasonSELECTED(e_record[0].Season)
                setSaleSELECTED(e_record[0].Sale_Number)
            }
            catch (error: any) {
                toast.error(error.message)
            }
        })()

    }, [])
    return (
        <div>
       
            <div className="shadow-md bg-white rounded-lg mt-4 h-fit">
                
                <div className="py-3 px-6 border-b border-dashed">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold tracking-tight text-slate-900">Profile details</h4>
                    </div>
                   
                </div>
                    <div className="flex mt-6 justify-between items-center p-4">
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
                    {/* <p className="mb-2">Select sale number</p> */}
                    {/* <ComboBoxComponent selected={`${saleSELECTED}`} data={sale} change={setSaleSELECTED} /> */}
                    </div>
                    </div>                     
                    <div className="p-4">
                    <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email address</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {data.map((content, i) => {
                                                    return <Card e_record={e_record} season={seasonSELECTED} sale={saleSELECTED} data={content} key={i} />
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles;
