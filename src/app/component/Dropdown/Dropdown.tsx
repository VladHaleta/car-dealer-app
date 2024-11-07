import { TDropdownProps } from './types'

export function Dropdown({
  label,
  options,
  selectedValue,
  onChange,
}: TDropdownProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        className="form-select w-full border rounded p-2"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        <option value="">Choose {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
