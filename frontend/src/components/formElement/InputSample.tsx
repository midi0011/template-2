import React from "react"

interface FormInputs {
    name: string,
    label: string,
    type: string,
    required: boolean,
    structure?: string,
    placeholder?: string,
    additionalText?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
}

function InputSample({ name, type, required, label, placeholder, additionalText, onChange, value }: FormInputs) {

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
    }

    return (
        <div>
            <div className={additionalText ? "flex items-center justify-between" : undefined}>
                <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
                {additionalText && (
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            {additionalText}
                        </a>
                    </div>
                )}
            </div>
            <div className="mt-2">
                <input
                    id={name}
                    name={name}
                    type={type}
                    required={required}
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    value={value}
                />
            </div>
        </div>
    )
}

export default InputSample