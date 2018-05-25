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

export const saveCoordinates = (params) => {
  return fetch('/api/matchdetails/coordinates', {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(params)
  });
}

export const saveSliderValue = (params) => {
  return fetch('/api/matchdetails/slidervalue', {
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

export const getUserDetails = () => {
  return fetch('/api/matchdetails/userdetails', {
    headers: {
      'Authorization': `bearer ${Auth.getToken()}`
    },
  });
}





