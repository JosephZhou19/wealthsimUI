import type { Profile } from "../types/Profile"
import { apiFetch } from "./client"

export function getProfile() {
  return apiFetch<Profile>("/profile", {
    method: "GET",
  })
}

export function createProfile(req: Profile) {
  return apiFetch<String>("/profile", {
    method: "post",
    body: JSON.stringify(req)
  })
}