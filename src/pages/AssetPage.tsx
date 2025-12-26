import AssetTable from "../components/AssetTable"
import { AssetModal } from "../components/AssetModal"
import {getAssets} from "../api/assetApi"
import { useState, useEffect } from "react"
import type { Asset } from "../types/asset"



export default function AssetPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  async function fetchAssets() {
    setLoading(true)
    const data = await getAssets()
    console.log("fetched new assets" + data)
    setAssets(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchAssets()
  }, [])

  return (
    <div>
      <h2>Assets</h2>
      <div className="flex justify-between items-center mb-4">
        <button className="btn" onClick={() => setIsOpen(true)}>
            Add Asset
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <AssetTable onEdit={() =>{}} fetchAssets={() =>fetchAssets()} assets={assets} />
      )}
      {isOpen && <AssetModal onClose={()=> {
        setIsOpen(false);
        fetchAssets();
      }}/>}
    </div>
  )
}
