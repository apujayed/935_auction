// @ts-nocheck
import React from 'react'
import { Detector } from "react-detect-offline";
import img from "../connection/no-wifi.png"
const CheckConnection = (props) => {
  return (
    <>
    <Detector
  render={({ online }) => (
    online?props.children:
    <div className='flex flex-col justify-center items-center'>
    <img src={img} alt="" className='w-[150px]' />
    <h1 className='text-3xl'>No Connection</h1>
    <h4>Please check your internet connection</h4>
  </div>
  
  )}
/>

    </>
  )
}

export default CheckConnection