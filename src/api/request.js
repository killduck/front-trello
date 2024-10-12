import axios from 'axios'
import { URL_API, URL_ENDPOINT } from './config'
import { redirect, redirect_status404 } from './redirect'

export default function request(
  params = {
    method: 'GET', 
    url: '', 
    callback: '', 
    data: null, 
    status: 200, 
    content_type: 'text/html', 
    response_type: 'json' }
  ){

  let token = ''

  if (localStorage.getItem('trello_auth')) {
    token = 'Token ' + localStorage.getItem('trello_auth');
  }

  if (params.method === 'GET') {
    axios
      .get(URL_API + URL_ENDPOINT + `/` + params.url, {
        headers: {
          Authorization: token,
          "Content-Type": params.content_type,
        },
        responseType: params.response_type,
      })
      .then((response) => {
        if (response.status === params.status) {
          params.callback(response);
        }
      })
      .catch((error) => {
        console.error(error)
        try{
          if (error.response.status === 401 || error.response.status === 400) {
            console.log('Ошибка авторизации')
            redirect();
            return;
          }
        }
        catch(error){
          console.log('Ошибка', error)
        }
        redirect_status404();
      })
  }

  if (params.method === 'POST') {
    axios
      .post(URL_API + URL_ENDPOINT + `/` + params.url, params.data, {
        headers: {
          Authorization: token,
          "Content-Type": params.content_type,
        },
        responseType: params.response_type,
      })
      .then((response) => {
        if (response.status === params.status) {
          params.callback(response);
        }
      })
      .catch((error) => {
        console.error(error);
        try{
          if (error.response.status === 401 || error.response.status === 400) {
            console.log('Ошибка авторизации')
            redirect();
            return;
          }
        }
        catch(error){
          console.log('Ошибка', error)
        }
        // redirect_status404();
      })
  }
}
