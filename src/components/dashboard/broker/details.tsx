// @ts-nocheck
import { useEffect, useState } from "react";
import { TbMessage2 } from "react-icons/tb";
import moment from "moment";
import CurrentCataloug from "./currentCatalog";




function Details({auction_record,catalog,current_catalog,set_current_catalog,differ_time}) {
const [message, set_message] = useState('')
// const [catalougs, set_catalougs] = useState([])
const [minutes_passed ,set_minutes_passed] = useState()
// const [current_lot, set_currentLot] = useState()

useEffect(()=>{
  set_current_catalog(catalog[minutes_passed])

  
},[catalog])

useEffect(() => {
  let intervalId;

 
  if (auction_record !== undefined) {
    set_message(auction_record.Message)
    const startTime = new Date(auction_record.Start).getTime();
    const updateTime  = async () => {
   
      
      let currentTime = null;
      if (differ_time < 0) {
        const differ_num = Math.abs(differ_time);
        const localTime = new Date().getTime();
        
        currentTime = localTime - differ_num;
      } else if (differ_time > 0) {
        const differ_num = differ_time;
        const localTime = new Date().getTime();
        currentTime = localTime + differ_num;
      } else if(differ_time===undefined) {
     
        currentTime = new Date().getTime();
      }

      const timeDifferenceMs = currentTime - startTime;
     
      
      const minutes = Math.floor(timeDifferenceMs / (1000 * 30));
      set_minutes_passed(minutes);
    };

    updateTime(); // Update time immediately

    intervalId = setInterval(updateTime, 1000); // Update time every 1 second
  }

  return () => {
    clearInterval(intervalId);
  };
}, [auction_record,differ_time]);

useEffect(()=>{
  if(minutes_passed === undefined){
    set_current_catalog()
  }else{
    set_current_catalog(catalog[minutes_passed])
  }
},[minutes_passed])
    return (
        <div className="">
        <div className="bg-black rounded-lg shadow-lg p-4 flex items-start text-white mb-4">
        <div className="text-2xl text-white/50 mr-2"><TbMessage2 /> </div>
        {message}
      </div>
        <CurrentCataloug current_catalog={current_catalog} />
        <div className='h-2'></div>
    </div>
    )
}

export default Details;
