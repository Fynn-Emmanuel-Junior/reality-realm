import { useState } from "react";
import { loadFormData } from "../components/formData";
import { signUpManager, getManagers, UpdateManager } from '../utils/api';
import { setManagers, removeManagerById } from "../redux/features/superAdmins/managersSlice";
import { setState } from "../redux/features/editManager/editManagerSlice";
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';

export const useManager = () => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const formData = await loadFormData('manager_data');

      if (!formData) throw new Error('Form data not found');

      const { phonenumber, password, firstname, surname, role } = formData;

      const response = await signUpManager({
        firstname: firstname,
        surname: surname,
        password: password,
        role: role,
        phoneNumber: phonenumber
      });

      const jsonData = await response.json();
      
      if (jsonData.statusCode == 201) {
        setSuccess(true);
        setMessage('');
      }
      if (jsonData.statusCode == 400) {
        setSuccess(false);
        jsonData.error.message.forEach((error: any) => (
          setMessage(error.error)
        ));
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setSuccess(false);
        setError(err.message);
        setMessage(err.message);
      } else {
        setSuccess(false);
        setError('An unknown error occurred');
        setMessage('An unknown error occurred');
      }
    }
  };

  const getAllManagers = async () => {
    setLoading(true);
    try {
      const managers: any = await getManagers();
      const managersResponse = await managers?.json();
                             
      if (managersResponse.statusCode === 200) {
        let combinedData: any = [];
        let managers: any = [];

        managersResponse.data.SuperManagers.forEach((superManager: any) => {

          // Extract supervisor
          combinedData.push(superManager.supervisor);
          managers.push(superManager.managerAndRelatedRMs);
        });

        //  Extract managers 
        managers.forEach((managerItem: any) => {
          managerItem.forEach((manager: any) => {
            combinedData.push(manager.manager);
          });
        });

        //  Extract relationship managers
        managers.forEach((managerItem: any) => {
          managerItem.forEach((manager: any) => {
            manager.relationShipManagers.forEach((rm: any) => {
              combinedData.push(rm);
            });
          });
        });

        dispatch(setManagers(combinedData));

        combinedData = [];
        managers = [];

      } else {
        setLoading(false);
        throw new Error('Cannot get supervisors');
      }
    } catch (err: unknown) {
      setLoading(false);
      throw new Error('Failed to fetch');
    }
  };

  const GetManagers = async () => {
    setLoading(true);
    try {
      const managers: any = await getManagers();
      const managersResponse = await managers.json();
                             
      if (managersResponse.statusCode == 200) {
        let Managers: any = [];
        
        //Extract managers
        managersResponse.data.ManagerRMs.forEach((manager: any) => {
          Managers.push(manager.Manager);
        });

        dispatch(setManagers(Managers));

        Managers = [];

      } else {
        setLoading(false);
        throw new Error('Cannot get managers');
      }
    } catch (err: unknown) {
      setLoading(false);
      throw new Error('Failed to fetch');
    }
  };

  const GetRMManagers = async () => {
    setLoading(true);
    try {
      const managers: any = await getManagers();
      const managersResponse = await managers.json();
                             
      if (managersResponse.statusCode === 200) {
        let RMManagers: any = [];

        //Extract relationship managers
        managersResponse.data.RMManagers.forEach((rm: any) => {
            RMManagers.push(rm);
        });
        dispatch(setManagers(RMManagers));

        RMManagers = [];
        setLoading(false);

      } else {
        setLoading(false);
        throw new Error('Cannot get managers');
      }
    } catch (err: unknown) {
      setLoading(false);
      throw new Error('Failed to fetch');
    }
  };

  const EditManager = async (data: any) => {
    try {
      const response: any = await UpdateManager(data);
      const editManagerResponse = await response.json();

      if (editManagerResponse.statusCode == 201) {
        dispatch(removeManagerById(data.managerID));
        navigate('/admins');
      }
    } catch (err: unknown) {
      dispatch(setState(false));
      throw new Error('Failed to fetch');
    }
  };

  return {
    signup,
    error,
    message,
    success,
    getAllManagers,
    GetManagers,
    GetRMManagers,
    EditManager,
    loading
  };
};
