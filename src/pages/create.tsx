import { useEffect, useState } from "react";
import AssociationCreate from "../components/create/association/create";
import BrokerCreate from "../components/create/broker/create";
import { secretKey } from "../config";
import decryptData from "../security/decryption";
interface DashboardRecord {
    Account_type: string;
  }
function Create() {
    const [Account_type, setAccount_type] = useState('')
    useEffect(() => {
        const record: DashboardRecord[] = decryptData(`${secretKey}`, 'profile');
        setAccount_type(record[0].Account_type);
      }, []);
    return (
        <>
        {Account_type === 'Association' ? <AssociationCreate /> : null}
        {Account_type === 'Broker' ? <BrokerCreate /> : null}
        </>
    )
}

export default Create;
