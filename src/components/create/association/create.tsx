// @ts-nocheck
import { Tab } from '@headlessui/react';
import { VscLoading } from 'react-icons/vsc';
import { Fragment, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Profile from './profile';
import LoginCredentials from './loginCredentials';
import Button from '../../button/button';
import ComboBox from '../../combobox/combobox';
import { serverURL } from '../../../config';
import toast from 'react-hot-toast';
import Tabs from '../../tabs/tabs';
const pb = new PocketBase(serverURL);
let profileTypes = [];
let profileTypes2 = []
function AssociationCreate() {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    managingdirector:'',
    licencenumber:'',
    emailaddress:'',
    contactnumber:'',
    binnumber:'',
    tinnumber:'',
    companyname:'',
});

const [loading, setLoading] = useState(false);
const [profileData,setProfileData] = useState([])
const loading_style = loading ? '' : 'hidden';
const [combobox,setCombobox] = useState('')
  const comboboxChanges =(event:any)=>{
    setCombobox(event)
  }
  const handleInputChange = (
    event
) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};
const handle_submit=(event)=>{
  event.preventDefault();
  if(combobox.length === 0 ){
    alert('Select account type *')
  }else{
    setLoading(true)
    const data = {
      "Company_name": formState.companyname,
      "Managing_director": formState.managingdirector,
      "Bin_number": formState.binnumber,
      "Contact_number": formState.contactnumber,
      "Tin_number": formState.tinnumber,
      "Licence_number": formState.licencenumber,
      "Email_address": formState.emailaddress,
      "Account_type": combobox
  };
  try{
    (async()=>{
      const record = await pb.collection('profiles').create(data);
      toast.success('Successfully profile created!')
      setTimeout(()=>{
        window.location.reload()
      },1500)

    })()
  }
  catch(error){
    toast.error(error.message);
    setTimeout(()=>{
      window.location.reload()
    },1500)
  }
  }
}
const handle_form_login=(event)=>{
  event.preventDefault();
  if(combobox.length === 0 ){
    alert('Select reference account *')
  }else{
    setLoading(true)
    let data = {
      "username": formState.username,
      "reference" : "",
      "emailVisibility": false,
      "password": formState.password,
      "passwordConfirm": formState.password,
      "Type": null
  };
  profileTypes.find(function(item) {
    if(item.name === combobox){
      data.reference = item.id;
      data.Type = item.type
    }
  });
  
    (async()=>{
      try{
        await pb.collection('users').create(data);
        toast.success('Successfully login credentials created!')
        setTimeout(()=>{
          window.location.reload()
        },1500) 
      }
      catch(error){
        toast.error(`${error.message} Username exists or password is too short (minimum 5 characters)` );
        setTimeout(()=>{
          setLoading(false)
        },1500) 
      }
    })()
  

  }
}
const tabsData: TabData[] = [
  { name: 'Profile', content: <Profile /> },
  { name: 'Auth Profile', content: <LoginCredentials /> },
];
  const comboboxData = [
    'Bidder',
    'Broker',
    'Association',
    'Warehouse',
    'Factory',,
    'Teaboard'
  ]
  
    return (
      <div className='sm:mt-12 p-4'>
      <Tabs tabsData={tabsData} />
  </div>
    )
}

export default AssociationCreate;
