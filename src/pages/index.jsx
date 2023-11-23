import Button from "react-bootstrap/Button"
import { useSession, signIn, signOut } from "next-auth/react"

function MainPage() {
  const { data: session } = useSession()

return (
  <div id="main-page" className="centering">
    <h2 className="text-center">Welcome Back</h2>
  </div>
)
}
export default MainPage
