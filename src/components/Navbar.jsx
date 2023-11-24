import { useSession, signIn, signOut } from "next-auth/react"
import { Navbar, Container, Button} from "react-bootstrap"
import Image from "next/image"
import Link from "next/link"

const PageNavbar = () => {
  const { data: session } = useSession()

  console.log(session?.user)

  return (
    <Navbar className="bg-body-tertiary px-5">
    <div>
        <Navbar.Brand href="#">Budget Tracker</Navbar.Brand>
    </div>
        {session ?
        <div id="login-signout" className="flex justify-between items-center">
          <Image
            src={session?.user?.image}
            alt={`${session?.user?.name}'s Image`}
            height={60}
            width={60}
            id="user-profile-pic"

            ></Image>
          <Button className="login-signout-button" onClick={() => signOut({callbackUrl: '/'})}>Sign out</Button>
        </div>
        :
          <Button className="login-signout-button" onClick={() => signIn('google', {callbackUrl: '/dashboard'})}>Log in / Sign in</Button>
        }
    </Navbar>
  )
}

export default PageNavbar
