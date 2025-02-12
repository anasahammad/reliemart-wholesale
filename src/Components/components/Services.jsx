import { IoMdPhonePortrait } from "react-icons/io";

const Services = () => {
  return (
    <div>
      {/* Service Info Section */}
      <div className="mt-10 py-8">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Service Card 1 */}
          <div className="flex gap-12 rounded-lg items-center bg-white text-gray-700 h-20 transition-all duration-300 p-4 shadow-lg transform hover:scale-105">
            <div className="flex items-center justify-center gradient-bg text-white rounded-full p-3">
              <IoMdPhonePortrait className="text-2xl" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-gray-700">Outfit Finder</p>
              <p className="text-sm text-white hidden md:block lg:block">Find Outfit for mart</p>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="flex gap-12 rounded-lg items-center   bg-white text-gray-700 h-20 transition-all duration-300 p-4 shadow-lg transform hover:scale-105">
            <div className="flex items-center justify-center gradient-bg text-white rounded-full p-3">
              <IoMdPhonePortrait className="text-2xl" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-gray-700">Outfit Finder</p>
              <p className="text-sm text-white hidden md:block lg:block">Find Outfit for mart</p>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="flex gap-12 rounded-lg items-center  bg-white text-gray-700 h-20 transition-all duration-300 p-4 shadow-lg transform hover:scale-105">
            <div className="flex items-center justify-center gradient-bg text-white rounded-full p-3">
              <IoMdPhonePortrait className="text-2xl" />
            </div>
            <div className="text-center hover:text-white">
              <p className="font-semibold text-sm text-gray-700">Outfit Finder</p>
              <p className="text-sm text-white hidden md:block lg:block">Find Outfit for mart</p>
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="flex gap-12 rounded-lg items-center  bg-white text-gray-700 h-20 transition-all duration-300 p-4 shadow-lg transform hover:scale-105">
            <div className="flex items-center justify-center gradient-bg text-white rounded-full p-3">
              <IoMdPhonePortrait className="text-2xl" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-gray-700">Outfit Finder</p>
              <p className="text-sm text-white hidden md:block lg:block">Find Outfit for mart</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Services;
