// @ts-nocheck

import React from "react";
// import Select from "react-select";
import { Select } from 'antd';
const FormField = ({sl,inputRef,handleKeyPress, label, name, value, type, onChange, options, error }) => {
  const Option = Select.Option;
 
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="form-group row">
          <span className="col-sm-5 "> {label}</span>
          <div className="">
            {type === "select" ? (
                           <Select
                      
                           required
                           className="w-full h-[55px] "
                           showSearch
                           placeholder="Select.."
                           optionFilterProp="children"
                           name={name}
                           onChange={onChange}
                           value={value}
                           filterOption={(input, option) =>
                             (option.label ?? '').toLowerCase().includes(input.toLowerCase())
                           }
                         >
                           {options.map((option) => (
                             <Option key={option.value} value={option.value} label={option.label}>
                               <div className="row">
                                 <span className="col-4 col-md-4">{option.label}</span>
                                
                               </div>
                             </Option>
                           ))}
                         </Select>
            ) : (
              <input
                required
              
                className="form-input"
                type={type}
                value={value}
                name={name}
                placeholder={name==="Remarks"?"#O/L_#O/S_":label}
                autoComplete="off"
                onChange={onChange}
                id={name}
                
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormField;
