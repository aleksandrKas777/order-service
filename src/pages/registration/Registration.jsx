import { Button, Card } from "react-bootstrap";
import { InputNoControl } from "@/components/inputs/InputNoControl.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registrationApi } from "@/api/api.js";
import { toast } from "react-toastify";

const fieldsNames = {
  email: 'email',
  password: 'password',
}

export const Registration = () => {
  
  const {
    register,
    handleSubmit,
  } = useForm()
  const navigate = useNavigate()
  
  const onSubmit = (data) => {
    registrationApi({ email: data.email, username: data.username, password: data.password })
      .then(() => {
        toast.success('Вы успешно зарегистрировались')
        navigate('/login')
      })
      .catch(() => {
        toast.error('Произошла ошибка')
      })
  }
  
  
  return (
    <div className={'d-flex justify-content-center align-items-center vh-100'}>
      <Card className={'border-0 p-5 w-100'} style={{ maxWidth: '600px' }}>
        
        <h4 className={'fw-bold'}>Order Service</h4>
        
        <h5 className={'mb-3 fw-medium'}>
          Регистрация
        </h5>
        <InputNoControl
          label={'Email'}
          register={register}
          name={fieldsNames.email}
          placeholder={'Введите email'}
          className={'mb-2'}
        />
        <InputNoControl
          label={'Имя'}
          register={register}
          name={'username'}
          placeholder={'Введите имя'}
          className={'mb-2'}
        />
        <InputNoControl
          label={'Пароль'}
          register={register}
          name={fieldsNames.password}
          placeholder={'Введите Пароль'}
          className={'mb-1'}
        />
        {/*<InputNoControl*/}
        {/*  label={'Пароль'}*/}
        {/*  register={register}*/}
        {/*  name={'passwordRepeat'}*/}
        {/*  placeholder={'Повторите Пароль'}*/}
        {/*  className={'mb-1'}*/}
        {/*/>*/}
        <Link to={'/login'} className={'text-success text-end mb-2'}>Вход</Link>
        <Button
          variant={'success'}
          className={'text-white'}
          onClick={handleSubmit(onSubmit)}
        >
          Зарегистрироваться
        </Button>
      </Card>
    </div>
  )
}
