// src/components/Layout.tsx
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alerts from "../components/Alerts";
import { AlertProvider } from '../context/AlertContext';
import { LoaderContext } from "../context/LoadingContext";
import Loader from "../components/Loader";

interface UserProps {
    data: {
        user_id: string;
        user_role: string;
        username: string;
    };
    authenticated: boolean;
}

function Layout() {
    const [user, setUser] = useState<UserProps | null>(null);
    const navigate = useNavigate();
    const { isLoading } = useContext(LoaderContext);

    const verifyMe = useCallback(async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (res.status !== 200) {
                throw new Error('Failed to fetch user data');
            }

            const data = await res.json();
            setUser(data);
        } catch (error) {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        verifyMe();
    }, [verifyMe]);

    useEffect(() => {
        if (user === null && !isLoading) {
            navigate('/');
        } else if (user && !isLoading) {
            navigate('/dashboard');
        }

    }, [user, navigate, isLoading]);


    return (
        <AlertProvider>
            <div className="flex">
                <Alerts />
                {
                    isLoading && <Loader />
                }
                {user && (
                    <div className="sticky top-0">
                        <Sidebar />
                    </div>
                )}
                <div className="flex-1">
                    {user && <Header />}
                    <main className="px-6 py-12 lg:px-8 flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </AlertProvider>
    );
}

export default Layout;
