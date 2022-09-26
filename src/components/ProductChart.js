import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { zakazua, priceobserver } from '../axios'

import Chart from 'react-apexcharts'

export default function ProductChart() {
  const [size, setSize] = useState(1792)
  const [pricestamps, setPricestamps] = useState([])
  const [title, setTitle] = useState("")

  const { ean } = useParams()

  useEffect(() => {
    priceobserver.get(`/store/ean/${ean}`).then(response => {
      const stores = response.data
      const storeId = stores.find(storeId => storeId != null)

      zakazua.get(`/stores/${storeId}/products/${ean}`).then(response => {
        const product = response.data
        setTitle(product.title)
      })
    })

    priceobserver.get(`/pricestamp?filter=productean==${ean}&size=${size}`).then(response => {
      const results = response.data
      setPricestamps(results.map(pricestamp => {
        return [pricestamp.timestamp, pricestamp.price / 100]
      }))
    })
  }, [ean])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="card-body">
        <Chart options={{
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            type: "datetime",
          },
          stroke: {
            width: 1,
            curve: "stepline",
          },
        }} series={[{
          name: "Price",
          data: pricestamps,
        }]} type="area" />
      </div>
    </div>

  )
}