import { useSession, signIn, signOut } from "next-auth/react"
import { Navbar, Container, Button} from "react-bootstrap"
import Image from "next/image"

const PageNavbar = () => {
  const { data: session } = useSession()

  return (
    <Navbar className="bg-body-tertiary px-5 main-navbar">
      <div>
        <Navbar.Brand href="/dashboard">Budget Tracker</Navbar.Brand>
      </div>
        {session ?
        <div id="login-signout" className="flex justify-between items-center">
          <Image
            src={session?.user?.image}
            alt={`${session?.user?.name}'s Image`}
            height={60}
            width={60}
            id="user-profile-pic"
            />
          <Button className="login-signout-button button" onClick={() => signOut({callbackUrl: '/'})}>Sign out</Button>
        </div>
        :
          <Button className="login-signout-button button" onClick={() => signIn('google', {callbackUrl: '/dashboard'})}>Log in / Sign in</Button>
        }
    </Navbar>
  )
}

export default PageNavbar
