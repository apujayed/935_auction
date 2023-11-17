
// @ts-nocheck
import { useState } from 'react'
import Button from '../../button/button'
import PocketBase from 'pocketbase';
import { serverURL } from '../../../config';
import { toast } from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa'
const pb = new PocketBase(serverURL);

function Card({ content }) {
    const [edit, setEdit] = useState(false)
    const [offerprice, setOfferPrice] = useState(content.Offer_price)
    let [isOpen, setIsOpen] = useState(true)
    const handle_input_change = (event: any) => {
        setOfferPrice(event.target.value)
    }
    // const handle_delete = (event) => {
    //     event.preventDefault();
    //     (async () => {
    //         try {
    //             await pb.collection('catalouge').delete(`${content.id}`);
    //             setEdit(false)
    //             toast.success('Deleted successfully!')
    //             setTimeout(() => {
    //                 window.location.reload()
    //             }, 1500)
    //         }
    //         catch (erro) {
    //             // 
    //         }
    //     })()
    // }
    const handle_edit_status = () => {
        setEdit(!edit)
    }

    const handle_delete = () => {
        handle_edit_status();

    }
    const handle_save = () => {
        handle_edit_status();
        
        (async () => {
            const catalouge = await pb.collection('catalouge').getFullList({
                sort: '-created',
            });
            const UsersRecords = await pb.collection('users').getFullList({
                sort: '-created',
            });

// you can also fetch all records at once via getFullList
const Auctionrecords = await pb.collection('auctions').getFullList({
    sort: '-created',
});
            const data = {
                "Offer_price": offerprice,
            };
            try {
                await pb.collection('catalouge').update(`${content.id}`, data);
                const records = await pb.collection('auctions').getFullList({
                    sort: '-created',
                });
                records.map((content) => {
                    catalouge.map((c2)=>{
                        UsersRecords.map((c3)=>{
                            if(c3.id === c2.brokersID){
                                console.log(c3)
                                // Auctionrecords.map((c4)=>{
                                    
                                // })
                            }
                        })
                    })

                })
            }
            catch (error) {
                toast.error('Something went wrogn')
                setTimeout(() => {
                    // window.location.reload()
                }, 1500)
            }

        })()
    }
    const handle_submit = (event: any) => {
        event.preventDefault();
        (async () => {
            // example update data
            const data = {
                "Sale_number": content.Sale_number,
                "Lot_number": content.Lot_number,
                "Invoice": content.Invoice,
                "Category": content.Category,
                "Factory": content.Factory,
                "Grade": content.Grade,
                "Gross_weight": content.Gross_weight,
                "Net_weight": content.Net_weight,
                "Package": content.Package,
                "Total_kg": content.Total_kg,
                "Sample_collection": content.Sample_collection,
                "Grand_total": content.Grand_total,
                "Leaf_rating": content.Leaf_rating,
                "Liquor_rating": content.Liquor_rating,
                "Warehose": content.Warehose,
                "Offer_price": offerprice,
                "Total_after": content.Total_after,
                "brokersID": content.brokersID
            };
            try {
                await pb.collection('catalouge').update(`${content.id}`, data);
                setEdit(false)
                toast.success('Updated successfully!')
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
            catch (erro) {
                // 
            }

        })()
    }
    const edit_style = !edit ? `hidden` : null
    return (

        <>
            <tr className='cursor-pointer'>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">32</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">London No. 5 Market Ave.</td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <a onClick={handle_edit_status} className="text-yellow-400 hover:text-yellow-500" href="#">Expand</a>
                </td>
            </tr>
            <div className={`p-4 flex items-center justify-center bg-secondary/50 absolute h-screen w-screen inset-0 z-50 ${edit_style}`}>
                <div className='max-w-xl sm:w-[450px] bg-primary rounded-lg p-4'>


                    <p className='mb-2'>Offer_price: </p>

                    <input
                        type='number'
                        defaultValue={offerprice}
                        name={offerprice}
                        autoFocus
                        onChange={handle_input_change}
                        required
                        placeholder="Enter your offer price..."
                        className="block w-full py-4 pl-5 pr-4 appearance-none text-lg placeholder-secondary/50 transition-all duration-200 bg-primary border border-secondary/10 rounded-lg focus:outline-none focus:border-secondary caret-secondary"
                    />
                    <div className='flex items-center mt-2 w-full'>
                        <div className='w-1/2' onClick={handle_save}>

                            <Button name='Save' />
                        </div>
                        <div className='w-1'></div>
                        <div className='w-1/2' onClick={handle_delete}>
                            <Button name='Delete' />
                        </div>
                    </div>
                </div>
                {/* <div className='text-secondary rounded-lg p-6 bg-primary'>

    </div> */}
            </div>
        </>
    )
}

export default Card;
