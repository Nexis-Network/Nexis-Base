import React, { forwardRef } from "react"
import cn from "@/utils/cn"

import FieldError from "./field-error-text"
import FieldHelperText from "./field-helper-text"

const inputClasses = {
  base: "disabled:bg-gray-50 disabled:border-gray-200",
  size: {
    sm: "h-4 w-4",
    DEFAULT: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-7 w-7",
  },
  variant: {
    outline: {
      base: "bg-[#0a0a0a] border border-gray-300 checked:!bg-gray-1000 focus:ring-gray-900/30 checked:!border-gray-1000",
      color: {
        DEFAULT: "hover:enabled:border-gray-1000",
        primary: "hover:enabled:border-primary",
        secondary: "hover:enabled:border-secondary",
        danger: "hover:enabled:border-red",
        info: "hover:enabled:border-blue",
        success: "hover:enabled:border-green",
        warning: "hover:enabled:border-orange",
      },
    },
    flat: {
      base: "border-0",
      color: {
        DEFAULT:
          "bg-gray-200/70 hover:enabled:bg-gray-200/90 focus:ring-gray-900/30 checked:!bg-gray-1000",
        primary:
          "bg-primary-lighter/70 hover:enabled:bg-primary-lighter/90 focus:ring-primary/30 checked:!bg-primary-dark",
        secondary:
          "bg-secondary-lighter/70 hover:enabled:bg-secondary-lighter/90 focus:ring-secondary/30 checked:!bg-secondary-dark",
        danger:
          "bg-red-lighter/70 hover:enabled:bg-red-lighter/90 focus:ring-red/30 checked:!bg-red-dark",
        info: "bg-blue-lighter/70 hover:enabled:bg-blue-lighter/90 focus:ring-blue/30 checked:!bg-blue-dark",
        success:
          "bg-green-lighter/70 hover:enabled:bg-green-lighter/90 focus:ring-green/30 checked:!bg-green-dark",
        warning:
          "bg-orange-lighter/80 hover:enabled:bg-orange-lighter/90 focus:ring-orange/30 checked:!bg-orange-dark",
      },
    },
    active: {
      base: "border",
      color: {
        DEFAULT:
          "border-gray-900 checked:enabled:border-gray-1000 focus:ring-gray-900/30 checked:!bg-gray-1000",
        primary:
          "border-primary checked:enabled:border-primary focus:ring-primary/30 checked:!bg-primary-dark",
        secondary:
          "border-secondary checked:enabled:border-secondary focus:ring-secondary/30 checked:!bg-secondary-dark",
        danger:
          "border-red checked:enabled:border-red focus:ring-red/30 checked:!bg-red-dark",
        info: "border-blue checked:enabled:border-blue focus:ring-blue/30 checked:!bg-blue-dark",
        success:
          "border-green checked:enabled:border-green focus:ring-green/30 checked:!bg-green-dark",
        warning:
          "border-orange checked:enabled:border-orange-dark/70 focus:ring-orange/30 checked:!bg-orange-dark",
      },
    },
  },
}

const labelClasses = {
  size: {
    text: {
      sm: "text-xs",
      DEFAULT: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
    margin: {
      start: {
        sm: "mr-1 rtl:ml-1",
        DEFAULT: "mr-1.5 rtl:ml-1.5",
        lg: "mr-2 rtl:ml-2",
        xl: "mr-2 rlt:ml-2",
      },
      end: {
        sm: "ml-1 rtl:mr-1",
        DEFAULT: "ml-1.5 rtl:mr-1.5",
        lg: "ml-2 rtl:mr-2",
        xl: "ml-2 rtl:mr-2",
      },
    },
  },
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** The variants of the component are: */
  variant?: keyof typeof inputClasses.variant
  /** The size of the component. `"sm"` is equivalent to the dense input styling. */
  size?: keyof typeof inputClasses.size
  /** Change radio button color */
  color?: keyof (typeof inputClasses.variant)["outline"]["color"]
  /** Available directions of the label are: */
  labelPlacement?: "start" | "end"
  /** Whether the input is disabled */
  disabled?: boolean
  /** Set field label */
  label?: React.ReactNode
  /** Show error message using this prop */
  error?: string
  /** Add helper text. It could be string or a React component */
  helperText?: React.ReactNode
  /** Use className prop to apply style for entire component */
  className?: string
  /** Use activeClassName prop to apply style on active component from radioGroup */
  activeClassName?: string
  /** Use containerClassName prop to apply some additional style for label and radio container */
  containerClassName?: string
  /** Use labelClassName prop to apply some addition style for the field label */
  labelClassName?: string
  /** Add custom classes for the input filed extra style */
  inputClassName?: string
  /** This prop allows you to customize the error message style */
  errorClassName?: string
  /** This prop allows you to customize the helper message style */
  helperClassName?: string
}

/**
 * A basic widget for getting the user input of radio. Here is the API documentation of the Radio component.
 * And the rest of the props of Checkbox are the same as the original html input field.
 * You can use props like `value`, `disabled`, `onChange`, `onFocus`, `onBlur` etc.
 */

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      variant = "outline",
      size = "DEFAULT",
      color = "DEFAULT",
      labelPlacement = "end",
      label,
      disabled,
      error,
      helperText,
      className,
      activeClassName,
      containerClassName,
      labelClassName,
      inputClassName,
      errorClassName,
      helperClassName,
      ...radioProps
    },
    ref
  ) => (
    <div className={cn("flex flex-col", className, activeClassName)}>
      <label
        className={cn(
          "flex flex-row items-center",
          disabled && "cursor-not-allowed",
          containerClassName
        )}
      >
        <input
          type="radio"
          ref={ref}
          disabled={disabled}
          className={cn(
            inputClasses.base,
            inputClasses.size[size],
            inputClasses.variant[variant].base,
            inputClasses.variant[variant].color[color],
            inputClassName
          )}
          {...radioProps}
        />

        {label && (
          <span
            className={cn(
              labelClasses.size.text[size],
              labelClasses.size.margin[labelPlacement][size],
              labelPlacement === "start" && "order-first",
              labelClassName
            )}
          >
            {label}
          </span>
        )}
      </label>

      {!error && helperText && (
        <FieldHelperText size={size} className={helperClassName}>
          {helperText}
        </FieldHelperText>
      )}
      {error && (
        <FieldError size={size} error={error} className={errorClassName} />
      )}
    </div>
  )
)

Radio.displayName = "Radio"
export default Radio
