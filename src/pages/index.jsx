import Button from "react-bootstrap/Button"
import {signIn} from "next-auth/react"
import budget from '../../public/images/budget.png'

import Image from "next/image"
import { useSession } from "next-auth/react"
import FadeIn from "react-fade-in/lib/FadeIn"
import Link from "next/link"


function MainPage({text}) {

  console.log(text)

  const {data : session} = useSession()

  return (
    <main id="front-main-page" className="flex items-center flex-col w-full">
      <section id="topics-button">
        <div id="upper-topic-section">
          <div id="topics" className="my-12">
            <h1 className="topic text-center">Budget Tracker</h1>
            <h2>Start tracking your budget today</h2>
          </div>
          <div className="text-center mb-10">
            {session ?
            <Link href="/dashboard"><Button id="login-button" className="button main-page-buttons">To Dashboard</Button></Link>
            :
            <Button id="login-button" className="button main-page-buttons" onClick={() => {signIn('google',{callbackUrl:'/dashboard'})}}>Log in / Sign up</Button>
            }
          </div>
        </div>
      </section>
      <>
        <Image
          src={budget}
          alt="budget"
          id="main-page-pic"
        />
      </>
    </main>
  )
}
export default MainPage
