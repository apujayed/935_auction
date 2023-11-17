import { Tab } from '@headlessui/react';
import { TabData } from '../../types/types';

interface TabsProps {
  tabsData: TabData[];
}

function Tabs({ tabsData }: TabsProps): JSX.Element {
  return (
    <div className='p-2'>
            <div className='mx-auto max-w-xl'>
    <Tab.Group>
      <Tab.List>
        {tabsData.map((tab, index) => (
          <Tab className="w-[48%] text-lg rounded-lg mx-[1%]" key={index}>
            {({ selected }) => (
              <div
                className={
                  selected
                    ? ' bg-black text-white rounded-lg py-4 border-none'
                    : ' py-4 border-2 rounded-lg border-black/20 '
                }
              >
                {tab.name}
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabsData.map((tab, index) => (
          <Tab.Panel key={index}>
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  </div>
    </div>
  );
}

export default Tabs;