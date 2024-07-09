import React, { useEffect, useState } from 'react';
import { Card, Col, Form, FormGroup, InputGroup, Row, Table,Modal } from 'react-bootstrap';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
//
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { useGetLoanPayments } from '@/hooks/api/payments/useGetLoanPayments';
import { useGetUserDetails } from '@/hooks/api/clients/useGetUserDetails';
import { LoanApplicationModel } from '../../hooks/api/loanApplications/IApplication';
import { useGetFileData } from '@/hooks/api/misc/useGetFileData';
import { getFileLink } from '@/utils/api';
import Image from '@/components/Image';
import { useGuarantors } from '@/hooks/useGuarantor';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MapWithAMarker = withScriptjs(withGoogleMap(({ lat,lng}: any) => {
  return<>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: parseFloat(lat) , lng: parseFloat(lng) }}
      ></GoogleMap>

      <Marker position={{ lat: parseFloat(lat) , lng: parseFloat(lng) }} />
    </>;
}
));

//Basic start
const Wizard = ({ step: currentIndex, ...props }: any) => {
  const steps: any = React.Children.toArray(props.children);
  const prevStep: any = currentIndex !== 0 && steps[currentIndex - 1].props;
  const nextStep: any = currentIndex !== steps.length - 1 && steps[currentIndex + 1].props;

  return (
    <div>
      <nav className="btn-group steps basicsteps">
        {steps.map((step: any, index: any) => (
          <Button
            key={step.props.number}
            onClick={() => props.onChange(index)}
            className={getClsNavBtn(index === currentIndex)}
            style={{
              backgroundColor: index === currentIndex ? '#FFB800': '',
              border: index === currentIndex ? 'white' : '',
              borderRadius: index === currentIndex ? '5px' : '',
              color: index === currentIndex ? 'white' : ''
            }}
          >
            <span className="number me-2">{step.props.number}</span>
            <i>{step.props.title}</i>
          </Button>
        ))}
      </nav>

      {steps[currentIndex]}

      <div className=" p-3 d-flex justify-content-between">
        <Button
          visible={prevStep}
          onClick={() => props.onChange(currentIndex - 1)}
          title={prevStep.description}
          style={{ backgroundColor: '#FFB800', color: 'white' }}
        >
          Back
        </Button>
        <Button
          visible={nextStep}
          onClick={() => props.onChange(currentIndex + 1)}
          title={nextStep.description}
          style={{ backgroundColor: '#FFB800', color: 'white' }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
const Step = ({ children }: any) => children;

function  getClsNavBtn(active: any) {
  return 'btn' + (active ? 'active' : '');
}
function Button({ visible, ...props }: any) {
  return <button className={visible ? 'btn' : 'invisible'} {...props} />;
}

interface Props {
  selectedItem: LoanApplicationModel;
}

const GuarantorModal = ({id,show,handleClose}: any) => {
  const {GetGuarantor} = useGuarantors();
  const [guarantor, setGuarantor] = useState(null) as any;

  useEffect(() => {
    const Guarantor = async(id) => {
      const guarantordata = await GetGuarantor(id);
     
      if(guarantordata) {
        const {dateOfBirth,...rest} = guarantordata;
        const date  = new Date(dateOfBirth);
        setGuarantor({...rest, dateOfBirth: date.toISOString().split('T')[0]});
      }
    };

    Guarantor(id);
  },[]);
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <div style={{display: 'flex',justifyContent:'space-between',alignItems: 'center',width: '100%'}}>
        <h5>Guarantor details</h5>
        <div style={{cursor: 'pointer',background: '#B22222',color: 'white',padding: '10px',borderRadius: '10px'}}>
          <div onClick={handleClose}>
            Close
          </div>
        </div>
      </div>
    </Modal.Header>
    <Modal.Body>
    <section className="card-body Basicwizard">
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Firstname</Form.Label>
              <Form.Control type="text" className="form-control" required value={guarantor?.firstname} placeholder="" disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Surname</Form.Label>
              <Form.Control type="text" className="form-control" required value={guarantor?.surname} placeholder="" disabled/>
            </FormGroup>
           
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Gender </Form.Label>
              <Form.Control type="text" className="form-control" required value={guarantor?.gender}  disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Date of Birth</Form.Label>
              <Form.Control type="text" className="form-control" required value={guarantor?.dateOfBirth.split('T')[0]} disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Phone Number</Form.Label>
              <Form.Control type="text" className="form-control" required  value={guarantor?.phoneNumber} disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">ID Type</Form.Label>
              <Form.Control type="text" className="form-control" required  value={guarantor?.idType} disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Relationship</Form.Label>
              <Form.Control type="text" className="form-control" required  value={guarantor?.relationship} disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">NIN</Form.Label>
              <Form.Control type="text" className="form-control" required  value={guarantor?.nin} disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Region</Form.Label>
              <Form.Control type="text" className="form-control" required  value={guarantor?.region} disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Business Type</Form.Label>
              <Form.Control type="text" className="form-control" required placeholder="" value={guarantor?.businessType?.segment} disabled/>
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={guarantor?.businessType?.type} 
                disabled
              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Work Address</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={guarantor?.address1}
                disabled 
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={guarantor?.address2}
                disabled
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={guarantor?.address3}
                disabled
              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Monthly Income </Form.Label>
              <Form.Control 
                type="number" 
                className="form-control" 
                required 
                placeholder="" 
                value={guarantor?.monthlyIncome} 
                disabled
              />
            </FormGroup>

          </section>
          <section className="card-body Basicwizard ">
              <div style={{ color: '#000000' }}>
                <div>
                  <Form.Label className="form-label"> Selfie </Form.Label>
                  <div className="md:w-1/2" style={{ width: '50%', height: '120px' }}>
                  {guarantor?.profileImage &&  <Image id={guarantor?.profileImage}  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}></Image>}
                  </div>
                </div>
                <div style={{ marginTop: '30px' }}>
                  <h5> National ID NIN </h5>
                  <div>
                    <Form.Label className="form-label"> Front </Form.Label>
                    <div className="md:w-1/2" style={{ width: '50%', height: '120px' }}>
                    {guarantor?.idImageFront && <Image id={guarantor?.idImageFront}  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}></Image>}
                    </div>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <Form.Label className="form-label"> Back </Form.Label>
                    <div className="md:w-1/2" style={{ width: '50%', height: '120px' }}>
                      {guarantor?.idImageBack &&<Image id={guarantor?.idImageBack}  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}></Image>}

                    </div>
                  </div>
                </div> 
              </div>
            </section>
    </Modal.Body>
  </Modal>
  );
};

const Basicwizard : React.FC<Props>  =  ({selectedItem}) => {
  const [step, setStep] = useState(0);
  const {getLoanPayments, data, isLoading}:any = useGetLoanPayments();
  const { getUserDetails, data:loanUserInfo } = useGetUserDetails();
  const [showGuarantordata,setShowGuarantordata] = useState(false);
  const [showGuarantorOnedata,setShowGuarantorOnedata] = useState(false);
  const [showModal,setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };  

  useEffect(()=>{
    if(selectedItem){
      getLoanPayments(selectedItem.loanApplication._id, 10);
      getUserDetails(selectedItem.loanApplication.user_id);  
    }
  },[selectedItem.loanApplication._id]);

    return (
      <Wizard step={step} onChange={(e:any)=>setStep(e)}>
        <Step title="Loan Details" number="1">
          <section className="card-body Basicwizard">
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Loan Product </Form.Label>
              <Form.Control 
                type="text" 
                className="form-control" 
                value={selectedItem?.loanProduct?.name} 
                disabled 
              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Amount </Form.Label>
              <Form.Control
                type="email" 
                className="form-control" 
                required 
                value={selectedItem.loanApplication.terms.amount} 
                placeholder="" 
                disabled
              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Loan status </Form.Label>
              <Form.Control 
                type="email" 
                className="form-control" 
                required 
                value={selectedItem.loanApplication.loan_status} 
                placeholder="" 
                disabled
              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Payment period </Form.Label>
              <Form.Control 
                type="text" 
                className="form-control"  
                required 
                value={selectedItem.loanApplication.terms.payment_period} 
                placeholder="" 
                disabled
              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Payment frequency </Form.Label>
              <Form.Control 
                type="text" 
                className="form-control" 
                required 
                value={selectedItem.loanApplication.terms.payment_frequency} 
                placeholder="" 
                disabled
              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Pending balance </Form.Label>
              <Form.Control 
                type="email" 
                className="form-control" 
                required 
                value={selectedItem.loanApplication.balance} 
                placeholder="" 
                disabled
              />
            </FormGroup>

            <div className="control-group form-group mb-0">
              <Form.Label className="form-label"> Interest Rate </Form.Label>
              <Form.Control 
                type="text" 
                className="form-control" 
                required 
                value={selectedItem.loanApplication.terms.interest_rate+"%"} 
                placeholder="" 
                disabled
              />
            </div>

            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Reason for loans</Form.Label>
              <Form.Control 
                type="text" 
                className="form-control" 
                required 
                value={selectedItem.loanApplication.reason_for_finance} 
                placeholder="" 
                disabled
              />
            </FormGroup>
          </section>
          <div>
          <h4>Finance Details</h4>
          <section className="card-body Basicwizard ">
            <div className="control-group form-group mb-0">
              <h6>Pending Balance</h6>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '10px',
                  height: '45px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                <div>
                  <div>
                    <p> {'UGX '+ selectedItem.loanApplication.terms.amount} </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <h6> Payment History </h6>

              {!isLoading && data?.length > 0 && data?.map((payment: any) => <div

                  key={payment._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    height: '45px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                  }}
                >
                  <div>
                    <div>
                      <p>Mobile Payment {payment.network}</p>
                    </div>
                  </div>
                  <p>{'UGX ' + payment.amount}</p>
                </div>)}
            </div>
          </section>
        </div>
        </Step>

        <Step title="Customer Information" number="2">
          <section className="card-body Basicwizard ">
            <Form.Label className='form-label'> Guarantor one </Form.Label>
            <FormGroup className="control-group form-group">
              {
                selectedItem.loanApplication.guarantor[0] ? <>
                   <Form.Control 
                type="text" 
                className="form-control" 
                required  
                value ={selectedItem.loanApplication.guarantor[0]?.firstname} 
                placeholder="" 
                disabled
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                value = {selectedItem.loanApplication.guarantor[0]?.surname}
                placeholder=""
                style={{ marginTop: '10px'}}
                disabled
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                value = {selectedItem.loanApplication.guarantor[0]?.phoneNumber}
                placeholder=""
                style={{ marginTop: '10px'}}
                disabled
              />
              {
                !selectedItem.loanApplication.guarantor[0]?.termsAccepted ? '' :  <FormGroup>
                <div
                  style={{
                    backgroundColor:  selectedItem.loanApplication.guarantor[0]?.termsAccepted === true ?  '#FFB800' : 'red',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '5px',
                    marginTop: '10px',
                    width: '50%',
                    cursor: 'pointer'
                  }}  
                  onClick={() => {
                    if(selectedItem.loanApplication.guarantor[0]?.termsAccepted === true) {
                      setShowGuarantorOnedata(true);
                      setShowModal(true);
                    }
                  }}  
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: '12px',
                        marginTop: '2px',
                      }}
                    >
                    {
                       selectedItem.loanApplication.guarantor[0]?.termsAccepted === true ? 'Guarantor Accepted' : 'Guarantor Rejected'
                    }
                    </div>
                  </div>
                </FormGroup> 
              }
               
                </>  : <FormGroup>
                   <Form.Control 
                    type="text"
                    className="form-control"
                    value = "Not Available"
                    placeholder=""
                    disabled 
                   />
                </FormGroup>
              }
             
            </FormGroup> 
              {
                showGuarantorOnedata && <GuarantorModal id={selectedItem.loanApplication.guarantor[0]?.guarantor_id} show={showModal} handleClose={handleClose}/>
              }

             <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Guarantor two </Form.Label>
              <Form.Control 
                type="text" 
                className="form-control" 
                required  
                value ={selectedItem.loanApplication.guarantor[1]?.firstname} 
                placeholder="" 
                disabled
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                value = {selectedItem.loanApplication.guarantor[1]?.surname}
                placeholder=""
                style={{ marginTop: '10px'}}
                disabled
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                value = {selectedItem.loanApplication.guarantor[1]?.phoneNumber}
                placeholder="Number"
                style={{ marginTop: '10px'}}
                disabled
              />
              {
                !selectedItem.loanApplication.guarantor[1]?.termsAccepted ? '' :    <FormGroup>
                <div
                  style={{
                    backgroundColor:  selectedItem.loanApplication.guarantor[1]?.termsAccepted == true ?  '#FFB800' : 'red',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '5px',
                    marginTop: '10px',
                    width: '50%',
                     cursor: 'pointer'
                  }}
                  onClick={() => {
                    if(selectedItem.loanApplication.guarantor[1]?.termsAccepted == true) {
                      setShowGuarantordata(true);
                      setShowModal(true);
                    }
                  }}
                
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: '12px',
                        marginTop: '2px',
                      }}
                    >
                    {
                       selectedItem.loanApplication.guarantor[1]?.termsAccepted == true ? 'Guarantor Accepted' : 'Guarantor Rejected'
                    }
                    </div>
                  </div>
                </FormGroup>
              }
               
              </FormGroup> 
              {
                showGuarantordata && <GuarantorModal id={selectedItem.loanApplication.guarantor[1]?.guarantor_id} show={showModal} handleClose={handleClose}/>
              }
          </section>
          <div>
            <h4> Documents Required </h4>
            <section className="card-body Basicwizard ">
              <div style={{ color: '#000000' }}>
                <div>
                  <Form.Label className="form-label"> Selfie </Form.Label>
                  <div className="md:w-1/2" style={{ width: '50%', height: '120px' }}>
                  {loanUserInfo.profileImage &&  <Image id={loanUserInfo.profileImage}  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}></Image>}
                  </div>
                </div>
                <div style={{ marginTop: '30px' }}>
                  <h5> National ID NIN </h5>
                  <div>
                    <Form.Label className="form-label"> Front </Form.Label>
                    <div className="md:w-1/2" style={{ width: '50%', height: '120px' }}>
                    {loanUserInfo.idImageFront && <Image id={loanUserInfo.idImageFront}  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}></Image>}
                    </div>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <Form.Label className="form-label"> Back </Form.Label>
                    <div className="md:w-1/2" style={{ width: '50%', height: '120px' }}>
                      {loanUserInfo.idImageBack &&<Image id={loanUserInfo.idImageBack}  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}></Image>}

                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '50px' }}>
                  <h5 style={{ marginTop: '20px' }}> Required Attachments </h5>

                  {selectedItem.loanApplication.loanApplicationFiles && selectedItem.loanApplication.loanApplicationFiles.map((file) => {
                    return <LoanAttachmentPreview fileId={file.fileId} key={file.fileId} />;
                  })}
                </div>
              </div>
            </section>
        </div>

        <div>
          <h4>Personal Information</h4>
          <section className="card-body Basicwizard">
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Firstname</Form.Label>
              <Form.Control type="text" className="form-control" required value={loanUserInfo.firstname} placeholder="" disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Surname</Form.Label>
              <Form.Control type="text" className="form-control" required value={loanUserInfo.surname} placeholder="" disabled/>
            </FormGroup>
           
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Gender </Form.Label>
              <Form.Control type="text" className="form-control" required value={loanUserInfo.gender}  disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Marital status</Form.Label>
              <Form.Control type="text" className="form-control" required   value={loanUserInfo.maritalStatus} disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Level Of Education</Form.Label>
              <Form.Control type="text" className="form-control" required value={loanUserInfo.educationLevel} disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Phone Number</Form.Label>
              <Form.Control type="text" className="form-control" required  value={loanUserInfo.phoneNumber} disabled/>
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Business Type</Form.Label>
              <Form.Control type="text" className="form-control" required placeholder="" value={loanUserInfo?.businessType?.segment} disabled/>
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={loanUserInfo?.businessType?.type} 
                disabled
              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Work Address</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={loanUserInfo.address1}
                disabled 
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={loanUserInfo.address2}
                disabled
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={loanUserInfo.address3}
                disabled
              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Monthly Income </Form.Label>
              <Form.Control 
                type="number" 
                className="form-control" 
                required 
                placeholder="" 
                value={loanUserInfo.monthlyIncome} 
                disabled
              />
            </FormGroup>

            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> 1st Next of Kin </Form.Label>
              <Form.Control type="text" className="form-control" required placeholder="" value={loanUserInfo.firstNextOfKinName} disabled/>
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                disabled
                value={loanUserInfo.firstNextOfKinPhoneNumber} 
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={loanUserInfo.firstNextOfKinRelationship}
                disabled
              />
            </FormGroup>

            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> 2nd Next of Kin </Form.Label>
              <Form.Control 
                type="text" 
                className="form-control" 
                required 
                placeholder="" 
                value={loanUserInfo.secondNextOfKinName} 
                disabled
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{ marginTop: '10px' }}
                value={loanUserInfo.secondNextOfKinPhoneNumber}
                disabled
              />
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder=""
                style={{marginTop: '10px'}}
                value={loanUserInfo.secondNextOfKinRelationship}
                disabled
              />
            </FormGroup>

            <div className="control-group form-group mb-0">
              <Form.Label className="form-label">Agent Pin Drop Location</Form.Label>

              {selectedItem.loanApplication.geolocation.latitude && <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEoZn5xObT7Pt051ckM9xDbt2MGVzZXr4&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}

                lat={selectedItem.loanApplication.geolocation.latitude}
                lng={selectedItem.loanApplication.geolocation.longitude}
              />}

              {!selectedItem.loanApplication.geolocation.latitude && <div className="text-center my-5">No location added yet</div>}
              
            </div>
          </section>
        </div>
        </Step>
      </Wizard>
    );
};
//Basic end

//Loan Attachment preview
interface LoanAttachmentPreviewProps {
  fileId: string;
}

const LoanAttachmentPreview : React.FC<LoanAttachmentPreviewProps> = ({fileId}) => {
  const { data: file, getFileData, isLoading, error }: {
    data: any | null,
    getFileData: (fileId: string) => void,
    isLoading: boolean,
    error: string | null,
  } = useGetFileData();

  useEffect(()=>{
    if(fileId){
      getFileData(fileId);
    }
  },[fileId]);

  if (isLoading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center my-5">Error fetching attachment</div>;
  }

  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        <Form.Label className="form-label"> {file?.originalname} </Form.Label>
        {file && (
          <div className="md:w-1/2" style={{width: '50%', height: '120px'}}>
            <img
              src={file.fileUrl ?? getFileLink(file._id)}
              alt={file.originalname}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

function Name({ nextStep, handleFormData, values }: any) {
  const [error, setError] = useState(false);
  const submitFormData = (e: any) => {
    e.preventDefault();
    if (validator.isEmpty(values.firstName) || validator.isEmpty(values.lastName)) {
      setError(true);
    } else {
      nextStep();
    }
  };

  return (
    <div>
      <Form onSubmit={submitFormData}>
        <Form.Group className="">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            style={{ border: error ? '2px solid #6259ca' : '' }}
            name="firstName"
            defaultValue={values.firstName}
            type="text"
            placeholder="First Name"
            onChange={handleFormData('firstName')}
          />
          {error ? <Form.Text style={{ color: '#6259ca' }}>This is a required field</Form.Text> : ''}
        </Form.Group>
        <Form.Group className="">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            style={{ border: error ? '2px solid #6259ca' : '' }}
            name="lastName"
            defaultValue={values.lastName}
            type="text"
            placeholder="Last Name"
            onChange={handleFormData('lastName')}
          />
          {error ? <Form.Text style={{ color: '#6259ca' }}>This is a required field</Form.Text> : ''}
        </Form.Group>
        <Button type="submit" className="btn mt-3 btn-primary">
          Continue
        </Button>
      </Form>
    </div>
  );
}
function StepTwo({ nextStep, handleFormData, prevStep, values }: any) {
  const [error, setError] = useState(false);

  const submitFormData = (e: any) => {
    e.preventDefault();

    if (validator.isEmpty(values.age) || validator.isEmpty(values.email)) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <div>
      <Form onSubmit={submitFormData}>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            style={{ border: error ? '2px solid red' : '' }}
            type="number"
            placeholder="Age"
            onChange={handleFormData('age')}
          />
          {error ? <Form.Text style={{ color: 'red' }}>This is a required field</Form.Text> : ''}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            style={{ border: error ? '2px solid red' : '' }}
            type="email"
            placeholder="email"
            onChange={handleFormData('email')}
          />
          {error ? <Form.Text style={{ color: 'red' }}>This is a required field</Form.Text> : ''}
        </Form.Group>
        <div>
          <Button className="float-start btn btn-primary" onClick={prevStep}>
            Previous
          </Button>

          <Button className="float-end btn btn-primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
function Final({ nextStep, prevStep, values }: any) {
  const [error, setError] = useState(false);

  const submitFormData = (e: any) => {
    e.preventDefault();

    if (validator.isEmpty(values.age) || validator.isEmpty(values.email)) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <div>
      <section>
        <FormGroup className="form-group" onSubmit={submitFormData}>
          <Form.Label className="form-label">CardHolder Name</Form.Label>
          <Form.Control style={{ border: error ? '2px solid red' : '' }} type="text" placeholder="First Name" />
        </FormGroup>
        <FormGroup className="form-group">
          <Form.Label className="form-label">Card number</Form.Label>
          <InputGroup className="input-group">
            <Form.Control type="text" className="form-control" placeholder="Search for..." />
            <span className="input-group-append">
              <Button variant="" className="btn btn-secondary" type="button">
                <i className="fab fa-cc-visa"></i> &nbsp; <i className="fab fa-cc-amex"></i> &nbsp;
                <i className="fab fa-cc-mastercard"></i>
              </Button>
            </span>
          </InputGroup>
        </FormGroup>
        <Row>
          <Col sm={8}>
            <FormGroup className="form-group mb-sm-0">
              <Form.Label className="form-label">Expiration</Form.Label>
              <InputGroup className="input-group">
                <Form.Control type="number" className="form-control" placeholder="MM" name="expiremonth" />
                <Form.Control type="number" className="form-control" placeholder="YY" name="expireyear" />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col sm={4}>
            <FormGroup className="form-group mb-0">
              <Form.Label className="form-label">
                CVV <i className="fa fa-question-circle"></i>
              </Form.Label>
              <Form.Control type="number" className="form-control" required />
            </FormGroup>
          </Col>
        </Row>
      </section>
      <div>
        <Button className="float-start btn btn-primary mt-2" onClick={prevStep}>
          Previous
        </Button>

        <Button className="float-end btn btn-primary mt-2" disabled type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
}
export function WizardForm() {
  const [step, setstep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
  });
  const nextStep = () => {
    setstep(step + 1);
  };
  const prevStep = () => {
    setstep(step - 1);
  };
  const handleInputData: any = (input: any) => (e: any) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };
  switch (step) {
    case 1:
      return (
        <div className="custom-margin">
          <Name nextStep={nextStep} handleFormData={handleInputData} values={formData} />
        </div>
      );
    default:
      return (
        <div className="custom-margin">
          <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
        </div>
      );
    case 3:
      return (
        <div className="">
          <div className="custom-margin">
            <Final values={formData} />
          </div>
        </div>
      );
  }
}

const Wizardhor = ({ step: currentIndex, ...props }: any) => {
  const steps: any = React.Children.toArray(props.children);
  const prevStep: any = currentIndex !== 0 && steps[currentIndex - 1].props;
  const nextStep: any = currentIndex !== steps.length - 1 && steps[currentIndex + 1].props;

  return (
    <div className="row border">
      <nav className=" steps col-sm-3 bordera">
        {steps.map((step: any, index: any) => (
          <Buttons
            key={step.props.number}
            onClick={() => props.onChange(index)}
            className={getClsNavBtns(index === currentIndex)}
            style={{ backgroundColor: '#FFB800' }}
          >
            <span className="number me-2">{step.props.number}</span>
            <i>{step.props.title}</i>
          </Buttons>
        ))}
      </nav>

      {steps[currentIndex]}
      <div className="col-sm-3 bordera"></div>
      <div className=" p-3 d-flex justify-content-between col-sm-9 ">
        <Buttons
          visible={prevStep}
          onClick={() => props.onChange(currentIndex - 1)}
          title={prevStep.description}
          style={{ backgroundColor: '#FFB800' }}
        >
          Back
        </Buttons>
        <Buttons
          visible={nextStep}
          onClick={() => props.onChange(currentIndex + 1)}
          title={nextStep.description}
          style={{ backgroundColor: '#FFB800' }}
        >
          Next
        </Buttons>
      </div>
    </div>
  );
};
const Steps = ({ children }: any) => children;

function getClsNavBtns(active: any) {
  return 'btn horwizard' + (active ? ' active' : '');
}
function Buttons({ visible, ...props }: any) {
  return <button className={visible ? 'btn  ' : 'invisible'} {...props} />;
}
const Drop = () => {
  //filepond
  const [files, setFiles] = useState<any>([]);

  const [selectedFiles] = useState([]);

  return (
    <React.Fragment>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server="/api"
        name="files"
        /* sets the file input name, it's filepond by default */ labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <div className="list-unstyled mb-0" id="file-previews">
        {selectedFiles.map((f: any, i: any) => {
          return (
            <Card
              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
              key={i + '-file'}
            >
              <div className="p-2">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <img
                      data-dz-thumbnail=""
                      height="80"
                      className="avatar-sm rounded bg-light"
                      alt={f.name}
                      src={f.preview}
                    />
                  </Col>
                  <Col>
                    <Link to="#" className="text-muted font-weight-bold">
                      {f.name}
                    </Link>
                    <p className="mb-0">
                      <strong>{f.formattedSize}</strong>
                    </p>
                  </Col>
                </Row>
              </div>
            </Card>
          );
        })}
      </div>
    </React.Fragment>
  );
};
const Drop1 = () => {
  const uploader = Uploader({
    // Get production API keys from Upload.io
    apiKey: 'free',
  });

  return (
    <>
      <UploadButton uploader={uploader} options={{ multi: true }} onComplete={(files) => console.log(files)}>
        {({ onClick }) => (
          <Form.Control
            className="file_input text-center"
            onClick={onClick}
            placeholder="click here and upload attachment"
          />
        )}
      </UploadButton>
    </>
  );
};

export class Vertical extends React.Component {
  state = { step: 0 };

  handleStep = (step: any) => {
    this.setState({ step });
  };

  render() {
    return (
      <Wizardhor step={this.state.step} onChange={this.handleStep}>
        <Steps title="Personal Information" number="1">
          <section className="card-body col-sm-9">
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control type="text" className="form-control" required placeholder="Name" />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control type="email" className="form-control" required placeholder="Email Address" />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label">Phone Number</Form.Label>
              <Form.Control type="number" className="form-control" required placeholder="Number" />
            </FormGroup>
            <FormGroup className="control-group form-group mb-2">
              <Form.Label className="form-label">Address</Form.Label>
              <Form.Control type="text" className="form-control" required placeholder="Address" />
            </FormGroup>
            <div className="mb-2 mt-4 drop">
              <Drop />
            </div>
            <div className="mb-0 drop1">
              <Drop1 />
            </div>
          </section>
        </Steps>

        <Steps title="Billing Information" number="2">
          <section className="card-body col-sm-9">
            <div className="table-responsive mg-t-20">
              <Table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Cart Subtotal</td>
                    <td className="text-end">$792.00</td>
                  </tr>
                  <tr>
                    <td>
                      <span>Totals</span>
                    </td>
                    <td className="text-end text-muted">
                      <span>$792.00</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Order Total</span>
                    </td>
                    <td>
                      <h2 className="price text-end mb-0">$792.00</h2>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </section>
        </Steps>
        <Steps title="Payment Details" number="3">
          <section className="card-body col-sm-9">
            <FormGroup className="form-group">
              <Form.Label className="form-label">CardHolder Name</Form.Label>
              <Form.Control type="text" className="form-control" id="name12" placeholder="First Name" />
            </FormGroup>
            <FormGroup className="form-group">
              <Form.Label className="form-label">Card number</Form.Label>
              <InputGroup className="input-group">
                <Form.Control type="text" className="form-control" placeholder="Search for..." />
                <span className="input-group-append">
                  <Button variant="" className="btn btn-secondary" type="button">
                    <i className="fab fa-cc-visa"></i> &nbsp; <i className="fab fa-cc-amex"></i> &nbsp;
                    <i className="fab fa-cc-mastercard"></i>
                  </Button>
                </span>
              </InputGroup>
            </FormGroup>
            <Row>
              <Col sm={8}>
                <FormGroup className="form-group mb-sm-0">
                  <Form.Label className="form-label">Expiration</Form.Label>
                  <InputGroup className="input-group">
                    <Form.Control type="number" className="form-control" placeholder="MM" name="expiremonth" />
                    <Form.Control type="number" className="form-control" placeholder="YY" name="expireyear" />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup className="form-group mb-0">
                  <Form.Label className="form-label">
                    CVV <i className="fa fa-question-circle"></i>
                  </Form.Label>
                  <Form.Control type="number" className="form-control" required />
                </FormGroup>
              </Col>
            </Row>
          </section>
        </Steps>
      </Wizardhor>
    );
  }
}

export {
  Basicwizard,
};
