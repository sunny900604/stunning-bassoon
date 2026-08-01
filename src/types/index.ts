export type DonationItem = {
  name: string;
  quantity: number;
  condition: 'new' | 'good' | 'fair';
};

export type DonationStatus = 'pending' | 'processing' | 'completed' | 'rejected';

export type Donation = {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  items: DonationItem[];
  pickupAddress: string;
  status: DonationStatus;
  notes: string;
  createdAt: string;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type EmployeeRole =
  | 'customer-support'
  | 'donation-manager'
  | 'data-analyst'
  | 'marketing'
  | 'instagram'
  | 'goodpopup'
  | 'sales'
  | 'design';

export type Employee = {
  id: EmployeeRole;
  name: string;
  title: string;
  description: string;
  color: string;
  emoji: string;
};
