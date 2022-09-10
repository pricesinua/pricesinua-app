import { useEffect, useState } from "react"
import { priceobserver, zakazua } from "../axios"

export default function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    priceobserver.get(`/store/products`).then(response => {
      const eans = response.data

      eans.forEach(ean => {
        priceobserver.get(`/store/ean/${ean}`).then(response => {
          const stores = response.data
          const storeId = stores.find(storeId => storeId != null)

          zakazua.get(`/stores/${storeId}/products/${ean}`).then(response => {
            const product = response.data

            setProducts(products => [...products, {
              ean: product.ean,
              title: product.title,
              currency: product.currency,
              img: product.img
            }].sort((current, next) => current.title.localeCompare(next.title)))
          })
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