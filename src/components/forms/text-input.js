import React, { Fragment } from "react"
import clsx from "clsx"
import { Field, ErrorMessage } from "formik"

const TextInput = ({ name, placeholder, value, onChange, label }) => {
  return (
    <Field name={name} value={value} onChange={onChange}>
      {({ field, form, meta }) => {
        const inputId = `text-input-${name}`
        const cssClass = clsx(
          "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-px lg:mb-2 leading-tight text-sm lg:text-md focus:outline-none focus:bg-white",
          { "border-red-500": meta.touched && meta.error }
        )

        return (
          <Fragment>
            {label && (
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor={inputId}
              >
                {label}
              </label>
            )}

            <input
              type="text"
              id={inputId}
              className={cssClass}
              placeholder={placeholder}
              {...field}
            />

            <ErrorMessage
              name={field.name}
              render={msg => (
                <span className="text-red-500 text-xs italic">{msg}</span>
              )}
            />
          </Fragment>
        )
      }}
    </Field>
  )
}

export default TextInput
