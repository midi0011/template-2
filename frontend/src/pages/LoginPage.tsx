// src/pages/LoginPage.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputSample from "../components/formElement/InputSample";
import { AlertContext } from '../context/AlertContext'; // Updated import path
import { LoaderContext } from "../context/LoadingContext";

interface FormProps {
    username: string;
    password: string;
}

export default function LoginPage() {
    const [formData, setFormData] = useState<FormProps>({
        username: "",
        password: "",
    });
    const { setAlert } = useContext(AlertContext); // Updated to AlertContext
    const { setIsLoading } = useContext(LoaderContext); // Updated to LoaderContext

    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const inputList = [
        {
            name: "username",
            type: "text",
            required: true,
            label: "Username",
            placeholder: "Enter your username",
            onChange: onChange,
            value: formData.username,
        },
        {
            name: "password",
            type: "password",
            required: true,
            label: "Password",
            placeholder: "Enter your password",
            additionalText: "Forgot password?",
            onChange: onChange,
            value: formData.password,
        },
    ];

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Set isLoading to true
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setAlert(data.message, 'error');
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
            setAlert("An unexpected error occurred", 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6" onSubmit={onSubmit}>
                    {inputList.map((input, index) => (
                        <InputSample key={index} {...input} />
                    ))}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
