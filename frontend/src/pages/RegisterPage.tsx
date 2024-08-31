import InputSample from "../components/formElement/InputSample"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]){8,24}$/;

export default function RegisterPage() {
    const inputList = [
        {
            name: "email",
            type: "email",
            required: true,
            label: "Email address"
        },
        {
            name: "firstName",
            type: "text",
            required: true,
            label: "First name"
        },
        {
            name: "lastName",
            type: "text",
            required: true,
            label: "Last name"
        },
        {
            name: "username",
            type: "text",
            required: true,
            label: "Username"
        },
        {
            name: "password",
            type: "password",
            required: true,
            label: "Password"
        },
    ]

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        {inputList.map((input, index) => (
                            <InputSample key={index} {...input} />
                        ))}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
