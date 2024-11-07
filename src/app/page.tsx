'use client'
import { useState, useEffect } from 'react'
import { Dropdown } from './component/Dropdown/Dropdown'
import { TMake } from './types'
import { NextLinkButton } from './component/NextLinkButton/NextLinkButton'

export default function HomePage() {
  const [makes, setMakes] = useState<TMake[]>([])
  const [selectedMake, setSelectedMake] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
    (currentYear - i).toString()
  )

  useEffect(() => {
    async function fetchMakes() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`
        )
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`)
        }
        const data = await res.json()
        setMakes(data.Results as TMake[])
      } catch (error) {
        setError('Failed to fetch vehicle makes. Please try again later.')
        console.error(error)
      }
    }
    fetchMakes()
  }, [])

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl mb-6">Car Dealer Filter</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4 w-full max-w-xs">
        <Dropdown
          label="Make"
          options={makes.map((make) => ({
            value: make.MakeId.toString(),
            label: make.MakeName,
          }))}
          selectedValue={selectedMake}
          onChange={setSelectedMake}
        />

        <Dropdown
          label="Year"
          options={years.map((year) => ({ value: year, label: year }))}
          selectedValue={selectedYear}
          onChange={setSelectedYear}
        />
      </div>
      {selectedMake && selectedYear && (
        <NextLinkButton
          href={`/result/${selectedMake}/${selectedYear}`}
          disabled={!selectedMake || !selectedYear}
        >
          Next
        </NextLinkButton>
      )}
    </div>
  )
}
