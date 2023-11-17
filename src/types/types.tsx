import { ReactNode } from 'react';

export interface Profile {
    Account_type: 'Bidder' | 'Broker' | 'Association' | 'Warehouse' | 'Factory' | 'Teaboard';
    Auction_elegibility: boolean;
    Company_name: string;
    Contact_number: number;
    Email_address: string;
    Managing_director: string;
    collectionId: string;
    collectionName: string;
    id: string;
  }
  export interface TabData {
    name: string;
    content: React.ReactNode;
  }
  export interface LoginFormState {
    username: string;
    password: string;
}
export interface LayoutProps {
  children: ReactNode;
}
export interface FormState {
  companyname: string;
  contactnumber: string;
  emailaddress: string;
  licencenumber: string;
  binnumber: string;
  managingdirector: string;
  tinnumber: string;
}
