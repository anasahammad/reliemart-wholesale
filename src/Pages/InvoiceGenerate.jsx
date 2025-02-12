import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiTrash2, FiUpload, FiDownload } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { usePDF } from 'react-to-pdf';
import { getUserByIdForReseller } from '../services/index/users';
import { FaFacebook } from 'react-icons/fa';

const InvoiceGenerate = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [lineItems, setLineItems] = useState([{ name: '', quantity: 1, price: 0 }]);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryChargeType, setDeliveryChargeType] = useState('insideDhaka'); 
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default color black
  const [colorName, setColorName] = useState('কালো'); 
  const colorOptions = [
    { name: 'কালো', hex: '#000000' },
    { name: 'লাল', hex: '#FF0000' },
    { name: 'সবুজ', hex: '#00FF00' },
    { name: 'নীল', hex: '#0000FF' },
    { name: 'হলুদ', hex: '#FFFF00' },
    { name: 'সাদা', hex: '#FFFFFF' },
    { name: 'বেগুনি', hex: '#800080' },
    { name: 'গোলাপী', hex: '#FFC0CB' },
    { name: 'বাদামী', hex: '#A52A2A' },
    { name: 'গ্রে', hex: '#808080' },
    { name: 'আকাশি', hex: '#87CEEB' },
    { name: 'ব্ল্যাক গ্রে', hex: '#2F4F4F' },
    { name: 'এমারল্ড', hex: '#50C878' },
    { name: 'কমলা', hex: '#FFA500' },
    { name: 'ট্যুরকোয়াজ', hex: '#40E0D0' },
  ];

  const userState = useSelector((state) => state.user);
const [accounts, setAccounts] = useState();
  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await getUserByIdForReseller(resellerId);
          //console.log(userData.user)
          setAccounts(userData.user);
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchUser();
    }, [resellerId]);
  const handleColorChange = (event) => {
    const selected = colorOptions.find(color => color.hex === event.target.value);
    setSelectedColor(selected.hex);
    setColorName(selected.name);
  };
  const invoiceRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: 'invoice.pdf' });

  const addLineItem = () => {
    setLineItems([...lineItems, { name: '', quantity: 1, price: 0 }]);
  };

  const removeLineItem = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (index, field, value) => {
    const updatedItems = lineItems.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setLineItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // Assuming 10% tax
  };


  const calculateTotal = () => {
    return calculateSubtotal() + deliveryCharge; // Include delivery charge in total
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyLogo(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeliveryChargeChange = (event) => {
    const type = event.target.value;
    setDeliveryChargeType(type);
    if (type === 'insideDhaka') {
      setDeliveryCharge(50); // Inside Dhaka charge
    } else {
      setDeliveryCharge(100); // Outside Dhaka charge
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">ইনভয়েস তৈরি করুন</h1>
        <div className="flex items-center space-x-4">
          {/* <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FiUpload className="inline-block mr-2" />
            লোগো আপলোড করুন
            <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
          </label> */}
          <button
            onClick={() => toPDF()}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
          >
            <FiDownload className="mr-2" /> পিডিএফ তৈরি করুন
          </button>
        </div>
      </div>

      <div ref={targetRef} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className='text-center text-2xl my-2 font-semibold'
         style={{ color: selectedColor ? selectedColor : '#2d3748' }}>{accounts?.companyName}</h2>
        <div className="flex justify-between items-center mb-6">
          {accounts?.logo && (
            <img src={accounts?.logo} alt="Company Logo" className="h-16 w-auto" />
          )}
          <div>
            <h2 className={`text-2xl font-semibold `}
             style={{ color: selectedColor ? selectedColor : '#2d3748' }}
            >ইনভয়েস</h2>
            <p className='flex justify-start items-center gap-1 '>ইনভয়েস নম্বর: 
              <span style={{ color: selectedColor ? selectedColor : '#2d3748' }}> {invoiceNumber}</span>
             </p>
            <p className='flex justify-start items-center gap-1'>পেমেন্টের তারিখ: 
            <span style={{ color: selectedColor ? selectedColor : '#2d3748' }}>  {dueDate}</span>
             </p>
          </div>
        </div>

   
       
          <div className="mb-6">
              <h3 className="text-xl font-semibold  mb-2"  style={{ color: selectedColor ? selectedColor : '#2d3748' }}>গ্রাহক তথ্য</h3>
              <div className="space-y-2">
                <div className="flex justify-start gap-3 text-gray-700">
                  <span className="font-semibold">নাম:</span>
                  <span>{customerName}</span>
                </div>
                <div className="flex justify-start gap-3 text-gray-700">
                  <span className="font-semibold">ফোন নম্বর:</span>
                  <span>{phoneNumber}</span>
                </div>
                <div className="flex justify-start gap-3 text-gray-700">
                  <span className="font-semibold">শিপিং ঠিকানা:</span>
                  <span>{shippingAddress}</span>
                </div>
              </div>
            </div>



        <table className="w-full table-auto mb-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">আইটেম</th>
              <th className="text-right py-2">পরিমাণ</th>
              <th className="text-right py-2">মূল্য</th>
              <th className="text-right py-2">মোট</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">৳{item.price.toFixed(2)}</td>
                <td className="text-right py-2">৳{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end space-x-6">
          <div className="w-1/3">
            <div className="flex justify-between mb-2 text-gray-700">
              <span>উপ-মূল্য:</span>
              <span>v{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>ডেলিভারি চার্জ:</span>
              <span>৳{deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>মোট:</span>
              <span>৳{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <h2 className='flex justify-center items-center gap-2 mt-10 font-semibold'
         style={{ color: selectedColor ? selectedColor : '#2d3748' }}><FaFacebook className='text-sky-500'></FaFacebook> {accounts?.facebookPageLink}</h2>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">ইনভয়েস বিস্তারিত</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ইনভয়েস নম্বর</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="INV-001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">পেমেন্টের তারিখ</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">গ্রাহক তথ্য</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">নাম</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="জন ডো"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ফোন নম্বর</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">শিপিং ঠিকানা</label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="শিপিং ঠিকানা লিখুন"
            ></textarea>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">প্রোডাক্ট আইটেম</h3>
          {lineItems.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateLineItem(index, 'name', e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                placeholder="পণ্যের নাম"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateLineItem(index, 'quantity', parseInt(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                placeholder="পরিমাণ"
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) => updateLineItem(index, 'price', parseFloat(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                placeholder="মূল্য"
              />
              <button
                onClick={() => removeLineItem(index)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
          <button
            onClick={addLineItem}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <FiPlus className="mr-2" /> নতুন আইটেম যোগ করুন
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">ডেলিভারি চার্জ</h3>
          <select
            value={deliveryChargeType}
            onChange={handleDeliveryChargeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="insideDhaka">ঢাকা (ভেতরে)</option>
            <option value="outsideDhaka">ঢাকার বাহিরে</option>
          </select>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">ডেলিভারি চার্জ পরিমাণ</label>
            <input
              type="number"
              value={deliveryCharge}
              onChange={(e) => setDeliveryCharge(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ডেলিভারি চার্জ নির্ধারণ করুন"
            />
          </div>
        </div>

        <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">রঙ নির্বাচন করুন</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">আপনি নির্বাচিত রঙ: {colorName}</label>
        <div className="w-full py-2 px-3 border rounded-md" style={{ backgroundColor: selectedColor }}>
          <span className="text-white">{selectedColor}</span>
        </div>
      </div>
      
      <select
        value={selectedColor}
        onChange={handleColorChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {colorOptions.map((color) => (
          <option key={color.hex} value={color.hex}>
            {color.name}
          </option>
        ))}
      </select>
    </div>

      </div>
    </div>
  );
};

export default InvoiceGenerate;
