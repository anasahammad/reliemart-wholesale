import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../../Shaire/ImageUpload";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function VerificationForm() {
  const [countryCode, setCountryCode] = useState("+880");
  const [images, setImages] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleVerification = (data) => {
    // Check if required images are uploaded
    if (!images.profileImage || !images.voterIdImage) {
      if (!images.profileImage) {
        setError("profileImage", {
          type: "manual",
          message: "Profile image is required",
        });
      }
      if (!images.voterIdImage) {
        setError("voterIdImage", {
          type: "manual",
          message: "Voter ID image is required",
        });
      }
      return;
    }

    const formData = {
      ...data,
      countryCode,
      images,
    };

    console.log("Verification Data:", formData);
  };

  const handleImageUpload = (field, url) => {
    setImages((prev) => ({ ...prev, [field]: url }));
  };

  return (
    <div data-aos="fade-down" className="container mx-auto p-5 bg-white rounded-md shadow-md ">
      <form
        onSubmit={handleSubmit(handleVerification)}
        className="flex flex-col gap-5"
      >
 

        <div data-aos="fade-down" className="container mx-auto p-5 bg-white rounded-md shadow-md ">
  <form
    onSubmit={handleSubmit(handleVerification)}
    className="flex flex-col gap-5"
  >
    <h1 className="text-center text-2xl sm:text-3xl">
      অ্যাকাউন্ট ভেরিফিকেশন করুন
    </h1>

    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* WhatsApp Number Field */}
      <div className="w-full ">
        <label>হোয়াটসঅ্যাপ নম্বর</label>
        <div className="grid grid-cols-4 gap-2">
          <select
            className="w-full my-1 rounded-md border outline-0 px-3 py-2"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+880">+880</option>
            <option value="+91">+91</option>
            <option value="+92">+92</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+966">+966</option>
            <option value="+971">+971</option>
            <option value="+974">+974</option>
          </select>
          <input
            type="tel"
            {...register("phone", {
              required: "ফোন নম্বর প্রদান আবশ্যক",
              pattern: {
                value: /^[0-9]{8,15}$/,
                message: "একটি বৈধ ফোন নম্বর প্রদান করুন",
              },
            })}
            className="w-full my-1 rounded-md border  outline-0 px-3 py-2 col-span-3"
            placeholder="ফোন নম্বর লিখুন"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Bank Account Field */}
      <div className="w-full ">
        <label>ব্যাংক অ্যাকাউন্ট নম্বর</label>
        <input
          type="text"
          {...register("bankAccount", {
            required: "ব্যাংক অ্যাকাউন্ট নম্বর প্রদান আবশ্যক",
          })}
          className="w-full my-1 rounded-md border outline-0 px-3 py-2"
          placeholder="ব্যাংক অ্যাকাউন্ট নম্বর লিখুন"
        />
        {errors.bankAccount && (
          <p className="text-red-500 text-sm">{errors.bankAccount.message}</p>
        )}
      </div>

      {/* Mobile Wallet Field */}
      <div className="w-full ">
        <label>মোবাইল ওয়ালেট নম্বর</label>
        <input
          type="text"
          {...register("mobileWallet", {
            required: "মোবাইল ওয়ালেট নম্বর প্রদান আবশ্যক",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "একটি বৈধ মোবাইল ওয়ালেট নম্বর প্রদান করুন",
            },
          })}
          className="w-full my-1 rounded-md border   outline-0 px-3 py-2"
          placeholder="মোবাইল ওয়ালেট নম্বর লিখুন"
        />
        {errors.mobileWallet && (
          <p className="text-red-500 text-sm">
            {errors.mobileWallet.message}
          </p>
        )}
      </div>

      {/* Optional Mobile Wallet */}
      <div className="w-full ">
        <label>বিকাশ, নগদ, বা রকেট নম্বর (ঐচ্ছিক)</label>
        <input
          type="text"
          {...register("mobileWallet", {
            required: false,
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "একটি বৈধ মোবাইল নম্বর প্রদান করুন",
            },
          })}
          className="w-full my-1 rounded-md border  outline-0 px-3 py-2"
          placeholder="বিকাশ, নগদ, বা রকেট নম্বর লিখুন"
        />
      </div>

      {/* City Field */}
      <div className="w-full ">
        <label>শহর</label>
        <input
          type="text"
          {...register("city", { required: "শহরের নাম প্রদান আবশ্যক" })}
          className="w-full my-1 rounded-md border   outline-0 px-3 py-2"
          placeholder="শহরের নাম লিখুন"
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      {/* City Code Field */}
      <div className="w-full ">
        <label>শহর কোড</label>
        <input
          type="text"
          {...register("cityCode", {
            required: "শহর কোড প্রদান আবশ্যক",
            pattern: {
              value: /^[0-9]{1,6}$/,
              message: "একটি বৈধ শহর কোড প্রদান করুন",
            },
          })}
          className="w-full my-1 rounded-md border   outline-0 px-3 py-2"
          placeholder="শহর কোড লিখুন"
        />
        {errors.cityCode && (
          <p className="text-red-500 text-sm">{errors.cityCode.message}</p>
        )}
      </div>

      {/* Full Address Field */}
      <div className="w-full col-span-1 md:col-span-2">
        <label>পূর্ণ ঠিকানা</label>
        <textarea
          {...register("fullAddress", {
            required: "পূর্ণ ঠিকানা প্রদান আবশ্যক",
          })}
          className="w-full my-1 rounded-md border   outline-0 px-3 py-2"
          placeholder="পূর্ণ ঠিকানা লিখুন"
          rows={3}
        ></textarea>
        {errors.fullAddress && (
          <p className="text-red-500 text-sm">
            {errors.fullAddress.message}
          </p>
        )}
      </div>
    </div>
  </form>
</div>

 
 

        {/* Upload Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <div className="w-full flex flex-col gap-3">
            <label> আপনার প্রোফাইল ছবি দিন</label>
            <div className="w-full relative flex-col cursor-pointer max-h-[200px] min-h-[150px] rounded-md overflow-hidden border flex justify-center items-center">
              {(images.profileImage && (
                <img
                  src={images.profileImage}
                  alt="Profile Preview"
                  className="mt-2 w-full max-h-[200px] min-h-[150px] rounded-md border"
                />
              )) || (
                <div className="w-full max-h-[200px] min-h-[150px] flex flex-col justify-center items-center h-full">
                  <IoCloudUploadOutline className="text-2xl" />
                  <small> আপলোড  প্রোফাইল</small>
                </div>
              )}
              <ImageUpload
                onUpload={(url) => handleImageUpload("profileImage", url)}
              />
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-sm">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          <div className="w-full flex flex-col gap-3">
            <label> আপলোড ভোটার আইডি কার্ডের ছবি দিন</label>
            <div className="w-full relative flex-col cursor-pointer max-h-[200px] min-h-[150px] rounded-md overflow-hidden border flex justify-center items-center">
              {(images.voterIdImage && (
                <img
                  src={images.voterIdImage}
                  alt="Voter ID Preview"
                  className=" w-full h-auto rounded-md border"
                />
              )) || (
                <div className="w-full max-h-[200px] min-h-[150px] flex flex-col justify-center items-center h-full">
                  <IoCloudUploadOutline className="text-2xl" />
                  <small>আপলোড ভোটার আইডি</small>
                </div>
              )}
              <ImageUpload
                onUpload={(url) => handleImageUpload("voterIdImage", url)}
              />
            </div>
            {errors.voterIdImage && (
              <p className="text-red-500 text-sm">
                {errors.voterIdImage.message}
              </p>
            )}
          </div>

          {/* Optional Fields */}
          <div className="w-full flex flex-col gap-3">
  <label>আপনার পাসপোর্টের ছবি (ঐচ্ছিক)</label>
  <div className="w-full relative flex-col cursor-pointer max-h-[200px] min-h-[150px] rounded-md overflow-hidden border flex justify-center items-center">
    {(images.passportImage && (
      <img
        src={images.passportImage}
        alt="পাসপোর্ট প্রিভিউ"
        className="w-full h-auto rounded-md border"
      />
    )) || (
      <div className="w-full max-h-[200px] min-h-[150px] flex flex-col justify-center items-center h-full">
        <IoCloudUploadOutline className="text-2xl" />
        <small>পাসপোর্ট আপলোড করুন</small>
      </div>
    )}
    <ImageUpload
      onUpload={(url) => handleImageUpload("passportImage", url)}
    />
  </div>
</div>

<div className="w-full flex flex-col gap-3">
  <label>আপনার ড্রাইভিং লাইসেন্সের ছবি (ঐচ্ছিক)</label>
  <div className="w-full relative flex-col cursor-pointer max-h-[200px] min-h-[150px] rounded-md overflow-hidden border flex justify-center items-center">
    {(images.drivingLicenseImage && (
      <img
        src={images.drivingLicenseImage}
        alt="ড্রাইভিং লাইসেন্স প্রিভিউ"
        className="w-full h-auto rounded-md border"
      />
    )) || (
      <div className="w-full max-h-[200px] min-h-[150px] flex flex-col justify-center items-center h-full">
        <IoCloudUploadOutline className="text-2xl" />
        <small>ড্রাইভিং লাইসেন্স আপলোড করুন</small>
      </div>
    )}
    <ImageUpload
      onUpload={(url) =>
        handleImageUpload("drivingLicenseImage", url)
      }
    />
  </div>
</div>

        </div>

        {/* Submit Button */}
        <input
          type="submit"
          value="ভেরিফাই"
          className="w-full p-2 rounded-md font-semibold cursor-pointer text-white bg-[#F4511E]"
        />
      </form>
    </div>
  );
}
