export type TDropdownProps = {
  label: string
  options: { value: string; label: string }[]
  selectedValue: string
  onChange: (value: string) => void
}
