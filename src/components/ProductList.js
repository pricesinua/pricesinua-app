import { useEffect, useState } from "react"

import { products as productsEdge, store as storeEdge } from "../endpoints"

const pageItemsLimit = 20

export default function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(productsEdge)
      .then(response => response.json())
      .then((eans) => {
        eans.slice(0, pageItemsLimit).forEach(ean => {
          fetch(`${storeEdge}/Ean/${ean}`)
            .then(response => response.json())
            .then(stores => {
              const storeId = stores.find(storeId => storeId != null)
              fetch(`https://stores-api.zakaz.ua/stores/${storeId}/products/${ean}`)
                .then(response => response.json())
                .then(product => setProducts(products => [...products, {
                  ean: product.ean,
                  title: product.title,
                  currency: product.currency,
                  img: product.img
                }]))
            })
        });
      })
  }, [])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Products</h3>
      </div>

      <div className="list-group list-group-flush overflow-auto">
        {products.map((product) => (
          <div key={product.ean} className="list-group-item">
            <div className="row align-items-center">
              <div className="col-auto">
                <img className="avatar" src={product.img.s150x150} />
              </div>

              <div className="col">{product.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}