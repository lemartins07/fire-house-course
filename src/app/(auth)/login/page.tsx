import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import GoogleLoginButton from '@/components/ui/google-login-button'

export default function Login() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <GoogleLoginButton />
        </CardContent>
      </Card>
    </>
  )
}
