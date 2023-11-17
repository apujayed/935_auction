// @ts-nocheck

import Tabs from '../../tabs/tabs';
import { TabData } from '../../../types/types';
import Catalog from './dashboard';
import ActionDetails from './AuctionDetails';


const tabsData: TabData[] = [
  { name: 'E-Auction', content: <Catalog /> },
  { name: ' Unsold items', content: <ActionDetails /> },
];

function Create(): React.ReactElement {
  return <div className='sm:mt-2'>
<div className='grid grid-cols-1 md:grid-cols-3 md:gap-4 '>
<Catalog/>
<ActionDetails/>
</div>


  </div>;
}

export default Create;