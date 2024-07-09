import { useState } from 'react';
import { newGetManagers as getManagersApi} from '../../../utils/api';

import { useAsync } from '@/hooks/api/useFetch';
export const useGetManagers = () => {
  const _async = useAsync();
  const [managers, setManagers] = useState<any>(false);
  
  const getManagers = async (): Promise<any[]> => {
    const data = await _async.fetchCallBack(async () => {
      const response = await getManagersApi();
      return response;
    });

    const _managers: any = {
      "superAdmins" : [],
      "supervisor": [],
      "Managers": [],
      "relationShipManagers": []
    };

    const prepareManager = async (data : object ) => {    
      const $keys = Object.keys(data);
        
        if($keys[0] == 'superAdmins') {

          _managers.superAdmins = [..._managers.superAdmins, ...data["superAdmins"]]; 
        }

        if($keys[0] == 'Supervisor') {

          _managers.supervisor = [..._managers.supervisor, data["Supervisor"]];
        }
  
        if($keys[0] == 'supervisor') {

          _managers.supervisor = [..._managers.supervisor, data["supervisor"]];
        }
  
        if( ['manager','Manager'].includes($keys[0]) ) {

          _managers.Managers = [..._managers.Managers, data[$keys[0]]];
          _managers.relationShipManagers = [ ..._managers.relationShipManagers, ...data[$keys[1]] ];
          return;
        }

        const newDatas = data[$keys[1]];
        for(let i = 0; i < newDatas.length; i++) {
          prepareManager(newDatas[i]);
        }
    };
    
    prepareManager(data);
    setManagers(_managers);

    return _managers;

  };

  return {
    ..._async,
    data: managers,
    getManagers,
  };
};
