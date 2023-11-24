import Button from "react-bootstrap/Button"
import {signIn} from "next-auth/react"
import stonk from '../../public/images/stonk.png'
import Image from "next/image"

function MainPage() {

return (
  <main id="main-page" className="flex">
    <section id="topics-button" className="flex flex-col items-center">
      <div id="topics">
        <h1 className="text-center topic">Track your income and expense.</h1>
        <h1 className="text-center topic">Be responsible to your spending</h1>
      </div>
      <Button id="login-button" onClick={() => {signIn('google',{callbackUrl:'/dashboard'})}}>Log in / Sign up</Button>
    </section>
    <section id="image-section" className="centering">
      <Image
        src={stonk}
        alt="stonk"
        width={680}
        height={510}
        className="rounded-md"
      >
      </Image>
    </section>
  </main>
)
}
export default MainPage
