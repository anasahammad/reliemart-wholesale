 

const Footer = () => {
  return (
    <footer className="mt-32      py-10">
      <div className="container mx-auto px-4">
        {/* Logo and Description */}
        <div className="md:flex justify-between mb-10">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            
            
         
          </div>

          
 
         
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-gray-300 pt-6">
          <div>
            <h4 className="font-semibold  text-white mb-3">Health & Beauty</h4>
            <ul className="space-y-1 text-white">
              <li>Top Brands</li>
              <li>Best Sellers</li>
              <li>Computers & Laptops</li>
              <li>Mobile Phone</li>
              <li>CPU Heat Pipes</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold  text-white mb-3">Electronics</h4>
            <ul className="space-y-1 text-white">
              <li>Featured</li>
              <li>New Arrivals</li>
              <li>TWS Earphones</li>
              <li>Gifts</li>
              <li>Computers</li>
              <li>Playstation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold  text-white  mb-3">Sweet Treats</h4>
            <ul className="space-y-1 text-white">
              <li>Headphones</li>
              <li>Wireless Headphones</li>
              <li>Accessories</li>
              <li>TWS Earphones</li>
              <li>CPU Coolers</li>
              <li>Smart Watch</li>
              <li>Gaming Console</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold   text-white mb-3">Fashion</h4>
            <ul className="space-y-1 text-white">
              <li>New Arrivals</li>
              <li>Featured</li>
              <li>Top Brands</li>
              <li>Electronics</li>
              <li>Best Sellers</li>
              <li>Computers & Laptops</li>
              <li>Mobile Phone</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex justify-between items-center text-sm  text-white">
          <p>© 2024 All Rights Reserved.</p>
          <div className="flex space-x-4">
            <img src="/path-to-paypal-logo.png" alt="PayPal" className="h-6" />
            <img src="/path-to-visa-logo.png" alt="Visa" className="h-6" />
            <img src="/path-to-mastercard-logo.png" alt="Mastercard" className="h-6" />
            <img src="/path-to-stripe-logo.png" alt="Stripe" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
