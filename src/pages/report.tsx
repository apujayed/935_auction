import { useEffect, useState } from "react";
import AssociationReport from "../components/report/association/dashboard";
import BidderReport from "../components/report/bidder/dashboard";
import BrokerReport from "../components/report/broker/dashboard";
import { secretKey } from "../config";
import decryptData from "../security/decryption";
interface DashboardRecord {
    Account_type: string;
  }
function Report() {
    const [Account_type, setAccount_type] = useState('')
    useEffect(() => {
        const record: DashboardRecord[] = decryptData(`${secretKey}`, 'profile');
        setAccount_type(record[0].Account_type);
      }, []);
    return (
        <>
         {Account_type === 'Association' ? <AssociationReport /> : null}
        {Account_type === 'Bidder' ? <BidderReport /> : null}
        {Account_type === 'Broker' ? <BrokerReport /> : null}
        </>
    )
}

export default Report;
