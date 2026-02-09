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
      <SelectTrigger className={`border-0 bg-primary-foreground rounded-none h-full ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {options.map((option) => {
          const isObject = typeof option === 'object'
          const optionValue = isObject ? option.value : option
          const optionLabel = isObject ? option.key : option
          return (
            <SelectItem key={optionValue} value={optionValue} className="py-3 [&_svg]:text-primary focus:bg-primary focus:text-primary-foreground focus:[&_svg]:text-primary-foreground">
              {optionLabel}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
