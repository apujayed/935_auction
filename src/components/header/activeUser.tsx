// @ts-nocheck
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import moment from "moment";
import { serverURL } from "../../config";
import useSWR from 'swr';

const pb = new PocketBase(serverURL);
const ActiveUser = () => {
  const [userlist, setuserlist] = useState([])



  const fetchUser=async()=>{
    const records = await pb.collection('users').getFullList({
      expand:'reference',
      filter:'reference.Account_type="Bidder"',
      sort: '-active',
    });
    return records
  }
  const { data, error, isLoading } = useSWR('/api/user', fetchUser)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <div>

      
    <div className="w-full overflow-y-scroll h-[400px]  px-8 bg-white border border-gray-200 rounded-lg shadow sm:px-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          
          {data&&data.map((list,index)=>{
            return(
              <li key={index} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
              <img className=" w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt=""/>
                                       </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                   {list.expand.reference.Company_name}
                  </p>

                  {list.active?
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Active now
              
                </p>:
                <p className="text-sm font-medium text-gray-500 truncate dark:text-white">
               { moment(list.updated).fromNow()}
              
                </p>  
                }
                  
                 
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {list.active?  <div className="w-3 h-3 bg-green-500 rounded-full"></div>:  <div className="w-3 h-3 bg-black/25 rounded-full"></div>}
                </div>
                
              </div>
            </li>
            )
          })}
        
      
        </ul>
      </div>
    </div>
    
    
        </div>
  )


};

export default ActiveUser;
