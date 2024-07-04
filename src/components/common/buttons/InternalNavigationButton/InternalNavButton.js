'use client'

import { useRouter } from 'next/navigation'

export default function InternalNavigationButton({text, path, className}) {
    const router = useRouter()

    return (
        <div 
            className={className}
            onClick={() => router.push(path)}
        >
            {text}
        </div>
    )
}