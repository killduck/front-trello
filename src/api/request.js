import axios from 'axios'
import { URL_API, URL_ENDPOINT } from './config'
import redirect from './redirect'

export default function request(
  params = { method: 'GET', url: '', callback: '', data: null, status: 200 }
) {
  let token = ''

  if (localStorage.getItem('trello_auth')) {
    token = 'Token ' + localStorage.getItem('trello_auth')
  }

  // console.log('request>>>', window.location.hostname) // TODO Удалить. Тест для деплоя

  if (params.method === 'GET') {
    axios
      .get(URL_API + URL_ENDPOINT + params.url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status === params.status) {
          params.callback(response)
        }
      })
      .catch((error) => {
        redirect()
        console.error(error)
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
          params.callback(response)
        }
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   console.log('Ошибка авторизации')
        // }

        redirect()
        console.error(error)
      })
  }
}
