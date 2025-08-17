'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kritik Hata!</h2>
            <p className="text-gray-600 mb-6">Uygulama yüklenirken bir hata oluştu.</p>
            <button
              onClick={reset}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Uygulamayı Yeniden Başlat
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
