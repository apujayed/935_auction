// @ts-nocheck
// import LotCard from "./AlllotCard";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FaFileExcel } from "react-icons/fa";
import { BsCheckSquareFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import {useEffect,useState} from"react"

function AllLot({loader,all_data, catalog, set_all_lot, statusSELECTED,set_sell_data,seasonSELECTED,
    sell_data, }) 
    {
     

  
        const sumColumns = () => {
            const sums = {
                Total_pkg: 0,
              Net_weight: 0,
              Total_kg: 0,
              Grand_total: 0,
              Offer_price: 0,
              Gross_weight: 0,
            };
        
            for (const item of sell_data) {
                sums.Total_pkg += parseFloat(item.Package);
              sums.Net_weight += parseFloat(item.Net_weight);
              sums.Total_kg += parseFloat(item.Total_kg);
              sums.Grand_total += parseFloat(item.Grand_total);
              sums.Offer_price += parseFloat(item.Offer_price);
              sums.Gross_weight += parseFloat(item.Gross_weight);
            }
        
            return sums;
          };
        
          const columnSums = sumColumns();
        // console.log(sell_data);
         const [filter_sold, set_filter_sold] = useState([])
        useEffect(()=>{
          
          const filter_sold_data = all_data?.filter(item => item.status === statusSELECTED);
          set_filter_sold(filter_sold_data);
   


        },[all_data,statusSELECTED])
    return (
        <div className="mt-12">
            <div className="shadow-md w-[80vw] mx-auto bg-white rounded-lg h-fit">
                <div className="py-3 px-6 border-b border-dashed">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold tracking-tight text-slate-900">Report</h4>
                        {/* <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText={<><FaFileExcel />Export</>}/>
              */}
                    </div>
                </div>
                <div className="p-4">
                    <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                            <table id="table-to-xls" className="min-w-full divide-y divide-gray-200">
                            {loader ? (
            <>
             <div className="flex flex-col items-center justify-center w-screen h-screen">
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
          </>
          ) : (<> 
                               
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lot </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Factory</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net weight</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Pkg</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Total</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Grand Total</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Offer price</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Collection</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Gross weight</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Season</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Category</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Current bidder</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Price max</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">

                                        {filter_sold?.map((content) => {
                                            return(
                                              <tr>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.Lot_number}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{content.Invoice}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{content.factory}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{content.Grade}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{content.Net_weight}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.Package}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.Total_kg}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.Grand_total}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.Offer_price}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.Collection}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.Gross_weight}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.Season}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.warehouse}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.Category}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.bidder}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.price_max}</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{content.status ? <div className="text-green-500 text-xl"><BsCheckSquareFill /></div> : <div className="text-red-500 text-xl"><MdOutlineCancel /></div>}</td>
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
                        {columnSums.Net_weight.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {columnSums.Total_pkg.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {columnSums.Total_kg.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {columnSums.Grand_total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                     
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                       
                      </td>
                    </tr>
                  </tfoot>
                                
                                </>)}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllLot;
