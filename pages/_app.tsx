import { store } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    //Higher Order Component
  <Provider store ={store}>
    <Toaster/>
    <Component {...pageProps} />
  </Provider>
  )
}
