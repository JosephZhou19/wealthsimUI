import AssetTable from "../components/AssetTable"
import { AssetModal } from "../components/AssetModal"
import {getAssets, createAsset, deleteAsset, updateAsset} from "../api/assetApi"
import { useState, useEffect } from "react"
import type { Asset } from "../types/asset"
import { Link, NavLink } from "react-router-dom"
import SideBar from "../components/SideBar"



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
    <div className="min-h-screen bg-base-200 flex">
      <SideBar/>
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Asset Table</h1>
          <p className="text-sm opacity-70 mt-1">
            Add your various Asset groups here
          </p>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="max-w-8xl mx-auto p-6 space-y-8">
            <div className="card bg-base-100 shadow">
               <div className="flex justify-between items-center mb-4">
                <button className="btn" onClick={() => setIsOpen(true)}>
                    Add Asset
                </button>
                <p>
                  Click on an Asset to bring a dropdown for its contributions
                </p>
              </div>

              <div className="card-body">
                <AssetTable editAsset={(asset) =>{openEdit(asset)}} deleteAsset={(assetName) =>handleDelete(assetName)} assets={assets} />
              </div>
            </div>
          </div>
        )}
        {isOpen && <AssetModal targetAsset={assetToUpdate} onClose={()=> {
          setIsOpen(false);
          setAssetToUpdate(null);
          }} saveChanges={(asset) => saveModalChanges(asset)}/>}
      </main>
    </div>
  )
}
