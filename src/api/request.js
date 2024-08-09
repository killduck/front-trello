import axios from 'axios'
import { URL_API, URL_ENDPOINT } from './config'
import { redirect, redirect_status404 } from './redirect'

export default function request(
  params = { method: 'GET', url: '', callback: '', data: null, status: 200 }
) {
  let token = ''

  if (localStorage.getItem('trello_auth')) {
    token = 'Token ' + localStorage.getItem('trello_auth');
  }

  if (params.method === 'GET') {
    axios
      .get(URL_API + URL_ENDPOINT + params.url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status === params.status) {
          params.callback(response);
        }
      })
      .catch((error) => {
        console.error(error)

        if (error.response.status === 401 || error.response.status === 400) {
          console.log('Ошибка авторизации')
          // redirect();
          return;
        }

        // redirect_status404();
      })
  }

  if (params.method === 'POST') {
    axios
      .post(URL_API + URL_ENDPOINT + params.url, params.data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status === params.status) {
          params.callback(response);
        }
      })
      .catch((error) => {
        console.error(error);

        if (error.response.status === 401 || error.response.status === 400) {
          console.log('Ошибка авторизации')
          // redirect();
          return;
        }

        // redirect_status404();
      })
  }
}
