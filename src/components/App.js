import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"

import ProductList from "./ProductList"

function App() {
  const WrappedProductList = () =>
    <div className="row">
      <div className="col" style={{ maxHeight: "100vh" }}>
        <ProductList />
      </div>
    </div>

  return (
    <div className="container-xxl">
      <Routes>
        <Route path="/" element={<WrappedProductList />}/>
      </Routes>
    </div>
  )
}

export default App