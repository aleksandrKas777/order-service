import { Button, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
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
  
  const { login } = useAuth()
  
  const onsubmit = (data) => {
    login({data})
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
