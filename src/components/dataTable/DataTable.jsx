import ReactPaginate from 'react-paginate'


export const DataTable = ({
                            columns = [],
                            data, //= {},
                            setParams,
                            params,
                          }) => {
  return (
    <>
      <table
        className={
          'w-100 bg-white border-collapse rounded-2 table-fixed overflow-hidden'
        }
      >
        <thead className={'bg-body-secondary'}>
        <tr className="text-left ">
          {columns.map((item, index) => {
            
            // eslint-disable-next-line no-unused-vars
            const { id, title, field } = item
            return (
              <th key={index} className={
                'text-custom-subtitle-gray font-medium bg-custom-dark-gray uppercase px-4 py-2 rounded-0'
              }>{title}</th>
            )
          })}
        </tr>
        </thead>
        <tbody className={'text-white text-sm'}>
        {data?.map((item, index) => {
          return (
            <tr key={item.id || index} className={'border-b text-secondary'}>
              {columns.map((_item, _index) => {
                const { field } = _item
                if (typeof field === 'string') {
                  return (
                    <td key={_index} className={'p-1'}>
                      {item[field].length > 20
                        ? `${item[field].slice(0, 17)}...`
                        : item[field]}
                    </td>
                  )
                }
                return (
                  <td key={_index} className={'p-1'}>
                    {field(item)}
                  </td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end gap-5 mt-3">
        {setParams && (
          <ReactPaginate
            onPageChange={(e) => {
              setParams((prev) => ({
                ...prev,
                page: e.selected + 1,
              }))
            }}
            pageCount={
              Math.ceil(data?.total / params.size) > 1
                ? Math.ceil(data?.total / params.size)
                : 0
            }
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            renderOnZeroPageCount={null}
            forcePage={params.page - 1}
            containerClassName={'d-flex justify-content-end gap-1'}
            nextLabel={' >'}
            className={''}
            nextClassName={'paginate-btn'}
            nextLinkClassName={'h-100 w-100 d-block'}
            previousLabel={'< '}
            previousClassName={'paginate-btn'}
            previousLinkClassName={'h-100 w-100 d-block'}
            pageClassName={'paginate-btn'}
            pageLinkClassName={'h-100 w-100 d-block'}
            breakLabel={'...'}
            breakClassName={'paginate-btn'}
            breakLinkClassName={'h-100 w-100 d-block'}
            activeClassName={'bg-success text-white'}
          />
        )}
      </div>
    </>
  )
}
