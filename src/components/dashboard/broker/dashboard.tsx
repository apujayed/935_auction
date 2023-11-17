// @ts-nocheck
import { useEffect, useState,useMemo } from "react";
import PocketBase from "pocketbase";
import useSWR from "swr";

import { AiOutlineMessage } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import {
  BsFillPlayCircleFill,
  BsLayersHalf,
  BsStopCircleFill,
} from "react-icons/bs";

import Button from "../../button/button";
import Input from "../../input/input";

import { serverURL, secretKey } from "../../../config";
import Details from "./details";
import Timer from "./timer";
import { toast } from "react-hot-toast";
import decryptData from "../../../security/decryption";
import AllLot from "./AllLot";
import newlot from "../../../assets/newlot.wav";
import Loading from "../../loading/loading";
const pb = new PocketBase(serverURL);
pb.autoCancellation(false);

function BrokerDashboard() {
  const [eligibility, set_eligibility] = useState();
  // const [catalog, set_catalog] = useState([]);
  // const [broker, set_broker] = useState('')
  const [season, set_season] = useState("");
  const [message, set_message] = useState("");
  const [paused, set_paused] = useState(false);
  const [all_catalog, set_all_catalog] = useState([]);
  // const [auc_catalog, set_auc_catalog] = useState([])
  // real-time update
  const [all_lot, set_all_lot] = useState(false);
  const [sale_number, set_sale_number] = useState(0);
  const [auction_record, set_auction_record] = useState();
  const [auction_id, set_auction_id] = useState();
  const [has_completed, set_completed] = useState(false);
  const [auc_c, set_auc_c] = useState(false);
  const [current_broker, set_current_broker] = useState("");

  ///apu
  const [check_completed, set_check_completed] = useState(false);
  const [check_eligibility, set_check_eligibility] = useState(false);
  const [loader, setloader] = useState(false);

  // let filtered_catalog =[]
  // Subscribe to changes in any Eligibility record
  pb.collection("Eligibility").subscribe("*", function (e) {
    window.location.reload();
  });

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
      revalidateOnReconnect: false
 
    }
  );

  const { data: auctionData, error: auctionError } = useSWR(
    "auction",
    fetchAuctionData,{
    revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
  
    }
  );

  const fetchCatalogData = async () => {
    const response =await pb.collection('Eligibility').getFullList();
    const resultList8 = await pb.collection('catview').getFullList( {
        expand:'Factory,Warehouse,brokersID,bidder_current,bidder_current.reference',
        filter:`brokersID="${pb.authStore.model.id}" && Season = "${response[0].Season}" && Sale_number="${parseInt(response[0].Sale_Number)}" ` ,
        sort:'+created'       
    });
    return resultList8;
  };

  const { data: catalogueData ,isLoading:catloading} = useSWR( 
    "fetchcatalog",
    fetchCatalogData,{
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false

    }
  );
  
  

 
     
  useEffect(() => {
    (async () => {
   

      let profile_data = decryptData(`${secretKey}`, "profile");
     
      setloader(true);
      if (eligibilityData[0].Profile === profile_data[0].id) {
        set_check_eligibility(eligibilityData[0].Eligibility);
        set_check_completed(eligibilityData[0].Completed);
        set_auc_c(eligibilityData[0].Completed);
        set_eligibility(true);
        set_eligibility(eligibilityData[0]);
        set_season(eligibilityData[0].Season);
        set_sale_number(eligibilityData[0].Sale_Number);
        const get_current_broker = await pb
          .collection("profiles")
          .getFirstListItem(`id="${eligibilityData[0].Profile}"`);
        if (get_current_broker) {
          set_current_broker(get_current_broker.Company_name);
        }
      }

      // const auctionData = await pb.collection("auctions").getFullList({
      //   sort: "-created",
      // });
      if (auctionData.length > 0) {
        set_auction_record(auctionData[0]);
        set_auction_id(auctionData[0].id);
        if (auctionData[0].Paused.length > 0) {
          set_paused(true);
        }
        // console.log(auctionData)
       
      } 
     
      setloader(false);
   
      set_all_catalog(catalogueData)
      // set_catalog(catalogueData);
      // set_auc_catalog()
      const brokerRecord: any = localStorage.getItem("profiles");
      const parsedBrokerRecord = JSON.parse(brokerRecord);
      // set_broker(parsedBrokerRecord.Company_name);
    })();
  }, [eligibilityData,auctionData,catalogueData]);
// console.log(catalogueData);

  const fetchCurrentTime = async () => {
    try {
      const response = await fetch(
        "https://worldtimeapi.org/api/timezone/Etc/GMT+6"
      );
      const data = await response.json();
      const currentTime = data.unixtime;
      const currentTimenew = currentTime * 1000;

      return currentTimenew;
    } catch (error) {
      console.error("Error fetching current time:", error);
      return null;
    }
  };

  const start_bid = () => {
    (async () => {
      const currentTime = await fetchCurrentTime();
      const eligibility_record = await pb
        .collection("Eligibility")
        .getFullList({
          sort: "-created",
        });
      if (!eligibility_record[0].Completed) {
        if (auction_record === undefined) {
          let catalouge_array = [];
          const date = new Date(currentTime);

          let startDate = date.toISOString(); // Get the current date and time in ISO format

        
          if (catalogueData) {
            catalogueData?.map((content) => {
              catalouge_array.push(content.id);
            });
            // Render your component with catalogueData
          } else {
            // Render a loading state or a message
          }
          const data = {
            Message: "Auction has just started...",
            catalougs: catalouge_array,
            broker: pb.authStore.model.id,
            Start: startDate, // Use the formatted date and time here
            Paused: "",
          };
          try {
            (async () => {
              await pb.collection("auctions").create(data);
              const data2 = {
                Completed: true,
              };
              await pb
                .collection("Eligibility")
                .update(`${eligibility.id}`, data2);
              toast("Your catalogs are now active");
              window.location.reload();
            })();
          } catch (error) {
            toast.error(error.message);
          }
        } else {
          let catalouge_array = [];
          const date = new Date(currentTime);

          let startDate = date.toISOString(); // Get the current date and time in ISO format
          
          if (catalogueData) {
            catalogueData?.map((content) => {
              catalouge_array.push(content.id);
            });
            // Render your component with catalogueData
          } else {
            // Render a loading state or a message
          }
        

          const data_up = {
            Message: "Auction has just started...",
            catalougs: catalouge_array,
            broker: pb.authStore.model.id,
            Start: startDate, // Use the formatted date and time here
            Paused: "",
          };
          try {
            (async () => {
              await pb.collection("auctions").update(`${auction_id}`, data_up);
              const data2 = {
                Completed: true,
              };
              await pb
                .collection("Eligibility")
                .update(`${eligibility.id}`, data2);
              toast("Your catalogs are now active");
              window.location.reload();
            })();
          } catch (error) {
            toast.error(error.message);
          }
        }
      } else {
        set_auc_c(true);
      }
    })();
  };

  const stop_bid = () => {
    if (auction_record !== undefined && auction_record.Paused.length === 0) {
      (async () => {
        const currentTime = await fetchCurrentTime();
        const date = new Date(currentTime);

        let startDate = date.toISOString();
        const data = {
          Paused: startDate,
        };
        try {
          await pb.collection("auctions").update(`${auction_id}`, data);
          set_paused(true);
          toast.success("Your catalog is now paused");
        } catch (error) {
          toast.error(error.message);
        }
      })();
    } else {
      (async () => {
        const startTime = new Date(auction_record.Start);
        const pausedTime = new Date(auction_record.Paused);

        const timeDifferenceMs = pausedTime - startTime;
        // console.log(timeDifferenceMs);

        const minutes = Math.floor(timeDifferenceMs / 1000 / 60);
        const seconds = Math.floor((timeDifferenceMs / 1000) % 60);

        const inittime = await fetchCurrentTime();
        const currentTime = new Date(inittime);

        // Subtract minutes and seconds from the existing time
        currentTime.setMinutes(currentTime.getMinutes() - minutes);
        currentTime.setSeconds(currentTime.getSeconds() - seconds);

        // Format and display the modified time
        const formattedTime = currentTime.toISOString();
        // console.log(formattedTime);

        const data = {
          Paused: "",
          Start: formattedTime,
        };
        try {
          await pb.collection("auctions").update(`${auction_id}`, data);
          set_paused(false);
          toast.success("Your catalog is now active");
        } catch (error) {
          toast.error(error.message);
        }
      })();

    
    }
  };

  const send_message = (event) => {
    event.preventDefault();
    if (auction_id) {
      (async () => {
        const data = {
          Message: message,
        };
        try {
          await pb.collection("auctions").update(`${auction_id}`, data);
          toast.success("Message send successfully!");
        } catch (error) {
          toast.error(error.message);
        }
      })();
    }
  };

  const [differ_time, set_differ_time] = useState();
  const [current_catalog, set_current_catalog] = useState();
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
  }, [current_catalog]);

  pb.collection("auctions").subscribe(`${auction_id}`, function (e) {
    set_auction_record(e.record);
  });

  return (
    <>
      <div className="max-w-lg  px-4 ">
      {catloading ? (
            <>
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
      <p className="mt-4 text-lg text-gray-700">Verifying data...</p>
    </div>
          </>
          ) : (<>
        {eligibility ? (
          <>
            <div className={`flex justify-end`}>
              <div className="w-72 flex"></div>
            </div>
            <div className="flex flex-row  bg-black/10 rounded-lg my-4  p-4 justify-center font-semibold">
              <div className="w-60  ">
                <p>
                  <span className="text-black/50 my-px">Sale : </span> {sale_number}
                </p>
                <p>
                  <span className="text-black/50 my-px">Season : </span> {season}
                </p>
                <p>
                  <span className="text-black/50 my-px">Total Lot : </span>{" "}
                  {catalogueData?.length}
                </p>
                <p>
                  <span className="text-black/50 my-px">Broker :</span>{" "}
                  {current_broker}
                </p>
              </div>
              <div className="w-40  flex flex-col  justify-center items-center">
                <div className="flex flex-row gap-2 justify-center items-center w-full">
                  {!auc_c && check_eligibility && !check_completed ? (
                    <div onClick={start_bid} className="w-28">
                      <Button
                        name="Start"
                        type="submit"
                        icon={BsFillPlayCircleFill}
                      />
                    </div>
                  ) : null}

                  {check_eligibility && check_completed ? (
                    has_completed ? null : (
                      <div onClick={stop_bid} className="w-28">
                        <Button
                          name={paused ? "Resume" : "Pause"}
                          type="submit"
                          icon={BsStopCircleFill}
                        />
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div
                  onClick={() => {
                    set_all_lot(!all_lot);
                  }}
                  className="w-28"
                >
                  <Button name="All Lot" type="submit" icon={BsLayersHalf} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-black h-32 rounded-lg max-w-lg my-4 p-4 text-white text-xl flex text-center items-center justify-center">
            You are not eligable for e-auction Or re-load this page
          </div>
        )}



        {all_lot ? (
          <AllLot set_all_lot={set_all_lot} catalog={catalogueData} />
        ) : null}
        {!has_completed && eligibility && check_completed ? (
          <>
            {" "}
            <form onSubmit={send_message}>
              <Input
                istitle={false}
                title="Type your message here"
                type="text"
                placeholder="Your message here..."
                handle_input_change={(e) => {
                  set_message(e.target.value);
                }}
                icon={AiOutlineMessage}
              />

              <div className="w-full h-full">
                <Button name="Send" type="submit" icon={IoSend} />
              </div>
            </form>
            <div className="bg-[ghostwhite] p-4 shadow-lg rounded-lg text-black mt-2">
              <Details
                catalog={catalogueData}
                auction_record={auction_record}
                current_catalog={current_catalog}
                set_current_catalog={set_current_catalog}
                differ_time={differ_time}
              />
              <Timer
                total_lot={catalogueData?.length}
                completed={set_completed}
                auction_record={auction_record}
                differ_time={differ_time}
              />
            </div>
          </>
        ) : (
          <div></div>
        )}
        </>)}
      </div>
    </>
  );
}

export default BrokerDashboard;
