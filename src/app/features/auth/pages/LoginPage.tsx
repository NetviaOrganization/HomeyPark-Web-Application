import { FormEvent, useState } from 'react'
import AuthTemplate from '../template/AuthTemplate'
import Title from '@/app/shared/components/Title'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Link } from 'react-router'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    console.log('email', email)
    console.log('password', password)
  }

  return (
    <AuthTemplate>
      <Title level="h1">Inicia sesión</Title>
      <p className="mt-2">
        Ingresa a tu cuenta y empieza a reservas estacionamientos.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Contraseña</label>

            <div className="flex justify-center w-full">
              <Password
                feedback={false}
                toggleMask
                id="password"
                className="w-full"
                inputClassName="w-full"
                pt={{
                  root: { className: '*:w-full' },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button label="Iniciar sesión" type="submit" className="w-full" />
        </div>
        <div className="mt-4">
          <p className="text-center">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/signup"
              className="text-[var(--primary-color)] underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </form>
    </AuthTemplate>
  )
}

export default LoginPage
