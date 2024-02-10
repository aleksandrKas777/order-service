import { useState } from "react";
import { Button, Card, FormLabel } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import FormCheckInput from 'react-bootstrap/FormCheckInput'
import { InputNoControl } from "@/components/inputs/InputNoControl.jsx";
import { useAuth } from "@/auth/AuthProvider.jsx";

const fieldsNames = {
  email: 'email',
  password: 'password',
}
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isRememberMe, setIsRememberMe] = useState(false)
  
  const { login } = useAuth()
  
  const onsubmit = (data) => {
    login({ data, isRememberMe })
  }
  return (
    <div className={'d-flex justify-content-center align-items-center vh-100'}>
      <Card className={'border-0 p-5 w-100'} style={{ maxWidth: '600px' }}>
        
        <h4 className={'fw-bold'}>Order Service</h4>
        
        <h5 className={'mb-3 fw-medium'}>
          Вход
        </h5>
        <InputNoControl
          label={'Email'}
          register={register}
          name={fieldsNames.email}
          placeholder={'Введите email'}
          className={'mb-2'}
        />
        <InputNoControl
          label={'Пароль'}
          register={register}
          name={fieldsNames.password}
          placeholder={'Введите Пароль'}
          className={'mb-1'}
        />
        <p className={'text-danger text-start fs-6'}>
          {errors[fieldsNames.email] || errors[fieldsNames.password]
            ? 'Неверный логин или пароль'
            : ' '}
        </p>
        <FormLabel
          className={
            'text-start mb-4 align-self-start d-flex align-items-center'
          }
        >
          <FormCheckInput
            color={'success'}
            className={'me-2 fs-5'}
            defaultChecked={false}
            onChange={(e) => setIsRememberMe(e.target.checked)}
          />
          Запомнить меня
        </FormLabel>
        <Button
          variant={'success'}
          className={'text-white'}
          onClick={handleSubmit(onsubmit)}
        >
          Войти
        </Button>
      </Card>
    </div>
  )
}
