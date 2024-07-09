//Loan Interfaces

export interface LoanProduct {
  type: string;
  _id: string;
  amount: Array<number>;
  payment_period: Array<string>;
  payment_frequency: Array<string>;
  [key: string]: any;
}

export interface LoanApplication {
  _id: string;
  loan_status: string;
  amount: Array<number>;
  terms: LoanTerms;
  created_at: string;
  [key: string]: any;
}

export interface LoanTerms {
  interest_rate: number;
  amount: any;
  payment_frequency: string;
  payment_period: string;
  [key: string]: any;
}

//Payment

export interface LoanPayment {
  _id: string;
  amount: number;
  payment_method: string;
  [key: string]: any;
}

export interface FlutterWaveResponse {
  meta: {
    authorization: {
      redirect?: string;
      mode: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

//redux Interfaces
export interface LoanState {
  loanProducts: Array<LoanProduct>;
  [key: string]: any;
}

//screens params
export interface LoanDetailsParams {
  loanId: string; // Assuming loanId is a string type
}
//User interface

export interface Account {
  _id: string;
  surname: string;
  firstname: string;
  phoneNumber: string;
  role: string;
  [key: string]: any;
}

export interface ProfileState {
  data: Account | {};
  [key: string]: any;
}
