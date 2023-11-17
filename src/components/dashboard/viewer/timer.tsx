// @ts-nocheck
import { useEffect, useState } from "react";
import moment from "moment";
import { GiNetworkBars } from 'react-icons/gi';
function Timer({set_passed_min,auction_record, completed, total_lot,differ_time }) {
  const [time, setTime] = useState('00');
  const [minute_pass, set_minute_pass] = useState('00');
  const [server_time, setServerTime] = useState('00');

  useEffect(() => {
    let intervalId;

    

    const updateTimer = async () => {
      const startTime = new Date(auction_record.Start).getTime();
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
        console.log('i am un defined');
        
        currentTime = new Date().getTime();
      }

     

      if (currentTime !== null) {
        const timeDifferenceMs = currentTime - startTime;
        const minutes = Math.floor(timeDifferenceMs / (1000 * 30));
        const seconds = Math.floor((timeDifferenceMs / 1000) % 30);
        set_minute_pass(minutes);
        set_passed_min(minutes)
        if (auction_record.Paused.length === 0) {
          setTime(30 - seconds);
         
          if (auction_record.catalougs.length <= minutes) {
            completed(true);
          } else {
            completed(false);
          }
        }

        if (auction_record.Paused.length !== 0) {
          const pausedTime = new Date(auction_record.Paused).getTime();

          const timeDifferenceMs = pausedTime - startTime;
          const seconds = Math.floor((timeDifferenceMs / 1000) % 30);

          setTime(30 - seconds);
        

        }
      }
    };

    // Call fetchCurrentTime only once when the component mounts
  
      updateTimer();
      intervalId = setInterval(updateTimer, 1000);
    

    return () => {
      clearInterval(intervalId);
    };
  }, [auction_record,differ_time]);

  return (
    <>
    <hr />
      <div className="flex flex-row justify-between ml-2 mr-2">
        <div className="text-2xl text-center">00:{time}</div>
        <div className="text-1xl text-center text-black/40">{minute_pass + 1}/{total_lot}</div>
    <div className="flex flex-row">
    <GiNetworkBars className="mt-1 mr-1"/>
    <p className="text-[9px]">{differ_time}ms</p>
    </div>
      </div>
      <hr />
    </>
  );
}

export default Timer;
