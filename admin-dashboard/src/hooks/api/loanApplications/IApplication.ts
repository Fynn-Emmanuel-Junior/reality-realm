export interface LoanApplicationsResponse {
  statusCode: number
  message: string
  data: LoanApplicationsResponseData
}

export interface LoanApplicationsResponseData {
  loanApplicationsData: LoanApplicationModel[]
}

export interface LoanApplicationModel {
  loanApplication: LoanApplicationData
  loanProduct: LoanProduct
  client: Client
  RM?: Rm
}

export interface LoanApplicationData {
  _id: string
  loan_product_id: string
  user_id: string
  payback_amount: number
  balance: number
  relationship_manager?: string
  guarantor: Guarantor[]
  loanApplicationFiles?: LoanApplicationFile[]
  loan_status: string
  reason_for_finance: string
  terms: Terms
  approvals?: Approvals
  reason_for_rejection: any
  geolocation: Geolocation
  created_by: any
  updated_by: any
  created_at: string
  updated_at: string
  __v: number
}

export interface Guarantor {
  firstname: string
  surname: string
  phoneNumber: string
  validationOTP: string
  guarantor_id: any
  termsAccepted: any
}

export interface LoanApplicationFile {
  fileId: string
  fileName: string
}

export interface Terms {
  interest_rate: number
  amount: number
  payment_period: string
  payment_frequency: string
  terms_accepted: boolean
}

export interface Approvals {
  relationship_manager?: RelationshipManager
  manager?: Manager
}

export interface RelationshipManager {
  approval?: boolean
  message?: string
}

export interface Manager {
  approval?: boolean
  message?: string
}

export interface Geolocation {
  longitude: any
  latitude: any
}

export interface LoanProduct {
  name: string
  type: string
}

export interface Client {
  firstName: string
  surname: string
}

export interface Rm {
  firstName?: string
  surname?: string
}
