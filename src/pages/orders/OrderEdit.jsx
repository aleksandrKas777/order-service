import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { getCouriers, getOrder, patchOrder } from "@/api/api.js";
import { toast } from "react-toastify";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs.jsx";
import { Button, Card } from "react-bootstrap";
import { InputControl } from "@/components/inputs/InputControl.jsx";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { SelectControl } from "@/components/inputs/SelectControl.jsx";
import { ROLES } from "@/constants/roles.js";

const breadcrumbs = [
  { title: 'Заказы', link: '/orders' },
  { title: 'Редактирование' },
]

export const statuses = [
  { id: 'new', title: 'Новый' },
  { id: 'in_progress', title: 'В процессе' },
  { id: 'finished', title: 'Завершенный' },
]

export const OrderEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const role = JSON.parse(localStorage.getItem('role'))
  const { data: dataOrder } = useQuery(['order', id], () => getOrder(id))
  const { data: couriers = [] } = useQuery(['couriers'], getCouriers,
    // { enabled: role === ROLES.USER }
  )
  
  const defaultValues = {
    // price: dataOrder?.price || '',
    name: dataOrder?.name || '',
    surname: dataOrder?.surname || '',
    additional_info: dataOrder?.additional_info || '',
    address: dataOrder?.address || '',
    phone: dataOrder?.phone || '',
    status: dataOrder ? statuses.find(item => item.id === dataOrder.status) : null,
    courier: dataOrder ? couriers.find(item => item.id === dataOrder.courier) : null,
  }
  
  const form = useForm({ defaultValues })
  
  useEffect(() => {
    form.reset(defaultValues)
  }, [dataOrder, couriers])
  
  const onSubmit = (data) => {
    const dataSubmit = {}
    for (const key in form.formState.dirtyFields) {
      if (key in data) {
        dataSubmit[key] = data[key]
      }
    }
    if (dataSubmit.courier) dataSubmit.courier = dataSubmit.courier.id
    if (dataSubmit.status) dataSubmit.status = dataSubmit.status.id
    
    patchOrder({ id, data: dataSubmit })
      .then(() => {
        toast.success('Заказ успешно изменен')
        navigate(`/orders/${id}`)
      })
      .catch(() => toast.error('Не удалось изменить заказ'))
  }
  return (
    <FormProvider {...form}>
      <div className={'d-flex justify-content-between align-items-center mb-2'}>
        <Breadcrumbs crumbs={breadcrumbs}/>
        <Button variant={'success'} disabled={!form.formState.isDirty}
                onClick={form.handleSubmit(onSubmit)}>Сохранить</Button>
      </div>
      <Card className={'d-flex flex-column gap-3 p-3 border-0'}>
        <InputControl
          disabled={role !== ROLES.USER}
          name={'name'}
          placeholder={'Имя'}
          label={'Имя*'}/>
        
        <InputControl
          disabled={role !== ROLES.USER}
          name={'surname'}
          placeholder={'Фамилия'}
          label={'Фамилия*'}/>
        
        <InputControl
          disabled={role !== ROLES.USER}
          name={'phone'}
          placeholder={'Телефон'}
          label={'Телефон*'}/>
        
        <InputControl
          disabled={role !== ROLES.USER}
          name={'address'}
          placeholder={'Адрес'}
          label={'Адрес*'}/>
        
        <InputControl
          disabled={role !== ROLES.USER}
          name={'additional_info'}
          placeholder={'Дополнительная информация'}
          label={'Дополнительная информация*'}/>
        
        <>
          <SelectControl
            isDisabled={role !== ROLES.MANAGER}
            optionLabel={'username'}
            options={couriers}
            name={'courier'}
            label={'Курьер*'}
            placeholder={'Курьер'}
          />
          
          <SelectControl
            isDisabled={role === ROLES.USER}
            optionLabel={'title'}
            options={statuses}
            name={'status'}
            label={'Статус*'}
            placeholder={'Статус'}
          />
        </>
        
        
        {/*<InputControl*/}
        {/*  name={'price'}*/}
        {/*  placeholder={'Цена'}*/}
        {/*  label={'Цена*'}/>*/}
      </Card>
    </FormProvider>
  )
}
