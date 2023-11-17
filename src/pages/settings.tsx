// @ts-nocheck
import toast from 'react-hot-toast';
import { useState, ChangeEvent } from 'react';

import { PiPassword } from 'react-icons/pi';
import Input from '../components/input/input';
import Button from '../components/button/button';
import PocketBase from 'pocketbase';

import { serverURL } from '../config';

const pb = new PocketBase(serverURL);

interface FormState {
  retypeyournewpassword: string;
  newpassword: string;
  oldpassword:string;
}

function Settings() {
  const [old_show, set_old_show] = useState(false);
  const [new_show, set_new_show] = useState(false);
  const [repeat_show, set_repeat_show] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    retypeyournewpassword: '',
    oldpassword:'',
    newpassword: '',
  });


  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
const update_password =async()=>{

    try{
      const authStoreModelId = pb.authStore.model?.id;
      const data = {
        "password": formState.newpassword,
        "oldPassword" : formState.oldpassword,
        "passwordConfirm": formState.newpassword
      };
      if (authStoreModelId) {
        await pb.collection('users').update(authStoreModelId, data);
        pb.authStore.clear();
        window.location.replace('/login')
      } 
    }
    catch(error:any){
      throw new error
    }

}
const setoldShow =()=>{

  set_old_show(!old_show)
}

const setnewShow =()=>{
  set_new_show(!new_show)
}
const setrepeatShow =()=>{
  set_repeat_show(!repeat_show)
}
  const handleFormSubmit =  (event:any)=>{
    if(formState.newpassword !== formState.retypeyournewpassword){
      toast('New password and Re-type new password does not match')
    }
    else{
      event.preventDefault();
        toast.promise(
          update_password(),
           {
             loading: 'Updating...',
             success: <b>Password changed successfully!</b>,
             error: <b>Something went wrong!</b>,
           }
         ); 
    }
  };


  return (
    <section className="py-10 bg-primary px-6">
      <div className="p-4 mx-auto shadow max-w-md sm:p-6 rounded-lg lg:p-8">
        <div className="text-center pb-4">
          <h2 className="text-3xl font-bold leading-tight text-secondary">
            Change your password
          </h2>
          <p className="max-w-md mx-auto my-2 text-base leading-relaxed text-secondary/50">
            Enter your new-password and re-type you new password then you are ready to go
          </p>
        </div>
        <form onSubmit={handleFormSubmit}>
        <Input
            title="Old Password"
            type={old_show?'text':'password'}
            placeholder="Enter your old password here..."
            handle_input_change={handleInputChange}
            icon={PiPassword}
            setoldShow={setoldShow}
          />
     
          <div className="h-1"></div>
          <Input
            title="New Password"
            type={new_show?'text':'password'}
            placeholder="Enter your new-password here..."
            handle_input_change={handleInputChange}
            icon={PiPassword}
            setoldShow={setnewShow}
          
          />
          <div className="h-1"></div>
          <Input
            title="Retype your new Password"
            type={repeat_show?'text':'password'}
            placeholder="Re-enter your new password here..."
            handle_input_change={handleInputChange}
            icon={PiPassword}
            setoldShow={setrepeatShow}
        
          />
          <div className="h-3"></div>
          <Button type='submit' name="Update my password" />
        </form>
      </div>

    </section>
  );
}

export default Settings;