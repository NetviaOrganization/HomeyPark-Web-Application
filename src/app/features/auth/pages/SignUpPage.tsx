import { useForm, Controller } from 'react-hook-form'
import Title from '@/shared/components/Title'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Link, useNavigate } from 'react-router'
import AuthTemplate from '../template/AuthTemplate'
import { REQUIRED_INPUT_ERROR } from '@/messages/form'
import { GoogleReCaptchaCheckbox } from '@google-recaptcha/react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { UserAlreadyExistsError } from '../errors/emailAlreadyExistsError'
import { Nullable } from 'primereact/ts-helpers'
import { Checkbox } from 'primereact/checkbox'

const defaultValues = {
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  repeatPassword: '',
  termsAndConditions: false,
  captcha: false,
}

const SignUpPage = () => {
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<Nullable<string>>(null)

  const { signUp } = useAuth()
  const navigate = useNavigate()
  const { control, handleSubmit, setValue, setError } = useForm({
    defaultValues,
    shouldFocusError: true,
  })

  const onSubmit = async ({
    email,
    username,
    firstName,
    lastName,
    password,
    captcha,
  }: typeof defaultValues) => {
    if (!captcha) return

    setSubmitError(null)

    setLoading(true)
    try {
      await signUp(email, username, password, firstName, lastName)

      navigate('/')
    } catch (err) {
      console.error(err)
      if (err instanceof UserAlreadyExistsError) {
        setError('username', { type: 'custom', message: 'El usuario ya se encuentra registrado' })
        console.error('Email or username already exists')
        return
      }
      setSubmitError('Internal server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthTemplate>
      <Title level="h1">Crear una cuenta nueva</Title>
      <p className="mt-2">
        Tu vehículo seguro, tu espacio garantizado: Encuentra el lugar perfecto para estacionar.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Controller
              name="email"
              rules={{
                required: { value: true, message: REQUIRED_INPUT_ERROR },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'El email no es válido',
                },
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

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Username
            </label>
            <Controller
              name="username"
              rules={{
                required: { value: true, message: REQUIRED_INPUT_ERROR },
                // pattern: {
                // value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                // message: 'El email no es válido',
                // },
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

          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="firstName" className="text-sm font-medium">
                Nombres
              </label>
              <Controller
                name="firstName"
                rules={{
                  required: { value: true, message: REQUIRED_INPUT_ERROR },
                }}
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <InputText
                      id="firstName"
                      className="w-full"
                      {...field}
                      invalid={!!fieldState.error}
                    />
                    {!!fieldState.error && (
                      <small id="firstName" className="text-red-500">
                        {fieldState.error.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email" className="text-sm font-medium">
                Apellidos
              </label>
              <Controller
                name="lastName"
                rules={{
                  required: { value: true, message: REQUIRED_INPUT_ERROR },
                }}
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <InputText
                      id="lastName"
                      className="w-full"
                      {...field}
                      invalid={!!fieldState.error}
                    />
                    {!!fieldState.error && (
                      <small id="lastName" className="text-red-500">
                        {fieldState.error.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="flex gap-4 w-full">
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
                    <div className="flex flex-col gap-1 w-full">
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

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email" className="text-sm font-medium">
                Repetir contraseña
              </label>
              <div className="flex justify-center w-full">
                <Controller
                  name="repeatPassword"
                  rules={{
                    required: { value: true, message: REQUIRED_INPUT_ERROR },
                  }}
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1 w-full">
                      <Password
                        id="repeatPassword"
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
                        <small id="repeatPassword" className="text-red-500">
                          {fieldState.error.message}
                        </small>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col ">
              <Controller
                name="termsAndConditions"
                control={control}
                rules={{
                  required: { value: true, message: 'Debes aceptar los términos y condiciones' },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <div>
                      <Checkbox
                        inputId="termsAndConditions"
                        {...field}
                        onChange={(e) => field.onChange(e.checked)}
                        checked={field.value}
                        invalid={!!fieldState.error}
                      />
                      <label htmlFor="termsAndConditions" className="ml-2">
                        He leído y acepto los{' '}
                        <a
                          href="https://homey-park-experiments.web.app/terms-conditions"
                          target="_blank"
                          className="text-[#10b981] hover:underline cursor-pointer"
                        >
                          términos y condiciones
                        </a>
                      </label>
                    </div>
                    {!!fieldState.error && (
                      <small id="termsAndConditions" className="text-red-500">
                        {fieldState.error.message}
                      </small>
                    )}
                  </>
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
          <Button loading={loading} label="Crear cuenta" type="submit" className="w-full" />
          {submitError && (
            <small id="email" className="text-red-500">
              {submitError}
            </small>
          )}
        </div>
        <div className="mt-4">
          <p className="text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-[var(--primary-color)] underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </AuthTemplate>
  )
}

export default SignUpPage
