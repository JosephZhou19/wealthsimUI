import { useState, useEffect } from "react";
import type {Asset} from "../types/asset"
type Props = {
  targetAsset : Asset | null;
  onClose: () => void;
  saveChanges: (asset: Asset) => void;
};

export function AssetModal({targetAsset, onClose, saveChanges }: Props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [taxDrag, setTaxDrag] = useState("");
  const [volatility, setVolatility] = useState("");
  const [returnVolatility, setReturnVolatility] = useState("");

  useEffect(() => {
    if (targetAsset) {
        setName(targetAsset.name)
        setValue(String(targetAsset.initial_value))
        setExpectedReturn(String(targetAsset.expected_return))
        setTaxDrag(String(targetAsset.tax_drag))
        setVolatility(String(targetAsset.volatility))
        setReturnVolatility(String(targetAsset.return_volatility))
    } 
    else {
        setName("")
        setValue("")
        setExpectedReturn("")
        setTaxDrag("")
        setVolatility("")
        setReturnVolatility("")
    }
  }, [targetAsset])
  
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
    saveChanges(payload)
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
            disabled={!!targetAsset}
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
