export type TestUser = {
  address: string;
  address2: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  city: string;
  company: string;
  country: string;
  deleted: boolean;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  name: string;
  password: string;
  receivePartnerOffers: boolean;
  signUpForNewsletter: boolean;
  state: string;
  title: 'Mr.' | 'Mrs.';
  zipcode: string;
};

export function buildTestUser(browserName: string, retry: number): TestUser {
  const uniqueSuffix = `${browserName}-${Date.now()}-${retry}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  return {
    address: '123 Test Street',
    address2: 'Suite 456',
    birthDay: '10',
    birthMonth: '5',
    birthYear: '1995',
    city: 'Pune',
    company: 'Bug0 QA',
    country: 'India',
    deleted: false,
    email: `bug0-${uniqueSuffix}@example.com`,
    firstName: 'Bug0',
    lastName: 'Tester',
    mobileNumber: '9876543210',
    name: 'Bug0 User',
    password: 'Bug0@12345',
    receivePartnerOffers: true,
    signUpForNewsletter: true,
    state: 'Maharashtra',
    title: 'Mr.',
    zipcode: '411001',
  };
}
