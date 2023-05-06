import { useState } from "react"
import { clientSupabase } from '../supabase/client'

function Login() {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await clientSupabase.auth.signInWithOtp({
        email: email,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="youremail@site.com" onChange={(e) => setEmail(e.target.value)} />
      <button>Send</button>
    </form>
  )
}

export default Login