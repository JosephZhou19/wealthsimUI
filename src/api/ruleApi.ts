import type { ContributionRule } from "../types/ContributionRule"
import { apiFetch } from "./client"

export function getAssetRules(assetName: String) {
  const url = `/ContributionRules/${assetName}`
  return apiFetch<ContributionRule[]>(url, {
    method: "GET",
  })
}

export function createRule(req: ContributionRule) {
  return apiFetch<ContributionRule>("/ContributionRules/", {
    method: "post",
    body: JSON.stringify(req)
  })
}

export function deleteRule(name: String) {
  const url =  `/ContributionRules/${name}`
  return apiFetch<String>(url, {
    method: "DELETE"
  })
}

export function updateRule(req: ContributionRule) {
  const url = `/ContributionRules/${req.name}`
  return apiFetch<String>(url, {
    method: "PUT",
    body: JSON.stringify(req)
  })
}