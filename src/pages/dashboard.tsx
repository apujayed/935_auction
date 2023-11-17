import { useEffect, useState } from "react";

import BidderDashboard from "../components/dashboard/bidder/dashboard";
import ViewerDashboard from "../components/dashboard/viewer/dashboard";

import BrokerDashboard from '../components/dashboard/broker/Panel'
import AssociationDashboard from '../components/dashboard/association/dasboard'
import decryptData from '../security/decryption';

import { secretKey } from "../config";

interface DashboardRecord {
  Account_type: string;
}

function Dashboard(): JSX.Element {
  const [Account_type, setAccount_type] = useState<string>('');

  useEffect(() => {
    const record: DashboardRecord[] = decryptData(`${secretKey}`, 'profile');
    setAccount_type(record[0].Account_type);
  }, []);

  return (
    <>
      {Account_type === 'Bidder' ? <BidderDashboard /> : null}
      {Account_type === 'Viewer' ? <ViewerDashboard /> : null}
      {Account_type === 'Association' ? <AssociationDashboard /> : null}
      {Account_type === 'Broker' ? <BrokerDashboard /> : null}
    </>
  );
}

export default Dashboard;