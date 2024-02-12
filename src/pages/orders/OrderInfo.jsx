import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs.jsx";
import { Button, Card, FormLabel } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getOrder } from "@/api/api.js";

const breadcrumbs = [
  { title: 'Заказы', link: '/orders' },
  { title: 'Инфо' },
]

export const OrderInfo = () => {
  const { id } = useParams()
  const { data: orderData } = useQuery(['order', id], () => getOrder(id))
  
  return (
    <>
      <div className={'d-flex justify-content-between align-items-center'}>
        <Breadcrumbs crumbs={breadcrumbs}/>
        <Button as={Link} to={`/orders/${id}/edit`} variant={'success'}>Редактировать</Button>
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
          Статус
          <p className={'fw-normal'}>{orderData?.status || '-'}</p>
        </FormLabel>
      </Card>
    </>
  )
}
