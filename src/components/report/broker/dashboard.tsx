// @ts-nocheck
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";

import BrokerUnsold from "../../reuseable/BrokerUnsold";
import { serverURL } from "../../../config";

import { FaReact } from "react-icons/fa";
import Loading from "../../loading/loading";
import BrokerSold from "../../reuseable/BrokerSold";

import BidderWiseSold from "../../reuseable/BidderWiseSold";
import useApiData from "../../../security/useApiData";

const pb = new PocketBase(serverURL);
pb.autoCancellation(false);

function BrokerDashboard() {
  const { api_key, timestamps, timestamp } = useApiData();
  const [catalogue, setCatalogue] = useState([]);
  const [companyName, setCompanyname] = useState([]);
  const [season, setSeason] = useState([]);
  const [sale, setSale] = useState([]);

  useEffect(() => {
    // console.log(new Date().toISOString().replace("T", " "));
    const fetchData = async () => {
      // setLoading(true)
      const response = await pb.collection("Eligibility").getFullList();
      const resultList8 = await pb.collection("catview").getFullList({
        headers: {
          time_stamp: timestamp,
          created: timestamps,
          api_key: api_key,
        },
        expand:
          "Factory,Warehose,brokersID,bidder_current,bidder_current.reference",
        filter: `brokersID="${pb.authStore.model.id}" && Season = "${
          response[0].Season
        }" &&  Sale_number="${parseInt(response[0].Sale_Number)}" `,
        sort: "+created",
      });
      setSeason(response[0].Season);
      setSale(parseInt(response[0].Sale_Number));
      setCatalogue(resultList8);
      setCompanyname(pb.authStore.model?.expand.reference.Company_name);
    };

    if (api_key) {
      fetchData();
    }
  }, [api_key, timestamp, timestamps]);

  return (
    <div>
      {catalogue.length>0?
      <>
      <div className=" bg-white rounded-lg h-fit m-4 w-full col-span-2 overflow-x-auto">
        <section className="container px-2 mx-auto">
          <div className="flex flex-col">
            <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="  border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <button className="flex items-center gap-x-2">
                              <span>Invoice</span>
                              <svg
                                className="h-3"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.1"
                                />
                                <path
                                  d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.1"
                                />
                                <path
                                  d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.3"
                                />
                              </svg>
                            </button>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Lot
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Factory
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Warehouse
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Grade
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          N.Total
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Pkg
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Offer
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Bidder
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {(
                        catalogue?.map((item, index) => {
                          // Render your data here
                          return (
                            <tr>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {index + 1}
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <span>#{item.Invoice}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {item.Lot_number}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {item.expand.Factory.Company_name}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {item.expand.Warehose.Company_name}
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-white bg-black dark:bg-gray-800">
                                  <h2 className="text-sm font-normal">
                                    {item.Grade}
                                  </h2>
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
                                {item.bidder_current && (
                                  <div className="flex items-center gap-x-2">
                                    <img
                                      className="object-cover w-8 h-8 rounded-full"
                                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                      alt=""
                                    />
                                    <div>
                                      <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                        {" "}
                                        {
                                          item.expand.bidder_current.expand
                                            .reference.Company_name
                                        }
                                      </h2>
                                      <p className="text-xs font-normal text-gray-700 dark:text-gray-400">
                                        {item.price_max}{" "}
                                        {!item.Status ? (
                                          <span className="bg-red-500 text-white px-2  my-2 rounded-full">
                                            unsold
                                          </span>
                                        ) : (
                                          <span className="bg-green-500 text-white px-2  my-2 rounded-full">
                                            sold
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) }
                    </tbody>
                  </table>
                  {/* </InfiniteScroll>  */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 m-5">
        <button
          onClick={() => BrokerSold(catalogue, season, sale, companyName)}
          className="bg-blue-500 p-4  w-full flex items-center text-white px-4 py-4"
        >
          <FaReact className="text-2xl mr-2" />
          <p>Lot Wise Sold</p>
        </button>
        <button
          onClick={() => BrokerUnsold(catalogue, season, sale, companyName)}
          className="bg-blue-500 p-4  w-full flex items-center text-white px-4 py-4"
        >
          <FaReact className="text-2xl mr-2" />
          <p>Unsold</p>
        </button>

        <button
          onClick={() => BidderWiseSold(catalogue, season, sale, companyName)}
          className="bg-blue-500 p-4  w-full flex items-center text-white px-4 py-4"
        >
          <FaReact className="text-2xl mr-2" />
          <p>Bidder Wise Sold</p>
        </button>
      </div>
      </>
      :(
        <>
        <Loading/>
        </>
      )
}
    </div>
  );
}

export default BrokerDashboard;
