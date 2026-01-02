import AssetTable from "../components/AssetTable"
import { AssetModal } from "../components/AssetModal"
import {getAssets, createAsset, deleteAsset, updateAsset} from "../api/assetApi"
import { useState, useEffect } from "react"
import type { Asset } from "../types/asset"
import { Link } from "react-router-dom"



export default function AssetPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [assetToUpdate, setAssetToUpdate] = useState<Asset | null>(null)

  async function fetchAssets() {
    setLoading(true)
    const data = await getAssets()
    console.log("fetched new assets" + data)
    setAssets(data)
    setLoading(false)
  }
  async function saveModalChanges(asset: Asset) {
    if (assetToUpdate){
       console.log("Update asset:", asset);
       await updateAsset(asset);
       await fetchAssets();
    }
    else {
        console.log("Create asset:", asset);
        await createAsset(asset);
        setIsOpen(false)
        await fetchAssets();
    }
  }
  async function handleDelete(assetName: String) {
      console.log("Delete asset:", assetName);
      await deleteAsset(assetName);
      await fetchAssets();
    }
  async function openEdit(asset: Asset) {
    setAssetToUpdate(asset)
    setIsOpen(true)
  }
  useEffect(() => {
    fetchAssets()
  }, [])

  return (
    <div>
      <Link to="/simulation" className="btn">
      Go to Simulations
      </Link>
      <h2>Assets</h2>
      <div className="flex justify-between items-center mb-4">
        <button className="btn" onClick={() => setIsOpen(true)}>
            Add Asset
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <AssetTable editAsset={(asset) =>{openEdit(asset)}} deleteAsset={(assetName) =>handleDelete(assetName)} assets={assets} />
      )}
      {isOpen && <AssetModal targetAsset={assetToUpdate} onClose={()=> {
        setIsOpen(false);
        setAssetToUpdate(null)
        }} saveChanges={(asset) => saveModalChanges(asset)}/>}
    </div>
  )
}
