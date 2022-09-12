import "./Pagination.css"

export default function Pagination(props) {
  return (
    <ul className="pagination d-flex align-items-baseline">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>

      <li className="page-item pagination" title="1/5">
        <input className="page-item pagination-input form-control" type="number" id="quantity" name="quantity" min="1" max="5" defaultValue={1} />
        <span className="pagination-slash">5</span>
      </li>

      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  )
}