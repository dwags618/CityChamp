export const saveBetAmount = (params) => {
  return fetch('/auth/save', {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(params)
  });
}





