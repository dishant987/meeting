const { Suspense } = require("react");

export default function AvailabilityLayout({ children }) {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            {children}
        </Suspense>
    )
}