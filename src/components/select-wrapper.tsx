import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectWrapperProps {
  options: Array<{ key: string; value: string }> | string[]
  className?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function SelectWrapper({
  options,
  className,
  placeholder,
  value,
  defaultValue,
  onValueChange,
}: SelectWrapperProps) {
  return (
    <Select value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          const isObject = typeof option === 'object'
          const optionValue = isObject ? option.value : option
          const optionLabel = isObject ? option.key : option
          return (
            <SelectItem key={optionValue} value={optionValue}>
              {optionLabel}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
