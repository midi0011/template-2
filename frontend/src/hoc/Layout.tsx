import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface UserProps {
    data: {
        user_id: string,
        user_role: string,
        username: string,
    },
    authenticated: boolean
}

function Layout() {
    const [user, setUser] = useState<UserProps | null>(null)
    const navigate = useNavigate()

    const verifyMe = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await res.json();
            setUser(data)
        } catch (error) {
            console.error('Error verifying user:', error);
            setUser(null); // Explicitly set user to null on error
        }

    }

    useEffect(() => {
        verifyMe()
    }, [])

    useEffect(() => {
        if (user === null) {
            navigate('/')
        } else {
            navigate('/dashboard')
        }
    }, [user, navigate])


    return (
        <>
            <div className="flex">
                {user && (
                    <div className="sticky top-0">
                        <Sidebar />
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex-1">
                    {/* Header */}
                    {user && <Header />}

                    <main className="px-6 py-12 lg:px-8 flex-1">
                        <Outlet />
                    </main>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout