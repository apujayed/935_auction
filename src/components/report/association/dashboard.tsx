// @ts-nocheck
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import Input from "../../input/input";
import useSWR from 'swr'
import { serverURL,secretKey } from '../../../config';



import BrokersSummary from "../../reuseable/BrokersSummary";
const pb = new PocketBase(serverURL);
pb.autoCancellation(false)


function BrokerDashboard() {

    
 
    const [seasonSELECTED,setSeasonSELECTED] = useState()
    const [saleSELECTED,setSaleSELECTED] = useState()
    





  const fetchData =async()=>{
    
    const response =await pb.collection('Eligibility').getFullList();
    setSeasonSELECTED(response[0].Season)
    setSaleSELECTED(response[0].Sale_Number)
    const resultList8 = await pb.collection('summary').getFullList({
      expand:'brokersID,brokersID.reference',
      filter:` Season = "${response[0].Season}" && Sale_number="${parseInt(response[0].Sale_Number)}" ` ,
  });
   
    return resultList8;
  }
  const { data:aucsummary, error, isLoading } = useSWR('/data/association', fetchData)
 
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div className="">


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
  </div>
  
   
    return (

<div>


<div className="flex justify-center align-center">
<BrokersSummary data={aucsummary} sale={saleSELECTED} season={seasonSELECTED}/>
</div>

</div>
    )
}

export default BrokerDashboard;
