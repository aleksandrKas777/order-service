import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs.jsx";
import { Button, Card, FormLabel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCouriers, getOrder, patchOrder } from "@/api/api.js";
import { statuses } from "@/pages/orders/OrderEdit.jsx";
import { ROLES } from "@/constants/roles.js";
import { toast } from "react-toastify";

const breadcrumbs = [
  { title: 'Заказы', link: '/orders' },
  { title: 'Инфо' },
]

export const OrderInfo = () => {
  const { id } = useParams()
  const { data: orderData } = useQuery(['order', id], () => getOrder(id))
  const role = JSON.parse(localStorage.getItem('role'))
  const navigate = useNavigate()
  const { data: couriers = [] } = useQuery(['couriers'], getCouriers,
  )
  
  const completeOrder = () => {
    patchOrder({ id, data: { status: 'finished' } })
      .then(() => {
        toast.success('Заказ успешно завершен')
        navigate('/orders')
      })
      .catch(() => toast.errors('Не удалось завершить заказ'))
  }
  
  return (
    <>
      <div className={'d-flex justify-content-between align-items-center'}>
        <Breadcrumbs crumbs={breadcrumbs}/>
        {role !== ROLES.COURIER && orderData?.status !== 'finished' &&
          <Button as={Link} to={`/orders/${id}/edit`} variant={'success'}>Редактировать</Button>}
        {role === ROLES.COURIER && orderData?.status !== 'finished' &&
          <Button type={'button'} onClick={completeOrder} variant={'success'}>Завершить заказ</Button>}
      </div>
      <Card className={'d-flex flex-column gap-2 p-3 border-0'}>
        <FormLabel className={'fw-bolder'}>
          Имя
          <p className={'fw-normal'}>{orderData?.name || '-'}</p>
        </FormLabel>
        <FormLabel className={'fw-bolder'}>
          Фамилия
          <p className={'fw-normal'}>{orderData?.surname || '-'}</p>
        </FormLabel>
        <FormLabel className={'fw-bolder'}>
          Адрес
          <p className={'fw-normal'}>{orderData?.address || '-'}</p>
        </FormLabel>
        <FormLabel className={'fw-bolder'}>
          Дополнительная информация
          <p className={'fw-normal'}>{orderData?.additional_info || '-'}</p>
        </FormLabel>
        <FormLabel className={'fw-bolder'}>
          Телефон
          <p className={'fw-normal'}>{orderData?.phone || '-'}</p>
        </FormLabel>
        <FormLabel className={'fw-bolder'}>
          Цена
          <p className={'fw-normal'}>{orderData?.price || '-'}</p>
        </FormLabel>
        <FormLabel className={'fw-bolder'}>
          Курьер
          <p
            className={'fw-normal'}>{orderData ? couriers.find(item => item.id === orderData.courier)?.username : '-'}</p>
        </FormLabel>
        <FormLabel className={'fw-bolder'}>
          Статус
          <p className={'fw-normal'}>{orderData ? statuses.find(item => item.id === orderData.status)?.title : '-'}</p>
        </FormLabel>
      </Card>
    </>
  )
}
