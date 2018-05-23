import Auth from '../../services/auth';

export const saveBetAmount = (params) => {
  return fetch('/api/matchdetails', {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(params)
  });
}

export const saveImage = (params) => {
  return fetch('/api/matchdetails/image', {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(params)
  });
}

export const getPlayers = () => {
  return fetch('/api/matchdetails', {
    headers: {
      'Authorization': `bearer ${Auth.getToken()}`
    },
  });
}





