

const CircleLoader = ({  size = 'medium', className = '', alt = 'Loading' }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const spinnerSizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-28 h-28',
    large: 'w-36 h-36'
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 ${className}`}>
      <div className="w-16 h-16 relative">
        <div className="w-full h-full rounded-full border-4 border-gray-200 animate-spin border-t-[#FC742A]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src="/favicon.png" alt={alt} className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default CircleLoader;