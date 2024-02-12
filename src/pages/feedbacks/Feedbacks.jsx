import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs.jsx";
import { DataTable } from "@/components/dataTable/DataTable.jsx";
import { NumberParam, StringParam, useQueryParams, withDefault } from "use-query-params";
import { useQuery } from "react-query";
import { getFeedbacks} from "@/api/api.js";

const columns = [
  {
    field: (row) => row?.id,
    title: 'ID',
  },
  {
    field: (row) => row?.message,
    title: 'Сообщение',
  },
  {
    field: (row) => row?.account?.email,
    title: 'E-Mail',
  },
]
const breadcrumbs = [
  { title: 'Отзывы' },
]


export const Feedbacks = () => {
  
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
    getFeedbacks,
    {
      keepPreviousData: true,
    },
  )
  
  return (
    <>
      <div className={'d-flex justify-content-between align-items-center mb-2'}>
        <Breadcrumbs crumbs={breadcrumbs}/>
      </div>
  
      <DataTable data={dataOrders} params={params} setParams={setParams} columns={columns}/>
    </>
  )
}
