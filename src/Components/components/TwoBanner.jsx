const TwoBanner = () => {
    return (
        <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6">
                {/* Galaxy Z Fold6 Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/2 h-full">
                    <img
                        src="https://i.postimg.cc/RZ1ZYXzK/honor-200-2486.png"
                        alt="Galaxy Z Fold6"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* HONOR 200 5G Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/2 h-full">
                    <img
                        src="https://i.postimg.cc/RZ1ZYXzK/honor-200-2486.png"
                        alt="HONOR 200 5G"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default TwoBanner;
