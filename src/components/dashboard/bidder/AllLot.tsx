// @ts-nocheck
import { FaTimes } from "react-icons/fa";
import LotCard from "./AlllotCard";
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import { serverURL } from '../../../config';
import useSWR from "swr";
import { secretKey } from "../../../config";
import InfiniteScroll from 'react-infinite-scroll-component'
import { BsCheckSquareFill } from "react-icons/bs";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { toast } from "react-hot-toast";
import decryptData from "../../../security/decryption";

const pb = new PocketBase(serverURL);
pb.autoCancellation(false);
function AllLot({ set_all_lot }) {
 const [loader, set_loader] = useState(false)

    const [sell_data,set_sell_data] = useState([])
    const [loader_lot, set_loader_lot] = useState(false)

    const [filtered_catalog, set_filtered_catalog] = useState([])


    const [editMode, setEditMode] = useState(false);
    const [sold, set_sold] = useState(false)
    const [selected, setSelected] = useState()
    console.log(selected);
    
    const handle_edit_mode =()=>{

        setEditMode(!editMode)
      }


const [data1, setData1] = useState([]);
const [totalrec, settotalrec] = useState({});
const [modify_data, set_modify_data] = useState([]);
const [page, setPage] = useState(1);

// const [eligibility_data, set_eligibility_data] = useState([]);


// useEffect(()=>{
// (async()=>{
//     const response =await pb.collection('Eligibility').getFullList();
//     set_eligibility_data(response)

// })()
// },[page])


  // Function to fetch more data
 const  fetchMoreData=async()=> {

    const response =await pb.collection('Eligibility').getFullList();
    const userid = await pb.collection('users').getFirstListItem(`reference="${response[0].Profile}"`, {
      expand: 'relField1,relField2.subRelField',
  });
    const resultList8 = await pb.collection('catview').getList(page, 35, {
        expand:'Factory,Warehouse,brokersID,bidder_current,bidder_current.reference',
        filter:`bidder_current="${pb.authStore.model.id}" && Season = "${response[0].Season}" && Sale_number="${parseInt(response[0].Sale_Number)}" && brokersID ="${userid.id}"` ,
        sort:'+created'       
    });


settotalrec(resultList8);

  
    
//     const newArray = resultList8.items.map(item => {
//         const matchingObject = auctionData1.find(obj => obj.catalog === item.id);
// console.log(matchingObject);

//         if (matchingObject) {
         
            
//           return {
//             ...item,
//             a_id:matchingObject.id,
//             broker: item.expand.brokersID.expand.reference.Company_name,
//             warehouse:item.expand.Warehose.Company_name,
//             factory:item.expand.Factory.Company_name,
//             pricemax: matchingObject.price_max,
//             status:matchingObject.Status
//           };
//         } else {
//           return {
//             ...item,
//             broker: item.expand.brokersID.expand.reference.Company_name,
//             warehouse:item.expand.Warehose.Company_name,
//             factory:item.expand.Factory.Company_name,
//             pricemax: "",
//             status:false
//           };
//         }
//       });
    // Update the data in your state
    setData1((prevData) => [...prevData, ...resultList8.items]);

    // Increment the page number
    setPage(page + 1);
  }

  useEffect(() => {

    fetchMoreData(); // Fetch initial data

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  



  const filer_unsold = data1.filter(data => data.price_max!='');


    return (
        <div className="h-screen w-screen flex justify-center px-4 pt-12 bg-black/10 inset-0 fixed z-50">
            <div className="shadow-md max-w-[390px] lg:max-w-6xl bg-white rounded-lg h-fit">
                <div className="py-3 px-6 border-b border-dashed">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold tracking-tight text-slate-900">Bidded lot</h4>
                        <div className="cursor-pointer mr-4" onClick={() => { set_all_lot(false) }}>
                            <FaTimes />
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <div className="overflow-y-auto no-scrollbar max-h-[500px]">
                        <div className="min-w-full inline-block align-middle">
                        <InfiniteScroll
                          className="no-scrollbar"
      dataLength={data1.length}
      next={fetchMoreData}
      height={700}
      hasMore={true}
    //   endMessage={ <p style={{ textAlign: 'center' }}>
    //   <b>You have seen it all</b>
    // </p>}
    //  hasMore={filer_unsold.length >= data1.length ? false : true}
      loader={<h4 style={{ textAlign: 'center' }}>You have seen it all..</h4>} // Optional loading indicator
      
      
    >
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  #
                </th>
                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-x-3">
                    <button className="flex items-center gap-x-2">
                      <span>Invoice</span>
                      <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                      </svg>
                    </button>
                  </div>
                </th>
               
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Lot
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Factory
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Grade
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  N.Total
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Pkg
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Offer
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Max Price
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Status
                </th>
                
              
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          
     
      {filer_unsold?.map((item, index) => {
        // Render your data here
        return(
            <tr>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{index+1}</td>

            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
              <div className="inline-flex items-center gap-x-3">
                <span>#{item.Invoice}</span>
              </div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.Lot_number}</td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.expand.Factory.Company_name}
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-white bg-black dark:bg-gray-800">
              
                <h2 className="text-sm font-normal">{item.Grade}</h2>
              </div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.Grand_total}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.Package}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.Offer_price}
          
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.price_max }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {item.Status ? (
          <div className="text-green-500 text-xl">
            <BsCheckSquareFill />
          </div>
        ) : (
          <div className="text-red-500 text-xl">
            <MdOutlineCancel />
          </div>
        )}
      </td>
  
          </tr>
        )}
      )}
   
            
           </tbody>
          </table>
          </InfiniteScroll> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllLot;
