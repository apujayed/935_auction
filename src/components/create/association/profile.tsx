import Input from "../../input/input";
import { GoOrganization } from 'react-icons/go'
import { MdOutlineAdminPanelSettings, MdAlternateEmail } from 'react-icons/md'
import { AiOutlineFieldBinary, AiOutlineContacts } from 'react-icons/ai'
import { BsFileBinary } from 'react-icons/bs'
import { PiCertificateLight } from 'react-icons/pi'
import Button from "../../button/button";
import { BiBookAdd } from 'react-icons/bi';
import ComboBoxComponent from "../../combobox/combobox";
import { useState } from "react";
import { toast } from "react-hot-toast";
import PocketBase from 'pocketbase';
import { serverURL } from '../../../config';
const pb = new PocketBase(serverURL);
import { FormState } from "../../../types/types";
function Profile() {
  const [formState, setFormState] = useState<FormState>({
    companyname: '',
    contactnumber: '',
    emailaddress: '',
    licencenumber: '',
    binnumber: '',
    managingdirector: '',
    tinnumber: '',
  });
const handle_change = (event:any)=> {
  const { name, value } = event.target;
  setFormState((prevState) => ({
      ...prevState,
      [name]: value,
  }));
};
  const Account_type = [
    'Bidder',
    'Broker',
    'Association',
    'Viewer',
    'Warehouse',
    'Factory', ,
    'Teaboard'
  ]
  const [selected, setSelected] = useState()
  const createProfile =async()=>{
    const {companyname, contactnumber, emailaddress, licencenumber, binnumber, managingdirector, tinnumber} = formState;
    const data = {
      "Company_name": companyname,
      "Managing_director": managingdirector,
      "Email_address": emailaddress,
      "Contact_number": contactnumber,
      "Bin_number": binnumber,
      "Tin_number": tinnumber,
      "Licence_number": licencenumber,
      "Account_type": selected
  };
  try{
    await pb.collection('profiles').create(data);
    window.location.reload()
  }
  catch(error){
    throw new Error
  }
  }
  const handle_submit = (event:any) => {
    event.preventDefault();
    toast.promise(
      createProfile(),
      {
          loading: 'Verifying login credential...',
          success: <b>Success! You've created a new profile</b>,
          error: <b>Failed! Something went wrong</b>,
      }
  );


  }
  return (
    <div className='p-4'>
      <form onSubmit={handle_submit} className="mx-auto shadow sm:p-8 p-4 rounded-lg">
        <Input handle_input_change={handle_change} icon={GoOrganization} title="Company name" type="text" placeholder="Company name here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={MdOutlineAdminPanelSettings} title="Managing director" type="text" placeholder="Managing director name here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={AiOutlineFieldBinary} title="Bin number" type="number" placeholder="Bin number here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={BsFileBinary} title="Tin number" type="text" placeholder="Tin number here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={PiCertificateLight} title="Licence number" type="text" placeholder="Licence number here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={AiOutlineContacts} title="Contact number" type="text" placeholder="Contact number here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={MdAlternateEmail} title="Email address" type="text" placeholder="Email address here..." />
        <div className="h-2"></div>
        <p className="mb-2">Select Account Type</p>
        <ComboBoxComponent selected={selected} data={Account_type} change={setSelected} />
        <div className="h-3"></div>
        <Button type="submit" name="Create Profile" icon={BiBookAdd} />
      </form>
    </div>

  )
}

export default Profile;
