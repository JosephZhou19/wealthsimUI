import AssetTable from "../components/AssetTable"
import { AssetModal } from "../components/AssetModal"
import { useState, useEffect } from "react"
import type { Asset } from "../types/asset"
import SideBar from "../components/SideBar"



export default function AssetPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [assetToUpdate, setAssetToUpdate] = useState<Asset | null>(null)

  async function fetchAssets() {
    const getAssets: Asset[] = [
      {
        name: "High Yield Savings Account",
        initial_value: 1000,
        expected_return: 0.03,
        tax_drag: 0.02,
        volatility: 0,
        return_volatility: 0.02
      },
      {
        name: "Roth IRA",
        initial_value: 5000,
        expected_return: 0.07,
        tax_drag: 0,
        volatility: 0.1,
        return_volatility: 0
      },
      {
        name: "Brokerage Account",
        initial_value: 6000,
        expected_return: 0.08,
        tax_drag: 0.2,
        volatility: 0.12,
        return_volatility: 0
      },
    ]
    setAssets(getAssets)
  }
  async function saveModalChanges(newAsset: Asset) {
    if (assetToUpdate){
      console.log("Update asset:", newAsset);
      const updatedAssets = assets.map((asset) => {
        if (asset.name === newAsset.name) {
          return newAsset
        }
        return asset
      }) 
      setAssets(updatedAssets)
    }
    else {
        console.log("Create asset:", newAsset);
        setAssets([...assets, newAsset])
        setIsOpen(false)
    }
  }
  async function handleDelete(assetName: String) {
      console.log("Delete asset:", assetName);
      const updatedAssets = assets.filter(asset => asset.name != assetName);
      setAssets(updatedAssets)
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
