export interface Root {
  statusCode: number
  message: string
  data: Data
}

export interface Data {
  existingUser: ExistingUser
}

export interface ExistingUser {
  _id: string
  gender: string
  firstname: string
  surname: string
  phoneNumber: string
  role: string
  fcmToken: string
  dateOfBirth: any
  authDbId: string
  region: string
  profileImage: string
  idImageFront: any
  idImageBack: any
  profileImageUrl?:string
  idImageFrontUrl?:string
  idImageBackUrl?:string
  idType: string
  nin: string
  businessType: string
  educationLevel: string
  address1: string
  address2: string
  address3: string
  monthlyIncome: string
  salaryPayDay: any
  maritalStatus: string
  firstNextOfKinName: string
  secondNextOfKinName: string
  firstNextOfKinPhoneNumber: string
  secondNextOfKinPhoneNumber: string
  firstNextOfKinRelationship: string
  secondNextOfKinRelationship: string
  updateProfileFlag: number
  dataUpdateVerified: boolean
  temporaryDataStorageBeforeUpdateVerification: any
  storeLocation: string
  __v: number
}
