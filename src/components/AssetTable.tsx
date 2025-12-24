import { useEffect, useState } from "react"
import { getAssets } from "../api/assetApi"
import type { Asset } from "../types/asset"

export default function AssetPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAssets()
      .then(setAssets)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading assets...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <div className="p-6">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th className="capitalize">Name</th>
            <th>Expected Return Per Year</th>
            <th>Annual Volatility</th>
            <th>Expected Tax Drag</th>
            <th>Annual Return Volatility</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.name}>
              <td>{asset.name}</td>
              <td>{(asset.expected_return * 100).toFixed(2)}%</td>
              <td>{(asset.volatility * 100).toFixed(2)}%</td>
              <td>{(asset.tax_drag * 100).toFixed(2)}%</td>
              <td>{(asset.return_volatility * 100).toFixed(2)}%</td>
            </tr>
          ))}  
        </tbody>
      </table>
    </div>
  )
}