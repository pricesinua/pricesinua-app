import { useEffect, useState } from "react"

import { products as productsEndpoint } from "../endpoints"

export default function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(productsEndpoint)
      .then((response) => response.json())
      .then((json) => {
        setProducts(json)
      })
  }, [])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Products</h3>
      </div>

      <div className="list-group list-group-flush overflow-auto">
        {products.map((product) => (
          <div key={product} className="list-group-item">{product}</div>
        ))}
      </div>
    </div>
  )
}