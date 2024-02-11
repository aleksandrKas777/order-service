import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs.jsx";
import { Button, Card } from "react-bootstrap";
import { InputControl } from "@/components/inputs/InputControl.jsx";
import { useForm, FormProvider } from "react-hook-form";

const breadcrumbs = [
  { title: 'Заказы', link: '/orders' },
  { title: 'Добавление' },
]

export const OrderAdd = () => {
  
  const form = useForm({
    defaultValues: {
      status: 'new',
      price: '',
      name: '',
      surname: '',
      additional_info: '',
      address: '',
      phone: ''
    }
  })
  
  return (
    <FormProvider {...form}>
      <div className={'d-flex justify-content-between align-items-center'}>
        <Breadcrumbs crumbs={breadcrumbs}/>
        <Button variant={'success'}>Добавить</Button>
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
  
        <InputControl
          name={'price'}
          placeholder={'Цена'}
          label={'Цена*'}/>
      </Card>
    </FormProvider>
  )
}
