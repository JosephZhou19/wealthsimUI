import type { Asset } from "../types/asset"
import { deleteAsset } from "../api/assetApi";

type Props = {
    assets: Asset[];
    onEdit: (asset: Asset) => void;
    fetchAssets: () => void;
}
export default function AssetTable({assets, onEdit, fetchAssets}: Props) {
  function handleDelete(assetName: String) {
    console.log("Delete asset:", assetName);
    deleteAsset(assetName);
    fetchAssets();
  }
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
            <tr key={asset.name}>
              <td>{asset.name}</td>
              <td>{(asset.expected_return * 100).toFixed(2)}%</td>
              <td>{(asset.volatility * 100).toFixed(2)}%</td>
              <td>{(asset.tax_drag * 100).toFixed(2)}%</td>
              <td>{(asset.return_volatility * 100).toFixed(2)}%</td>
              <td className="text-right">
              <button className="btn btn-sm btn-outline" onClick={() => onEdit(asset)}>Edit</button>
              </td>
              <td className="text-right">
              <button className="btn btn-sm btn-outline" onClick={() => handleDelete(asset.name)}>Delete</button>
              </td>
            </tr>
          ))}  
        </tbody>
      </table>
    </div>
  )
}