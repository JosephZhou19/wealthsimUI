import { useState } from "react";
import type {Asset} from "../types/asset"
import { createAsset } from "../api/assetApi";
type Props = {
  onClose: () => void;
};

export function AssetModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [taxDrag, setTaxDrag] = useState("");
  const [volatility, setVolatility] = useState("");
  const [returnVolatility, setReturnVolatility] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Asset = {
        name: name,
        initial_value: parseFloat(value),
        expected_return: parseFloat(expectedReturn),
        tax_drag: parseFloat(taxDrag),
        volatility: parseFloat(volatility),
        return_volatility: parseFloat(returnVolatility)
    }
    console.log("Create asset:", payload);
    createAsset(payload)
    // TODO: call backend POST /assets
    onClose();
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add New Asset</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input input-bordered w-full"
            placeholder="Asset Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <input
            className="input input-bordered w-full"
            type="number"
            placeholder="Initial Value"
            value={value}
            onChange={e => setValue(e.target.value)}
            required
          />

          <input
            className="input input-bordered w-full"
            type="number"
            step="0.001"
            placeholder="Expected Return (e.g. 0.07)"
            value={expectedReturn}
            onChange={e => setExpectedReturn(e.target.value)}
            required
          />

          <input
            className="input input-bordered w-full"
            type="number"
            step="0.001"
            placeholder="Tax drag (e.g. 0.1)"
            value={taxDrag}
            onChange={e => setTaxDrag(e.target.value)}
            required
          />
          <input
            className="input input-bordered w-full"
            type="number"
            step="0.001"
            placeholder="Volatility (e.g. 0.1)"
            value={volatility}
            onChange={e => setVolatility(e.target.value)}
            required
          />
          <input
            className="input input-bordered w-full"
            type="number"
            step="0.001"
            placeholder="Return Volatility (e.g. 0.1)"
            value={returnVolatility}
            onChange={e => setReturnVolatility(e.target.value)}
            required
          />
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
