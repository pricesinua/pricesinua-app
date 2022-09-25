import axios from "axios"

import { useEffect, useState } from "react"
import { priceobserver, zakazua } from "../axios"

import Pagination from "./Pagination"
import Search from "./Search"

import { Link } from "react-router-dom"

function randomIntegerInRange(begin, end) {
  const min = Math.ceil(begin);
  const max = Math.floor(end);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateItemPlaceholders(count) {
  return new Array(count).fill({}).map((_value, index) =>
    <div className="list-group-item placeholder-glow" key={index}>
      <div className="row align-items-center">
        <div className="col-auto">
          <div className="avatar placeholder"></div>
        </div>

        <div className="col">
          <div className={`placeholder col-${randomIntegerInRange(3, 6)}`}></div>
        </div>
      </div>
    </div>
  )
}

function ProductItem(props) {
  const { product } = props

  return (
    <div className="list-group-item">
      <div className="row align-items-center">
        <div className="col-auto">
          <img className="avatar" src={product.img.s150x150} alt="" />
        </div>

        <div className="col"><Link to={`/product/${product.ean}`}>{product.title}</Link></div>
      </div>
    </div>
  )
}

export default function ProductList() {
  const size = 20

  const [searchText, setSearchText] = useState("")
  const [searchProducts, setSearchProducts] = useState([])

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [itemPlaceholders, setItemPlaceholders] = useState([])

  useEffect(() => {
    setPage(1)
    setTotal(0)
    setSearchProducts([])

    const abortController = new AbortController()

    const config = {
      signal: abortController.signal
    }

    const onThrown = (thrown) => {
      if (axios.isCancel(thrown))
        console.log(`Search query aborted`);
    }

    if (searchText.length) {
      priceobserver.get(`/store`, config).then(response => {
        const stores = response.data

        stores.forEach(storeId => {
          zakazua.get(`/stores/${storeId}/products/search?q=${searchText}`, config).then(response => {
            const results = response.data.results

            const mappedProducts = results.map(product => {
              return {
                ean: product.ean,
                title: product.title,
                currency: product.currency,
                img: product.img
              }
            })

            setSearchProducts(searchProducts => [...new Set(searchProducts.concat(mappedProducts))])
          })
        })
      }).catch(onThrown)
    }

    return () => {
      abortController.abort()
    }
  }, [searchText])

  useEffect(() => {
    setProducts([])
    setItemPlaceholders(generateItemPlaceholders(size))

    const abortController = new AbortController()

    const config = {
      signal: abortController.signal
    }

    const onThrown = (thrown) => {
      if (axios.isCancel(thrown))
        console.log(`Page ${page} load aborted`);
    }

    if (searchProducts.length) {
      setTotal(searchProducts.length)
      setProducts(searchProducts.slice((page - 1) * size, page * size))
      setItemPlaceholders([])
    } else {
      priceobserver.get(`/store/products?size=${size}&page=${page}`, config).then(response => {
        setTotal(response.headers['x-total-count'])

        const eans = response.data

        eans.forEach(ean => {
          priceobserver.get(`/store/ean/${ean}`, config).then(response => {
            const stores = response.data
            const storeId = stores.find(storeId => storeId != null)

            zakazua.get(`/stores/${storeId}/products/${ean}`, config).then(response => {
              const product = response.data

              setProducts(products => [...products, {
                ean: product.ean,
                title: product.title,
                currency: product.currency,
                img: product.img
              }])

              setItemPlaceholders(placeholders => placeholders.slice(1, -1))
            }).catch(onThrown)
          }).catch(onThrown)
        });
      }).catch(onThrown)
    }

    return () => {
      abortController.abort()
    }
  }, [page, searchProducts])

  return (
    <div className="card" style={{ maxHeight: "inherit" }}>
      <div className="card-header d-flex flex-sm-row flex-column justify-content-sm-between">
        <h3 className="card-title">Products</h3>
        <Search text={searchText} setText={setSearchText} />
      </div>

      <div className="list-group list-group-flush overflow-auto">
        {products.sort((current, next) => current.title.localeCompare(next.title))
          .map((product, index) => <ProductItem product={product} key={index} />)
          .concat(itemPlaceholders)}
      </div>

      <div className="card-footer">
        <Pagination page={page} setPage={setPage} total={total} size={size}></Pagination>
      </div>
    </div>
  )
}