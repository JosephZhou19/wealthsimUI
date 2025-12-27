import { useEffect, useState } from "react";
import type { ContributionRule } from "../types/ContributionRule"
import { getAssetRules, createRule, deleteRule } from "../api/ruleApi";


type Props = {
    assetName: String;
}

export function ContributionRuleTable({assetName
}: Props) {
    type NewRuleDraft = {
    name: string;
    rate: number;
    }
    const [rules, setRules] = useState<ContributionRule[]>([])
    const [newRule, setNewRule] = useState<NewRuleDraft | null>(null)
    const [saving, setSaving] = useState(false)
    async function fetchAssetRules() {
        const data = await getAssetRules(assetName)
        console.log("fetched new asset rules" + data)
        setRules(data)
      }
    async function handleSave() {
        if (!newRule) return
        setSaving(true)
        const data : ContributionRule = {
            name: newRule.name,
            rate: newRule.rate,
            asset_name: assetName,
            
        }
        console.log("creating new asset rule" + data)
        await createRule(data)
        await fetchAssetRules()
        setSaving(false)
    }

    async function handleDelete(ruleName: string) {
        console.log("deleting asset rule" + ruleName)
        await deleteRule(ruleName)
        await fetchAssetRules()
    }
    useEffect(() => {
    fetchAssetRules()
    }, [])
    return (
        <tr>
            <td colSpan={9} className="bg-base-200 p-4">
            <div className="overflow-x-auto">
                <table className="table table-sm w-full">
                    <thead>
                        <tr>
                            <th>Contribution Rule</th>
                            <th>Monthly Rate</th>
                            <th className="text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rules.map((rule: ContributionRule) => (
                            <tr key={rule.name}>
                                <td>{rule.name}</td>
                                <td>{rule.rate.toFixed(2)}</td>
                                <td className="text-right">
                                    <button className="btn btn-sm btn-outline" onClick={() => handleDelete(rule.name)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {newRule && (
                            <tr key={assetName + "new rule"}>
                                <td>
                                    <input className="input input-sm w-full" value={newRule.name} onChange={(e) =>
                                        setNewRule({...newRule, name:e.target.value})}
                                        placeholder="Rule Name"
                                    />
                                </td>
                                <td>
                                    <input className="input input-sm w-full" value={newRule.rate} onChange={(e) =>
                                        setNewRule({...newRule, rate:Number(e.target.value)})}
                                        placeholder="Monthly Rate"
                                    />
                                </td>
                                <td colSpan={2} className="text-right space-x-2">
                                    <button 
                                      className="btn btn-sm btn-success"
                                      onClick={() => handleSave()}
                                      disabled={saving}>
                                        Save
                                    </button>
                                    <button 
                                     className="btn btn-sm"
                                    onClick={() => setNewRule(null)}>
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
                <button className="btn btn-outline" onClick={() => setNewRule({name: "", rate:0})} disabled={newRule != null}>
                Add Rule
                </button>
            </td>
        </tr>
    )
}