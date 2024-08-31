function Footer() {
    return (
        <footer className="bg-neutral text-neutral-content p-4">
            <aside className="grid-flow-col items-center">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>
        </footer>
    )
}

export default Footer