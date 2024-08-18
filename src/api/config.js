export let host_name = window.location.hostname

// Условия прописаны для удобства деплоя, что бы URL-ы не переписывать на реальные хосты сервера
export const URL_API =
  host_name === 'top-python31.ru' || host_name === '147.45.185.171'
    ? 'https://147.45.185.171/'
    : 'http://127.0.0.1:8000/'

export const URL_PUBLIC =
  host_name === 'top-python31.ru' || host_name === '147.45.185.171'
    ? 'https://top-python31.ru/'
    : 'http://127.0.0.1:3000/'

export const URL_ENDPOINT = 'api/'
