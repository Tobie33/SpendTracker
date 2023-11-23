import '../css/global.scss';
import { SessionProvider } from "next-auth/react"
import PageNavbar from '../components/Navbar';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <PageNavbar/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
