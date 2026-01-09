import { useState } from "react"
import type { Asset } from "../types/asset"
import { ContributionRuleTable } from "./ContributionRuleTable";

type Props = {
    asset: Asset;
    editAsset: (asset: Asset) => void;
    deleteAsset: (assetName: String) => void;
}
export function AssetRow({
    asset,
    editAsset,
    deleteAsset
}: Props) {
    const [expanded, setExpanded] = useState(false)
    return (
        <>
        <tr className="cursor-pointer hover" onClick={() => setExpanded(!expanded)}>
            <td>{asset.name}</td>
            <td>{(asset.initial_value).toFixed(2)}</td>
            <td>{(asset.expected_return * 100).toFixed(2)}%</td>
            <td>{(asset.volatility)}</td>
            <td>{(asset.tax_drag * 100).toFixed(2)}%</td>
            <td>{(asset.return_volatility)}</td>
            <td className="text-right">
            <button className="btn btn-sm btn-outline" onClick={() => {editAsset(asset)}}>Edit</button>
            </td>
            <td className="text-right">
            <button className="btn btn-sm btn-outline" onClick={() => deleteAsset(asset.name)}>Delete</button>
            </td>
            <td className="text-right"> 
                <span className="text-sm opacity-60"> {expanded ? "▲" : "▼"} </span>
            </td>
        </tr>
        {expanded && (
           <ContributionRuleTable assetName={asset.name} />
        )}

        </>
    )
}