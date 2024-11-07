import { Suspense } from 'react'
import { TModel, TResultPageProps } from './types'

export async function generateStaticParams() {
  return []
}

async function fetchVehicleModels(
  makeId: string,
  year: string
): Promise<TModel[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    )

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
    }

    const data = await res.json()
    return data.Results as TModel[]
  } catch (error) {
    console.error('Failed to fetch vehicle models:', error)
    return null
  }
}

export default async function ResultPage({ params }: TResultPageProps) {
  const { makeId, year } = params
  const models = await fetchVehicleModels(makeId, year)

  if (models === null) {
    return (
      <p className="text-center mt-6 text-red-500">
        Failed to load vehicle models. Please try again later.
      </p>
    )
  }

  if (models.length === 0) {
    return (
      <p className="text-center mt-6">
        No models found for the selected make and year.
      </p>
    )
  }

  return (
    <Suspense fallback={<p className="text-center mt-6">Loading...</p>}>
      <div className="p-4">
        <h2 className="text-2xl mb-4">
          Vehicle Models for Make {makeId} in {year}
        </h2>
        <ul className="space-y-2">
          {models.map((model) => (
            <li key={model.Model_ID} className="border p-2 rounded">
              {model.Model_Name}
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  )
}
