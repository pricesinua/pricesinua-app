import ProductList from "./ProductList"

function App() {
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col" style={{maxHeight: "100vh"}}>
          <ProductList />
        </div>
      </div>
    </div>
  )
}

export default App