// @ts-nocheck
import React, { ChangeEvent, ReactElement } from 'react';
import { BsFillEyeFill } from 'react-icons/bs';

interface InputProps {
  title: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
  handle_input_change: (event: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
  disabled?: boolean;
  required_value?: boolean;
}

function Input({ setoldShow, title, type, placeholder, handle_input_change, icon: Icon,defaultValue, disabled,required_value=true}: InputProps): ReactElement {
  return (
    <div className='font-medium my-1'>
      <label htmlFor={title.toLowerCase()} className="text-base">
        {title}
      </label>
      <div className="mt-12.5 relative text-black/50 focus-within:text-black">
        <div className="absolute inset-y-0 left-0 flex items-center text-xl pl-4 pointer-events-none">
          <Icon />
        </div>
      <div className='mt-2'></div>
        <div className='flex flex-row'>
        <input
          autoComplete='off'
          defaultValue={defaultValue} 
          disabled={disabled}
          type={type}
          name={title.toLowerCase().replace(/\s/g, "")}
          onChange={handle_input_change}
          required={required_value}
          placeholder={placeholder}
          className=" w-full py-4 pl-12 pr-4 text-lg placeholder-black/50  duration-300 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black caret-black"
        />
      {setoldShow?  <BsFillEyeFill className="mt-5 ml-2" onClick={setoldShow} />:null}
        </div>
      </div>
    </div>
  );
}

export default Input;