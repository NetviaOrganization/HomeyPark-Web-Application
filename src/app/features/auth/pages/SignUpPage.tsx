import { useForm, Controller } from 'react-hook-form'
import Title from '@/app/shared/components/Title'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Link } from 'react-router'
import AuthTemplate from '../template/AuthTemplate'
import { REQUIRED_INPUT_ERROR } from '@/messages/form'
import { GoogleReCaptchaCheckbox } from '@google-recaptcha/react'

const SignUpPage = () => {
  const defaultValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    captcha: false,
  }

  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
    shouldFocusError: true,
  })

  const onSubmit = (data: typeof defaultValues) => {
    if (!data.captcha) return

    console.log('DATA', data)
  }

  return (
    <AuthTemplate>
      <Title level="h1">Crear una cuenta nueva</Title>
      <p className="mt-2">
        Tu vehículo seguro, tu espacio garantizado: Encuentra el lugar perfecto
        para estacionar.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
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
                  <InputText
                    id="email"
                    {...field}
                    invalid={!!fieldState.error}
                  />
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
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="firstName">Nombres</label>
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

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">Apellidos</label>
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
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">Contraseña</label>
              <div className="flex justify-center w-full">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: { value: true, message: REQUIRED_INPUT_ERROR },
                  }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-2">
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

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">Repetir contraseña</label>
              <div className="flex justify-center w-full">
                <Controller
                  name="repeatPassword"
                  rules={{
                    required: { value: true, message: REQUIRED_INPUT_ERROR },
                  }}
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-2">
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

          <GoogleReCaptchaCheckbox
            size="normal"
            onChange={(token) => {
              setValue('captcha', !!token)
            }}
          />
        </div>

        <div className="mt-8">
          <Button label="Crear cuenta" type="submit" className="w-full" />
        </div>
        <div className="mt-4">
          <p className="text-center">
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
