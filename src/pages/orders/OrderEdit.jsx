import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { createOrder, getOrder, patchOrder } from "@/api/api.js";
import { toast } from "react-toastify";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs.jsx";
import { Button, Card } from "react-bootstrap";
import { InputControl } from "@/components/inputs/InputControl.jsx";
import { useQuery } from "react-query";
import { useEffect } from "react";

const breadcrumbs = [
  { title: 'Заказы', link: '/orders' },
  { title: 'Редактирование' },
]

export const OrderEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const { data: dataOrder } = useQuery(['order', id], () => getOrder(id))
  
  const defaultValues = {
    // price: dataOrder?.price || '',
    name: dataOrder?.name || '',
    surname: dataOrder?.surname || '',
    additional_info: dataOrder?.additional_info || '',
    address: dataOrder?.address || '',
    phone: dataOrder?.phone || ''
  }
  
  const form = useForm({ defaultValues })
  
  useEffect(() => {
    form.reset(defaultValues)
  }, [dataOrder])
  
  const onSubmit = (data) => {
    const dataSubmit = {}
    for (const key in form.formState.dirtyFields) {
      if (key in data) {
        dataSubmit[key] = data[key]
      }
    }
    
    patchOrder({id,  data: dataSubmit })
      .then(() => {
        toast.success('Заказ успешно изменен')
        navigate(`/orders/${id}`)
      })
      .catch(() => toast.error('Не удалось изменить заказ'))
  }
  
  return (
    <FormProvider {...form}>
      <div className={'d-flex justify-content-between align-items-center'}>
        <Breadcrumbs crumbs={breadcrumbs}/>
        <Button variant={'success'} onClick={form.handleSubmit(onSubmit)}>Сохранить</Button>
      </div>
      <Card className={'d-flex flex-column gap-3 p-3 border-0'}>
        <InputControl
          name={'name'}
          placeholder={'Имя'}
          label={'Имя*'}/>
        
        <InputControl
          name={'surname'}
          placeholder={'Фамилия'}
          label={'Фамилия*'}/>
        
        <InputControl
          name={'phone'}
          placeholder={'Телефон'}
          label={'Телефон*'}/>
        
        <InputControl
          name={'address'}
          placeholder={'Адрес'}
          label={'Адрес*'}/>
        
        <InputControl
          name={'additional_info'}
          placeholder={'Дополнительная информация'}
          label={'Дополнительная информация*'}/>
        
        {/*<InputControl*/}
        {/*  name={'price'}*/}
        {/*  placeholder={'Цена'}*/}
        {/*  label={'Цена*'}/>*/}
      </Card>
    </FormProvider>
  )
}
