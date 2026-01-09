import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import type { Profile } from "../types/Profile"
import { createProfile, getProfile } from "../api/profileApi";
export default function UserProfilePage() {
    const [profile, setProfile] = useState<Profile>({
        name:"",
        horizon_years: 10,
        primary_objective: "Growth",
        risk_attitude: "Conservative",
        income_stability: "Stable"
    });
    const [loading, setLoading] = useState(false)
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (profile != null) {
            const payload: Profile = profile
            createProfile(payload);
        }
    }
    async function fetchProfile() {
        setLoading(true)
        const data = await getProfile()
        console.log("fetched profile " + data)
        if (data !== null) {
            setProfile(data)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchProfile()
    }, [])
    
    return (   
        <div className="min-h-screen bg-base-200 flex">
            <SideBar/>
            <main className="flex-1 p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">User Profile</h1>
                    <p className="text-sm opacity-70 mt-1">
                        Add your User Profile data here so we can make better decisions about your asset allocation.
                    </p> 
                </div>
                {loading ? (
                    <div>Loading...</div>
                    ) : (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="card bg-base-100 shadow">
                                <h2 className="card-title">
                                    Profile
                                </h2>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <label className="label">
                                                Profile Name
                                                <input type="text" 
                                                value={profile.name}
                                                onChange={(e) => setProfile((prev) => prev && {...prev, name:e.target.value})}
                                                className="input input-bordered w-full" 
                                                placeholder="e.g Long-term Growth"/>
                                            </label>
                                            <label className="label">
                                                Planning Horizon (Years)
                                                <input type="number" 
                                                value={profile?.horizon_years}
                                                onChange={(e) => setProfile((prev) => prev && {...prev, horizon_years:parseInt(e.target.value)})}
                                                className="input input-bordered w-full" placeholder="10"/>
                                            </label>
                                            <label className="label">
                                                Primary Objective
                                                <select className="select select-bordered w-full" 
                                                value={profile?.primary_objective}
                                                onChange={(e) => setProfile((prev) => prev && {...prev, primary_objective:e.target.value})}>
                                                    <option>Growth</option>
                                                    <option>Capital Preservation</option>
                                                    <option>Income Stability</option>
                                                    <option>Early Retirement</option>
                                                </select>
                                            </label>
                                            <label className="label">
                                                Risk Posture
                                                <select className="select select-bordered w-full" value={profile?.risk_attitude}
                                                onChange={(e) => setProfile((prev) => prev && {...prev, risk_attitude:e.target.value})}>
                                                    <option>Conservative</option>
                                                    <option>Balanced</option>
                                                    <option>Aggressive</option>
                                                </select>
                                            </label>
                                            <label className="label">
                                                Income Stability
                                                <select className="select select-bordered w-full" value={profile?.income_stability}
                                                onChange={(e) => setProfile((prev) => prev && {...prev, income_stability:e.target.value})}>
                                                    <option>Stable</option>
                                                    <option>Variable</option>
                                                    <option>Uncertain</option>
                                                </select>
                                            </label>
                                            <div className="flex justify-end">
                                                <button className="btn btn-primary">
                                                    Save Profile
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                )}
            </main>
        </div>
    )
}