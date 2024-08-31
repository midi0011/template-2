function Loader() {
    return (
        <div className="fixed flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
            <div className="flex-1">
                <main className="px-6 py-12 lg:px-8 flex-1">
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Loader