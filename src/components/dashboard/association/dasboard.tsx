import Profiles from './profiles';
import LinkedAccount from './linkedAccount';
import Tabs from '../../tabs/tabs';
import { TabData } from '../../../types/types';

const tabsData: TabData[] = [
  { name: 'Profiles', content: <Profiles /> },
  { name: 'Linked Account', content: <LinkedAccount /> },
];

function AssociationDashboard(): React.ReactElement {
  return <div className='sm:mt-12'><Tabs tabsData={tabsData} /></div>;
}

export default AssociationDashboard;