import { useEffect, useState } from "react"
import "./Pagination.css"

export default function Pagination(props) {
  const { page, setPage, total, size, defaultPage = 1 } = props

  const [pageCount, setPageCount] = useState(0)

  const setFirstPage = () => {
    setPage(1)
  }

  const setLastPage = () => {
    setPage(pageCount)
  }

  const setPreviousPage = () => {
    setPage((page) => page - 1)
  }

  const setNextPage = () => {
    setPage((page) => page + 1)
  }

  const setInputPage = (event) => {
    const value = parseInt(event.target.value)

    if (!Number.isNaN(value) && value >= 1 && value <= pageCount)
      setPage(value)
  }

  const calculatePageCount = () => Math.ceil(total / size)

  useEffect(() => {
    setPageCount(calculatePageCount)
  }, [total, size])

  useEffect(() => {
    setPageCount(calculatePageCount)
    setPage(defaultPage)
  }, [])

  const classes = "btn page-link" 
  const disabledClasses = classes + ' disabled'

  return (
    <ul className="pagination d-flex align-items-baseline">
      <li className="page-item">
        <a className={page !== 1 ? classes : disabledClasses} aria-label="First" onClick={setFirstPage}>
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li className="page-item">
        <a className={page !== 1 ? classes : disabledClasses} aria-label="Previous" onClick={setPreviousPage}>
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>

      <li className="page-item d-flex" title={`${page}/${pageCount}`}>
        <input className="pagination-input form-control" type="number" id="page" name="page"
          min={1} max={pageCount} value={page} onChange={setInputPage} />
        <span className="pagination-slash">{pageCount}</span>
      </li>

      <li className="page-item">
        <a className={page !== pageCount ? classes : disabledClasses} aria-label="Next" onClick={setNextPage}>
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li className="page-item">
        <a className={page !== pageCount ? classes : disabledClasses} aria-label="Last" onClick={setLastPage}>
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  )
}