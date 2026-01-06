import { NavLink } from "react-router-dom";

export default function SideBar() {
    return (
        <aside className="w-100 bg-base-100 border-r border-base-300 p-4 flex flex-col">
            <h1 className="text-xl font-bold mb-6">WealthSim</h1>
            <nav className="space-y-2">
            <NavLink to="/asset" className="btn btn-ghost justify-start w-full">
                Assets
            </NavLink>
            <NavLink to="/simulation" className="btn btn-ghost justify-start w-full">
                Simulation
            </NavLink>
            </nav>
            <div className="pt-4 border-t border-base-300 mt-10">
                <h2 className="text-md font-bold">Instructions</h2>
                <p>
                    Create asset buckets and monthly contributions from the Assets page.
                    From the Simulation page, pressing 'Run Simulation' will induce a set of monte-carlo simulations.
                    These will randomly predict possible outcomes for your assets based on your set volatility values.
                </p>
            </div>
            <div className="mt-auto pt-4 border-t border-base-300 text-xs opacity-60">
                <p className="text-sm opacity-70 mt-auto pt-4">   © 2026 Joseph Zhou ·  
                    <a className="link" href="https://github.com/JosephZhou19">GitHub</a>
                </p>
            </div>
        </aside>
    )
}