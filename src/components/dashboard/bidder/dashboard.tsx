// @ts-nocheck
import { useEffect, useRef, useState,useMemo } from "react";
import PocketBase from "pocketbase";
import { BsLayersHalf } from "react-icons/bs";

import Button from "../../button/button";

import { secretKey, serverURL } from "../../../config";

import decryptData from "../../../security/decryption";
import Details from "./details";
import Timer from "./timer";
import { toast } from "react-hot-toast";
import AllLot from "./AllLot";
import { HiOutlinePlusCircle } from "react-icons/hi";
import newlot from "../../../assets/newlot.wav";
import useSWR from "swr";
import ActionDetails from "./AuctionDetails";

const pb = new PocketBase(serverURL);
pb.autoCancellation(false);

function BidderDashboard() {
  // const [catalog, set_catalog] = useState([]);
  const [auction_record, set_auction_record] = useState();
  const [has_completed, set_completed] = useState(false);
  const [offer_price, set_offer_price] = useState();
  const [input_default, set_input_default] = useState();
  const [catalog_id, set_catalog_id] = useState();
  const [price_max, set_price_max] = useState();
  // const [all_catalog, set_all_catalog] = useState([]);
  const [all_lot, set_all_lot] = useState(false);

  const [paused, set_paused] = useState(false);
  const [processing, set_processing] = useState(false);

  const [season, set_season] = useState("");
  const [sale_number, set_sale_number] = useState(0);
  const [current_broker_name, set_current_broker_name] = useState("");
  const [passed_min, set_passed_min] = useState();

  const [lastActivity, setLastActivity] = useState(Date.now());
  pb.collection("Eligibility").subscribe("*", function (e) {
    window.location.reload();
  });

  const [input_value, set_input_value] = useState();
  const formRef = useRef(null);




  useEffect(() => {
    pb.collection('connected').subscribe('*', function (e) {
      console.log(e.action);
      console.log(e.record);
  });
    return () => {
      pb.collection('connected').unsubscribe('*'); 
    }
  }, [])


  // const [input_value_default, set_input_value_default] = useState('')
  useEffect(() => {
    set_input_value("");
    // if (price_max !== undefined) {
    // }
  }, [catalog_id]);

  // useEffect(()=>{
  // set_input_value('')
  // },[price_max])

  const fetchEligibilityData = async () => {
    const response = await pb.collection("Eligibility").getFullList({
      sort: "-created",
    });
    return response;
  };

  const fetchAuctionData = async () => {
    const response = await pb.collection("auctions").getFullList({
      sort: "-created",
    });
    return response;
  };

  const { data: eligibilityData, error: eligibilityError } = useSWR(
    
    "eligibility",
    fetchEligibilityData,{
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const { data: auctionData, error: auctionError } = useSWR(
    "auction",
    fetchAuctionData,{
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const fetchCatalogData = async () => {
    
    const response =await pb.collection('Eligibility').getFullList();
  
    
    const UserID = await pb
        .collection("users")
        .getFirstListItem(`reference="${response[0].Profile}"`);
     
        
    const resultList8 = await pb.collection('catalog').getFullList( {
        expand:'Factory,Warehouse,brokersID,bidder_current,bidder_current.reference',
        filter:`brokersID="${UserID.id}" && Season = "${response[0].Season}" && Sale_number="${parseInt(response[0].Sale_Number)}" ` ,
        sort:'+created'       
    });

    return resultList8;
  };

  const { data: catalogData,isLoading:isCataloading } = useSWR(
    
    "fetchcatalog",
    fetchCatalogData,{
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
 
    }
  );
  const [loader, setloader] = useState(false);

  useEffect(() => {
    (async () => {
      setloader(true);
      if (eligibilityData.length > 0) {
        set_sale_number(eligibilityData[0].Sale_Number);
        set_season(eligibilityData[0].Season);
      }
      //get current broker name
      const get_current_broker = await pb
        .collection("profiles")
        .getFirstListItem(`id="${eligibilityData[0].Profile}"`);
      if (get_current_broker) {
        set_current_broker_name(get_current_broker.Company_name);
      }

      // const auctionData = await pb.collection('auctions').getFullList({
      //     sort: '-created',
      // });
      if (auctionData.length > 0) {
        set_auction_record(auctionData[0]);
        if (auctionData[0].Paused.length !== 0) {
          set_paused(true);
        }
      }

      //   fetchCatalogData().then((data) => {
      //     setCatalogData(data);
      //     console.log('Data fetched and set in state.');
      //   });
      // }
      // const UserID = await pb
      //   .collection("users")
      //   .getFirstListItem(`reference="${eligibilityData[0].Profile}"`);

      // const CatalogRecord = decryptData(`${secretKey}`, "catalogs");
      // // console.log(CatalogRecord);

      // let filtered_catalog = [];
      // CatalogRecord.map((content) => {
      //   if (
      //     content.Season === eligibilityData[0].Season &&
      //     content.Sale_number === parseInt(eligibilityData[0].Sale_Number) &&
      //     UserID.id === content.brokersID
      //   ) {
      //     filtered_catalog.push(content);
      //   }
      // });
      // set_all_catalog(catalogData);
      // set_catalog(catalogData);
      setloader(false);
    })();
    
  }, [eligibilityData, auctionData,catalogData]);
  const updateCatalog = () => {
    set_all_lot(!all_lot)
  };
  // Subscribe to changes in any auctions record
  pb.collection("auctions").subscribe("*", function (e) {
    set_auction_record(e.record);
    set_completed(false);
    if (e.record.Paused.length !== 0) {
      set_paused(true);
    } else if (e.record.Paused.length === 0) {
      set_paused(false);
    }
  });

  // Function to reload the page
  const reloadPage = () => {
    window.location.reload();
  };

  // Function to handle user activity
  const handleActivity = () => {
    setLastActivity(Date.now());
  };

  // Set up activity listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []);

  // Set up focus listener to reload after 10 seconds of inactivity
  useEffect(() => {
    const focusListener = () => {
      if (Date.now() - lastActivity >= 15000) {
        reloadPage();
      }
    };

    window.addEventListener("focus", focusListener);

    // Cleanup the focus event listener when the component unmounts
    return () => {
      window.removeEventListener("focus", focusListener);
    };
  }, [lastActivity]);

  const [differ_time, set_differ_time] = useState();
  useEffect(() => {
    (async () => {
      // set_differ_time()
      try {
        const response = await fetch(
          "https://worldtimeapi.org/api/timezone/Etc/GMT+6"
        );
        const data = await response.json();
        const currentTimeInMilliseconds = new Date().getTime();
        const currentTime = data.unixtime;
        const currentTimenew = currentTime * 1000;
        const differ = currentTimenew - currentTimeInMilliseconds;
        set_differ_time(differ);
        return currentTimenew;
      } catch (error) {
        console.error("Error fetching current time:", error);
        return null;
      }
    })();
    const notifym = new Audio(newlot);
    notifym.play();
  }, [catalog_id]);

 


  const handle_send = (event) => {
    // set_input_value()
    event.preventDefault();
    const minimum_custom_value = price_max
      ? price_max * 0.2
      : offer_price * 0.2;
    const upper_limit = price_max
      ? price_max + price_max * 1
      : offer_price + offer_price * 1;
    const lower_limit = price_max
      ? price_max - price_max * 0.2
      : offer_price - offer_price * 0.2;

    if (input_value <= upper_limit && input_value >= lower_limit) {
      if (price_max && input_value > price_max) {
        if (formRef.current) {
          formRef.current.reset();
        }
        (async () => {
          try {
            const record = await pb
              .collection("auction_info")
              .getFirstListItem(`catalog="${catalog_id}"`);
            if (record) {
              const bidders_array = record.bidders;
              record.bidders.map((content) => {
                if (content !== pb.authStore.model.id) {
                  bidders_array.push(pb.authStore.model.id);
                }
              });
              const status = input_value >= offer_price ? true : false;
              const data = {
                price_max: parseInt(input_value),
                bidders: bidders_array,
                bidder_current: pb.authStore.model.id,
                Status: status,
              };
              try {
                if (parseInt(input_value) > record.price_max) {
                  await pb
                    .collection("auction_info")
                    .update(`${record.id}`, data);
                  set_input_value("");
                  toast.success("Offer price send");
                }
              } catch (error) {
                //
              }
            }
          } catch (error) {
            const bidders_array = [];
            bidders_array.push(pb.authStore.model.id);
            const status = input_value >= offer_price ? true : false;
            const data = {
              catalog: catalog_id,
              price_max: input_value,
              bidders: bidders_array,
              bidder_current: pb.authStore.model.id,
              Status: status,
            };

            try {
              await pb.collection("auction_info").create(data);
              set_input_value("");
              toast.success("Offer price send");
            } catch (error) {
              console.log(error);
              toast.error("Something went wrong");
            }
          }
        })();
      } else if (!price_max) {
        if (formRef.current) {
          formRef.current.reset();
        }
        (async () => {
          try {
            const record = await pb
              .collection("auction_info")
              .getFirstListItem(`catalog="${catalog_id}"`);
            if (record) {
              const bidders_array = record.bidders;
              record.bidders.map((content) => {
                if (content !== pb.authStore.model.id) {
                  bidders_array.push(pb.authStore.model.id);
                }
              });
              const status = input_value >= offer_price ? true : false;
              const data = {
                price_max: parseInt(input_value),
                bidders: bidders_array,
                bidder_current: pb.authStore.model.id,
                Status: status,
              };
              try {
                await pb
                  .collection("auction_info")
                  .update(`${record.id}`, data);
                set_input_value("");
                toast.success("Offer price send");
              } catch (error) {
                //
              }
            }
          } catch (error) {
            const bidders_array = [];
            bidders_array.push(pb.authStore.model.id);
            const status = input_value >= offer_price ? true : false;
            const data = {
              catalog: catalog_id,
              price_max: input_value,
              bidders: bidders_array,
              bidder_current: pb.authStore.model.id,
              Status: status,
            };

            try {
              await pb.collection("auction_info").create(data);
              set_input_value("");
              toast.success("Offer price send");
            } catch (error) {
              console.log(error);
              toast.error("Something went wrong");
            }
          }
        })();
      }
    } else {
      toast.error(
        "Lower max value 20% higher max value 100%"
      );
    }
  };

  const increase_one = async () => {
    try {
      set_processing(true);
      const record = await pb
        .collection("auction_info")
        .getFirstListItem(`catalog="${catalog_id}"`);
      if (record) {
        const bidders_array = record.bidders;
        if (!bidders_array.includes(pb.authStore.model.id)) {
          bidders_array.push(pb.authStore.model.id);
        }
        const price_m =  price_max + 1;
        // console.log(record.price_max, price_m, offer_price);
        const status = price_m >= offer_price;
        const data = {
          price_max: price_m,
          bidders: bidders_array,
          bidder_current: pb.authStore.model.id,
          Status: status,
        };
        // console.log('check',record.price_max,price_max);
if(record.price_max>price_max){

toast.error('Highest bid exceeded!')
    
      } else{
     
        await pb.collection("auction_info").update(`${record.id}`, data);
      }
      
    
        //   if(price_max_update !== undefined && price_m > price_max_update){
        //   }
        // }
        // if(record.price_max>price_max){
        //   toast.custom((t) => (
        //     <div
        //       className={`${
        //         t.visible ? 'animate-enter' : 'animate-leave'
        //       } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        //     >
        //       <div className="flex-1 w-0 p-4">
        //         <div className="flex items-start">
        //           <div className="flex-shrink-0 pt-0.5">

        //           </div>
        //           <div className="ml-3 flex-1">
        //             <p className="text-sm font-medium text-gray-900">
        //               Someone just bid at {record.price_max}
        //             </p>
        //             <p className="mt-1 text-sm text-gray-500">
        //               Are you sure!!
        //             </p>
        //           </div>
        //         </div>
        //       </div>
        //       <div className="flex border-l border-gray-200">
        //       <button
        //           onClick={() => toast.dismiss(t.id)}
        //           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //         >
        //           Sure
        //         </button>
        //         <button
        //           onClick={() => toast.dismiss(t.id)}
        //           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //         >
        //           Close
        //         </button>
        //       </div>
        //     </div>
        //   ))
        // }
        // if(record.price_max <= )
        // toast.success('Offer price sent');
      } else {
        set_processing(false);
        toast.error("Please add a custom offer");
      }
    } catch (error) {
    
      set_processing(false);
      throw error;
    } finally {
      set_processing(false);
    }
  };

  const handle_increase_one = () => {
    if (!processing) {
      toast.promise(increase_one(), {
        loading: "Please wait...",
        success: <b>Bidded successfully..!</b>,
        error: (error) => {
          console.log(error.status);
          
          if (error.status === 404) {
            if(price_max===undefined){
              return(<>
              Please add a custom offfer
              </>)
              
                              } else{
                                return(<>
                                  Someone Already Bid!!
                                  </>)
                              }
            // alert('Some one already exceed the highest bid!!')
          } else {
          
            return (
              <>
                <b>Something wrong!!</b>
              </>
            );
          }
        },
      });
    } else {
      // Handle the case where 'processing' is true
      // toast('Please wait...')
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2">

  
    <div className="max-w-lg  px-4 ">
      {isCataloading ? (
        <>
          <div className="flex flex-col items-center justify-center h-screen">
            <svg
              class="animate-spin w-10 h-10 stroke-slate-500"
              viewBox="0 0 256 256"
            >
              <line
                x1="128"
                y1="32"
                x2="128"
                y2="64"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="195.9"
                y1="60.1"
                x2="173.3"
                y2="82.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="224"
                y1="128"
                x2="192"
                y2="128"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="195.9"
                y1="195.9"
                x2="173.3"
                y2="173.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="128"
                y1="224"
                x2="128"
                y2="192"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="60.1"
                y1="195.9"
                x2="82.7"
                y2="173.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="32"
                y1="128"
                x2="64"
                y2="128"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="60.1"
                y1="60.1"
                x2="82.7"
                y2="82.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
            </svg>
            <p className="mt-4 text-lg text-gray-700">Verifying data...</p>
          </div>
        </>
      ) : (<>
{/* <h1>Rerender{(Math.random()*100).toFixed()}</h1> */}
      <div className="flex flex-row  bg-black/10 rounded-lg m-4  p-4 justify-center font-semibold">
        <div className="w-60  ">
          <p>
            <span className="text-black/50 my-px">Sale : </span> {sale_number}
          </p>
          <p>
            <span className="text-black/50 my-px">Season : </span> {season}
          </p>
          <p>
            <span className="text-black/50 my-px">Total Lot : </span>{" "}
            {catalogData?.length}
          </p>
          <p>
            <span className="text-black/50 my-px">Broker :</span>{" "}
            {current_broker_name}
          </p>
        </div>
        <div className="w-40  flex flex-col  justify-center items-center">
          {/* <div className="flex flex-row gap-2 justify-center items-center w-full">
              <div onClick={updateCatalog} className="w-full">
              <Button name="My " type="submit" icon={BsLayersHalf} />
            </div>
            <div onClick={updateCatalog} className="w-full">
              <Button name="My " type="submit" icon={BsLayersHalf} />
            </div>
              </div> */}
          <div onClick={updateCatalog} className="w-full">
            <Button name="My Lot" type="submit" icon={BsLayersHalf} />
          </div>
        </div>
      </div>

      {/* <div className="flex justify-end">
            <div onClick={updateCatalog} className="w-28">
              <Button name="My Lot" type="submit" icon={BsLayersHalf} />
            </div>
          </div> */}

      {all_lot ? (
        <AllLot set_all_lot={set_all_lot} catalog={catalogData} />
      ) : null}
      {paused ? (
        <div className="p-4 mt-2  m-4  bg-yellow-400 text-lg rounded-lg text-white">
          Auction is now paused!
        </div>
      ) : (
        <div>
          {has_completed ? (
            <div className="p-4 mt-2 m-4  bg-green-400 text-lg rounded-lg text-white">
              Auction has completed!
            </div>
          ) : (
            <div>
              {!has_completed && auction_record !== undefined  && catalogData? (
                <div className="max-w-lg mx-auto mt-2 px-4">
                  <div className="bg-[ghostwhite] p-4 shadow-lg rounded-lg text-black">
                    {catalogData&&<Details
                      differ_time={differ_time}
                      set_price_max={set_price_max}
                      set_input_default={set_input_default}
                      set_catalog_id={set_catalog_id}
                      set_offer_price={set_offer_price}
                      catalog={catalogData}
                      auction_record={auction_record}
                    />}
                    <Timer
                  
                    set_passed_min={set_passed_min}
                      differ_time={differ_time}
                      total_lot={catalogData?.length}
                      completed={set_completed}
                      auction_record={auction_record}
                    />
                  </div>
                  <div className="h-2"></div>
                  {/* <p>{price_max?price_max:0}</p> */}
                  <form onSubmit={handle_send}>
                    <input
                      type="number"
                      className="text-xl bg-gray-50 border border-gray-300 text-gray-900 text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Custom Offer Here..."
                      value={input_value}
                      onChange={(e) => {
                        set_input_value(e.target.value);
                      }}
                    />
                    {/* <Input
        title="Custom offer"
        type="number"
        defaultValue={input_value}
        placeholder={"Custom offer here..."}
        handle_input_change={handleInputChange}
        icon={RiPriceTag2Line}
      /> */}
                    <div className="h-2"></div>
                    <Button
                      name="Send Offer"
                      type="submit"
                      icon={BsLayersHalf}
                    />
                  </form>
                  <div className="text-4xl my-4 select-none flex items-center justify-center text-black hover:text-black/70 cursor-pointer">
                    <div onClick={handle_increase_one}>
                      <HiOutlinePlusCircle />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
      {/* <div class="bg-black/10 rounded-lg p-5">
      <p>previous</p>
  <div class="grid grid-cols-2 gap-2 ">
  
    <div class="p-2  flex flex-col items-center">
      <p class="font-semibold text-md">Paragraph 1</p>
      <p class="text-sm">Paragraph 2</p>
    </div>
    <div class="p-2  flex flex-col items-center">
      <p class="text-bold text-white p-3 bg-green-500 rounded-lg">Text Here</p>
    </div>
  </div>
 
</div> */}
</>)}
    </div>
<div className="m-5 col-span-2 p-0  bg-white overflow-x-auto">
<ActionDetails passed_min={passed_min} current_broker_name={current_broker_name}/>
</div>
    </div>
    
  );
}

export default BidderDashboard;
