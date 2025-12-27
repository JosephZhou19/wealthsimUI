import type { Asset } from "../types/asset"
import { apiFetch } from "./client"

export function getAssets() {
  return apiFetch<Asset[]>("/assets", {
    method: "GET",
  })
}

export function createAsset(req: Asset) {
  return apiFetch<String>("/assets", {
    method: "post",
    body: JSON.stringify(req)
  })
}

export function deleteAsset(name: String) {
  const url =  `/assets/${name}`
  return apiFetch<String>(url, {
    method: "DELETE"
  })
}

export function updateAsset(req: Asset) {
  const url = `/assets/${req.name}`
  return apiFetch<String>(url, {
    method: "PUT",
    body: JSON.stringify(req)
  })
}