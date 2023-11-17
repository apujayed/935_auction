import Input from "../../input/input";
import { MdAlternateEmail, MdPassword } from 'react-icons/md'
import { BsShieldLock } from 'react-icons/bs'
import Button from "../../button/button";
import ComboBoxComponent from "../../combobox/combobox";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PocketBase from 'pocketbase';
import { serverURL } from '../../../config';
import { LoginFormState } from "../../../types/types";

const pb = new PocketBase(serverURL);
pb.autoCancellation(false)
function Profile() {
  const [Profile_type, setProfile_type] = useState([]);
  const [Records, setRecords] = useState([])
  useEffect(() => {
    (async () => {
      const records = await pb.collection('profiles').getFullList({
        sort: '-created',
      });
      const accountTypes:any = records.map((content) => content.Company_name);
      setProfile_type(accountTypes);
      const accountIdentifier:any = records.map((content) => ({
        id: content.id,
        name: content.Company_name,
      }));
      setRecords(accountIdentifier)
    })();
  }, []);

  const [formState, setFormState] = useState<LoginFormState>({
    username: '',
    password: '',
  });
const handle_change = (event:any)=> {
  const { name, value } = event.target;
  setFormState((prevState) => ({
      ...prevState,
      [name]: value,
  }));
};
  const [selected, setSelected] = useState()
  const createAuthProfile =async()=>{
    if(selected === undefined){
      toast.error('Please pick a reference account')
    }
    else{
      const {username,password} = formState;
      let reference:string = ''
      Records.map((content:any)=>{
        if(content.name === selected){
          reference = content.id
        }
      })
      const data = {
        "username": username,
        "password": password,
        "passwordConfirm":password,
        "reference": reference 
      };
      try{
        await pb.collection('users').create(data);
        window.location.reload()
      }
      catch(error){
        throw new Error
      }
    }
  }
  const handle_submit = (event:any) => {
    event.preventDefault();
    toast.promise(
      createAuthProfile(),
      {
          loading: 'Data processing is underway',
          success: <b>Success! You've created a new profile</b>,
          error: <b>Failed! Something went wrong</b>,
      }
  );


  }
  return (
    <div className='p-4'>
      <form onSubmit={handle_submit} className="mx-auto shadow sm:p-8 p-4 rounded-lg">
        <Input handle_input_change={handle_change} icon={MdAlternateEmail} title="Username" type="text" placeholder="Username here..." />
        <div className="h-2"></div>
        <Input handle_input_change={handle_change} icon={MdPassword} title="Password" type="password" placeholder="Password here..." />
        <div className="h-2"></div>
        <p className="mb-2">Select Reference Account</p>
        <ComboBoxComponent selected={selected} data={Profile_type} change={setSelected} />
        <div className="h-3"></div>
        <Button type="submit" name="Create Profile" icon={BsShieldLock} />
      </form>
    </div>

  )
}

export default Profile;
