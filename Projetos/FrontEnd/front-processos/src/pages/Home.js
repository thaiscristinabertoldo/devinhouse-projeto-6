import * as React from 'react'
import { useCallback } from 'react'

import { useKeycloak } from '@react-keycloak/web'

import { useAxios } from '../utils/hooks'

import App from '../../App'

export default () => {
 
  const { keycloak } = useKeycloak();

  const axiosInstance = useAxios('http://localhost:8282/v1') // BACKEND 1 
 
  const callApi = useCallback(() => {
        !!axiosInstance.current && axiosInstance.current.get('/processos') 
      }, [axiosInstance])

  return (
    <div>
        
      {/* <div>Usuário está {!keycloak?.authenticated ? 'não está' : ''} autenticado</div>

      {!!keycloak?.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}

      <button type="button" onClick={callApi}>
        Aciona API Backend
      </button> */}
    </div>
  )
}