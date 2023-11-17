// @ts-nocheck

import Tabs from '../../tabs/tabs';
import { TabData } from '../../../types/types';
import Catalog from './catalog';
import Action from './Actions';
import PocketBase from 'pocketbase';
import { useEffect ,useState} from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { serverURL } from '../../../config';
const pb = new PocketBase(serverURL);
pb.autoCancellation(false)
const tabsData: TabData[] = [
  { name: 'Create', content: <Catalog /> },
  { name: 'Edit', content: <Action /> },
];

function Create(): React.ReactElement {
  const [auc_data, set_auc_data] = useState()
  const [isMatch, setIsmatch] = useState(true)

  useEffect(()=>{
    (async()=>{
      const e_record = await pb.collection('Eligibility').getFullList();
      setIsmatch(e_record[0]?.Entry);
      // console.log(e_record[0]?.Entry);
      
    })()
  },[])
  
  console.log(isMatch);
  
  

  return <div className='sm:mt-2'>
  
   {!isMatch?
   <>
   <div className='flex bg-indigo-400 text-white rounded-sm shadow-md p-5 m-5'>
    <IoMdCloseCircleOutline className="text-xl mt-1 mr-5"/>
   <p>Entry Date Exceeded</p>
   </div>
   </>
    
    :(
<div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
<Catalog/>
<Action/>
</div>
   )}
    </div>;
}

export default Create;