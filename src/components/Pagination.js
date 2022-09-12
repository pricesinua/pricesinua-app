import "./Pagination.css"

export default function Pagination(props) {
  return (
    <ul className="pagination d-flex align-items-baseline">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="First">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>

      <li className="page-item d-flex" title="1/5">
        <input className="pagination-input form-control" type="number" id="page" name="page" min="1" max="5" defaultValue={1} />
        <span className="pagination-slash">5</span>
      </li>

      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Last">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  )
}