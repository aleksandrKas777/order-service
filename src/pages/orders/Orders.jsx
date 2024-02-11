import { DataTable } from "@/components/dataTable/DataTable";
import { NumberParam, StringParam, useQueryParams, withDefault } from "use-query-params";
import { useQuery } from 'react-query'
import { getOrders } from "@/api/api.js";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { Button } from "react-bootstrap";
import { ROLES } from "@/constants/roles.js";

const columns = [
  {
    field: (row) => <Link to={`/orders/${row.id}`}>{row.id}</Link>,
    title: 'ID',
  },
  {
    field: (row) => row.address,
    title: 'Адрес доставки',
  },
  {
    field: (row) => row.name,
    title: 'Имя',
  },
  {
    field: (row) => new Date(row.created_at).toLocaleDateString(),
    title: 'Дата поступления',
  },
]
const breadcrumbs = [
  { title: 'Заказы' },
]
export const Orders = () => {
  
  const [params, setParams] = useQueryParams(
    {
      page: withDefault(NumberParam, 1),
      size: withDefault(NumberParam, 10),
      search: withDefault(StringParam, ''),
    },
    { updateType: 'replaceIn' },
  )
  
  const { data: dataOrders = [] } = useQuery(
    ['orders', params],
    () => getOrders(params),
    {
      keepPreviousData: true,
    },
  )
  const role = JSON.parse(localStorage.getItem('role'))
  
  return (
    <>
      <div className={'d-flex justify-content-between align-items-center'}>
        <Breadcrumbs crumbs={breadcrumbs}/>
        {role === ROLES.USER && <Button as={Link} to={'/orders/add'} variant={'success'}>Добавить заказ</Button>}
      </div>
      
      <DataTable data={dataOrders} params={params} setParams={setParams} columns={columns}/>
    </>
  )
}
