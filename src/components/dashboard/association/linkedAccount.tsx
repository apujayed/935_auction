import { useEffect, useState } from "react";
import Card from "./loginCard";
import PocketBase from 'pocketbase';
import { serverURL } from "../../../config";
const pb = new PocketBase(serverURL);

function LinkedAccount() {
    const [data, setData] = useState([])
    useEffect(() => {
        let data_array = []
        data_array.push(pb.authStore.model)
        setData(data_array)
    }, [])
    return (
        <div>
            <div className="shadow-md bg-white rounded-lg mt-4 h-fit">
                <div className="py-3 px-6 border-b border-dashed">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold tracking-tight text-slate-900">Linked Accounts</h4>
                    </div>
                </div>
                <div className="p-4">
                    <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {data.map((content, i) => {
                                            return <Card data={content} key={i} />
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LinkedAccount;
