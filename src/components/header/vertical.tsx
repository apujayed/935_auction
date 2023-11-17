import { NavLink } from 'react-router-dom';
import { Tooltip } from 'flowbite-react'
import { GrHomeOption } from 'react-icons/gr';
import { BsBuildingAdd, BsFileEarmarkText } from 'react-icons/bs';
import { LuSettings2 } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { secretKey } from '../../config';
import decryptData from '../../security/decryption';


const Vertical = ({ isMenuCollapsed }) => {
    const [AccountType, setAccountType] = useState('')
    useEffect(()=>{
        const record = decryptData(`${secretKey}`, 'profile');
        setAccountType(record[0].Account_type);
    },[])
    // @ts-ignore
    // const isMenuCollapsed = useSelector((state: RootState) => state.menu.collapsed);
    const collaped_style = !isMenuCollapsed ? `hidden lg:flex w-24 items-center delay-` : `w-52 items-start`
    const logo_position = !isMenuCollapsed ? `items-center` : `items-start`
    const title_hide = !isMenuCollapsed ? `hidden` : ``
    const hide_bidders = AccountType === 'Bidder' ? `hidden` : ``
    const handle_collasp = () => {
        if (window.innerWidth < 1024) {
            handle_collasp()
        }
    }
    return (

        <div className={`${collaped_style}  flex  flex-col bg-white shadow justify-between items-start sticky inset-0 h-screen duration-300 px-6 pb-8`}>
            <div className={`${logo_position} flex flex-col`}>
                <div className={`h-24 flex items-center`}>
                    <div className='h-10 w-12 rounded bg-black flex items-center justify-center'>
                        <div className='h-2 w-6 rounded bg-white'></div>
                    </div>
                    <h1 className={`text-1xl  ml-3 ${title_hide} text-black font-semibold `}>E- AUCTION</h1>
                </div>
               
                <NavLink
                    onClick={handle_collasp}
                    to='/dashboard'
                    // @ts-ignore
                    className={({ isActive }) =>
                        isActive ? "text-white p-4 bg-black/10 rounded-lg duration-300 " : "text-black/50 p-4 hover:bg-black/10 duration-300 rounded-lg"
                    }
                >
                    <Tooltip className='bg-secondary text-base ml-4 px-4' content={'Dashboard'} style='dark' placement='right' arrow={false}>
                        <div className='flex items-center'>
                            <div className="text-[28px]"><GrHomeOption /></div>
                            <p className={`text-base font-medium ml-3 ${title_hide} duration-300`}>Dashboard</p>
                        </div>
                    </Tooltip>
                </NavLink>
                {AccountType !== 'Bidder' && AccountType !== 'Viewer' ? <>
                <div className='h-2'></div>
                <NavLink
                    to='/create'
                    onClick={handle_collasp}
                    // @ts-ignore
                    className={({ isActive }) =>
                        isActive ? "text-secondary p-4 bg-secondary/10 rounded-lg duration-300" : `${hide_bidders} text-secondary/50 p-4 hover:bg-secondary/10 duration-300 rounded-lg`
                    }
                >
                    <Tooltip className='bg-secondary text-base ml-4 px-4' content={'Create'} style='dark' placement='right' arrow={false}>
                        <div className='flex items-center'>
                            <div className="text-[28px]"><BsBuildingAdd /></div>
                            <p className={`text-base font-medium ml-3 ${title_hide} duration-300`}>Create</p>
                        </div>
                    </Tooltip>
                </NavLink>
                </> : null}

                <div className='h-2'></div>
                {AccountType === 'Broker'?(<>
                    <NavLink
                    to='/unsold'
                    onClick={handle_collasp}
                    // @ts-ignore
                    className={({ isActive }) =>
                        isActive ? "text-black p-4 bg-black/10 rounded-lg duration-300" : "text-black/50 p-4 hover:bg-black/10 duration-300 rounded-lg"
                    }
                >
                    <Tooltip className='bg-secondary text-base ml-4 px-4' content={'Report'} style='dark' placement='right' arrow={false}>
                        <div className='flex items-center'>
                            <div className="text-[28px]"><BsFileEarmarkText /></div>
                            <p className={`text-base font-medium ml-3 ${title_hide} duration-300`}>Unsold</p>
                        </div>
                    </Tooltip>
                </NavLink>
                </>):null}
                <div className='h-2'></div>
                {AccountType !== 'Viewer' ?<NavLink
                    to='/report'
                    onClick={handle_collasp}
                    // @ts-ignore
                    className={({ isActive }) =>
                        isActive ? "text-black p-4 bg-black/10 rounded-lg duration-300" : "text-black/50 p-4 hover:bg-black/10 duration-300 rounded-lg"
                    }
                >
                    <Tooltip className='bg-secondary text-base ml-4 px-4' content={'Report'} style='dark' placement='right' arrow={false}>
                        <div className='flex items-center'>
                            <div className="text-[28px]"><BsFileEarmarkText /></div>
                            <p className={`text-base font-medium ml-3 ${title_hide} duration-300`}>Report</p>
                        </div>
                    </Tooltip>
                </NavLink>:null}
            </div>
         {AccountType!=='Viewer'?   <NavLink
                to='/settings'
                onClick={handle_collasp}
                // @ts-ignore
                className={({ isActive }) =>
                    isActive ? "text-secondary p-4 bg-secondary/10 rounded-lg duration-300" : "text-secondary/50 p-4 hover:bg-secondary/10 duration-300 rounded-lg"
                }
            >
                <Tooltip className='bg-secondary text-base ml-4 px-4' content={'Settings'} style='dark' placement='right' arrow={false}>
                    <div className='flex items-center'>
                        <div className="text-[28px]"><LuSettings2 /></div>
                        <p className={`text-base font-medium ml-3 ${title_hide} duration-300`}>Settings</p>
                    </div>
                </Tooltip>
            </NavLink>:null}
        </div>
    );
};

export default Vertical;