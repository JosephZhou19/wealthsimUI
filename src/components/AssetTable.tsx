import type { Asset } from "../types/asset"
import { AssetRow } from "./AssetRow";

type Props = {
    assets: Asset[];
    editAsset: (asset: Asset) => void;
    deleteAsset: (assetName: String) => void;
}
export default function AssetTable({assets, editAsset, deleteAsset}: Props) {
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
          {assets.map((asset: Asset) => (
            <AssetRow key={asset.name} asset={asset} editAsset={(asset) => editAsset(asset)} deleteAsset={(assetName) => deleteAsset(assetName)}/>
          ))}  
        </tbody>
      </table>
    </div>
  )
}