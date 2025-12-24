import type { Asset } from "../types/asset"
import { apiFetch } from "./client"

export function getAssets() {
  return apiFetch<Asset[]>("/assets", {
    method: "GET",
  })
}