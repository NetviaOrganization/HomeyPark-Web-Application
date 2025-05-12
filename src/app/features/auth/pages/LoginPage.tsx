import AuthTemplate from '../template/AuthTemplate'
import Title from '@/shared/components/Title'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Link, useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { REQUIRED_INPUT_ERROR } from '@/messages/form'
import { GoogleReCaptchaCheckbox } from '@google-recaptcha/react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const defaultValues = {
  username: '',
  password: '',
  captcha: false,
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { control, handleSubmit, setValue } = useForm({ defaultValues })

  const onSubmit = async (data: typeof defaultValues) => {
    if (!data.captcha) return

    setLoading(true)
    try {
      login(data.username, data.password)
      navigate('/')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthTemplate>
      <Title level="h1">Inicia sesión</Title>
      <p className="mt-2">Ingresa a tu cuenta y empieza a reservas estacionamientos.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Username
            </label>
            <Controller
              name="username"
              rules={{
                required: { value: true, message: REQUIRED_INPUT_ERROR },
              }}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <InputText id="email" {...field} invalid={!!fieldState.error} />
                  {!!fieldState.error && (
                    <small id="email" className="text-red-500">
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-sm font-medium">
              Contraseña
            </label>
            <div className="flex w-full">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: { value: true, message: REQUIRED_INPUT_ERROR },
                }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2 w-full">
                    <Password
                      id="password"
                      feedback={false}
                      toggleMask
                      className="w-full"
                      inputClassName="w-full"
                      pt={{
                        root: { className: '*:w-full' },
                      }}
                      {...field}
                    />
                    {!!fieldState.error && (
                      <small id="password" className="text-red-500">
                        {fieldState.error.message}
                      </small>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="mt-2">
            <GoogleReCaptchaCheckbox
              size="normal"
              onChange={(token) => {
                setValue('captcha', !!token)
              }}
            />
          </div>
        </div>
        <div className="mt-8">
          <Button label="Iniciar sesión" loading={loading} type="submit" className="w-full" />
        </div>
        <div className="mt-4">
          <p className="text-center text-sm">
            ¿No tienes una cuenta?{' '}
            <Link to="/signup" className="text-[var(--primary-color)] underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </form>
    </AuthTemplate>
  )
}

export default LoginPage
