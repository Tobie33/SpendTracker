import Button from "react-bootstrap/Button"
import {signIn} from "next-auth/react"
import stonk from '../../public/images/stonk.png'
import notStonk from '../../public/images/notStonk.png'

import Image from "next/image"
import { useSession } from "next-auth/react"
import FadeIn from "react-fade-in/lib/FadeIn"
import Link from "next/link"


function MainPage({text}) {

  console.log(text)

  const {data : session} = useSession()

  return (
    <main id="main-page" className="flex justify-center">
      <section id="topics-button" className="">
        <div id="upper-topic-section" className="h-3/6">
          <div id="topics" className="my-12">
            <h1 className="topic text-center">Start Tracking your budget today</h1>
            <h1 className="topic text-center">Be a responsible Spender</h1>
          </div>
          <div className="text-center">
            {session ?
            <Link href="/dashboard"><Button id="login-button" className="button main-page-buttons">To Dashboard</Button></Link>
            :
            <Button id="login-button" className="button main-page-buttons" onClick={() => {signIn('google',{callbackUrl:'/dashboard'})}}>Log in / Sign up</Button>
            }
          </div>
        </div>
        <div className="h-3/6">
          <div id="topics" className="my-12">
            <h1 className="topic text-center">Want to Learn more about Finance?</h1>
            <h1 className="topic text-center">Go to IFEC to learn more</h1>
          </div>
          <div className="text-center">
            <Link href="https://www.ifec.org.hk/web/en/index.page"><Button id="ifec-button" className="button main-page-buttons">To IFEC</Button></Link>
          </div>
        </div>
      </section>
      <section id="image-section" className="flex flex-col">
        <section className="flex justify-end items-center">
          <FadeIn>
          <h1 className="text-center topic my-3">Be like this</h1>
            <Image
              src={stonk}
              alt="Stonk"
              width={680}
              height={510}
              className="rounded-md main-page-pics "
            />
          </FadeIn>
        </section>
        <section className="flex justify-end items-center">
          <FadeIn>
          <h1 className="text-center topic my-3">Not like this</h1>
            <Image
              src={notStonk}
              alt="Not Stonk"
              width={680}
              height={510}
              className="rounded-md main-page-pics"
            />
          </FadeIn>
        </section>
      </section>
    </main>
  )
}
export default MainPage
