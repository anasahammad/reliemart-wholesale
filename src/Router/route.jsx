import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../Component/Default/ErrorPage";
import CircleLoader from '../Components/CircleLoader';
import WithdrawForm from '../Component/Pages/Withdrow/WithdrawForm';
// import Contact from '../ui/pages/Contact/Contact';

// Lazy load components
const Main = lazy(() => import("../Layout/Main"));
const SellerLayout = lazy(() => import("../Layout/SellerLayout"));
const Home = lazy(() => import("../ui/pages/Home/Home"));
const LoginPage = lazy(() => import("../Pages/LoginPage"));
const SignUpPage = lazy(() => import("../Pages/SignUpPage"));
const EventsPage = lazy(() => import("../Pages/EventsPage"));
const FaqPage = lazy(() => import("../Pages/FaqPage"));
const ProductDetailsPage = lazy(() => import("../Pages/ProductDetailsPage"));
const ProfilePage = lazy(() => import("../Pages/ProfilePage"));
const MyLoginOrders = lazy(() => import("../Pages/MyLoginOrders"));
const CheckoutPage = lazy(() => import("../Pages/CheckoutPage"));
const OrderDetailsPage = lazy(() => import("../Pages/OrderDetailsPage"));
const TrackOrderPage = lazy(() => import("../Pages/TrackOrderPage"));
const ForgetPasswordPage = lazy(() => import("../Pages/ForgetPasswordPage"));
const ResellerAuthPage = lazy(() => import("../ui/pages/Login/ResellerAuthPage"));
const Dashboard = lazy(() => import("../Component/Pages/Dashboard/Dashboard"));
const SellerHome = lazy(() => import("../Pages/SellerHome"));
const AboutUs = lazy(() => import("../Component/Pages/AboutUs/AboutUs"));
const PassiveIncomePage = lazy(() => import("../Pages/PassiveIncomePage"));
const SellerFaqPage = lazy(() => import("../Pages/SellerFaqPage"));
const LearningVideos = lazy(() => import("../Component/Pages/LearningVideos"));
const SalesGuideline = lazy(() => import("../Pages/SalesGuidline"));
const AllCategorys = lazy(() => import("../Component/Pages/AllProducts/AllCategorys"));
const AllProducts = lazy(() => import("../Component/Pages/AllProducts/AllProducts"));
const Balance = lazy(() => import("../Component/Pages/Balance/Balance"));
const Withdrow = lazy(() => import("../Component/Pages/Withdrow/Withdrow"));
const PaymentSetting = lazy(() => import("../Component/Pages/PaymentSetting/PaymentSetting"));
const InvoiceGenerate = lazy(() => import("../Pages/InvoiceGenerate"));
const WithdrowReport = lazy(() => import("../Component/Pages/withdrowReport/WithdrowReport"));
const OrderReport = lazy(() => import("../Component/Pages/OrderReport/OrderReport"));
const OrderTracking = lazy(() => import("../Component/Pages/OrderTraking/OrderTraking"));
const CourierCheck = lazy(() => import("../Component/Pages/CourierCheck/CourierCheck"));
const ProductRequest = lazy(() => import("../Component/Pages/ProductRequest/ProductRequest"));
const SellerReview = lazy(() => import("../Component/Pages/SellerReview/SellerReview"));
const Settings = lazy(() => import("../Component/Pages/Settings/Settings"));
const Service = lazy(() => import("../Component/Pages/Service/Service"));
const Support = lazy(() => import("../Component/Pages/Support/Support"));
const Profile = lazy(() => import("../Component/Pages/profile/Profile"));
const ResellerRanking = lazy(() => import("../Component/Pages/reffaral/MyTeam"));
const FavouriteProducts = lazy(() => import("../Component/Pages/FavouriteProducts"));
const SellerProductDetails = lazy(() => import("../Component/Pages/AllProducts/ProductDetails"));
const SellerOrderDetailsPage = lazy(() => import("../Pages/SellerOrderDetailsPage"));
const VerificationForm = lazy(() => import("../Component/Pages/Verifections/VerifectionFrom"));
const WholesaleProducts = lazy(() => import("../Components/Layout/WholesaleProducts"));
const About = lazy(() => import("../ui/pages/About/About"));
const MyOrders = lazy(() => import("../Pages/MyOrders"));
const AllProductsPage = lazy(() => import("../Pages/AllProductsPage"));
const Contact  = lazy(() => import("../ui/pages/Contact/Contact"));
const AboutUsPage = lazy(() => import("../Pages/AboutUsPage"));
const HasOffers = lazy(() => import("../Component/Pages/HasOffers"));
const TermsAndCondition = lazy(() => import("../ui/pages/TermsAndCondition"));
const ReturnAndRefundPolicy = lazy(() => import("../ui/pages/ReturnAndRefurndPolicy"));
const CategoriesProductPage = lazy(() => import("../Pages/CategoriesProductPage"));
const ForgetPassword = lazy(() => import("../Pages/ForgetPassword"));
// Loading component
const Loading = () => <CircleLoader   />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<Loading />}><Main /></Suspense>,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Suspense fallback={<Loading />}><Home /></Suspense> },
      { path: "/login", element: <Suspense fallback={<Loading />}><LoginPage /></Suspense> },
      { path: "/sign-up", element: <Suspense fallback={<Loading />}><SignUpPage /></Suspense> },
      { path: "/events", element: <Suspense fallback={<Loading />}><EventsPage /></Suspense> },
      { path: "/faq", element: <Suspense fallback={<Loading />}><FaqPage /></Suspense> },
      { path: "/wholeSale-products", element: <Suspense fallback={<Loading />}><WholesaleProducts /></Suspense> },
      { path: "/product/:id", element: <Suspense fallback={<Loading />}><ProductDetailsPage /></Suspense> },
      { path: "/profile", element: <Suspense fallback={<Loading />}><ProfilePage /></Suspense> },
      // { path: "/login-orders", element: <Suspense fallback={<Loading />}><MyLoginOrders /></Suspense> },
      { path: "/forget-password", element: <Suspense fallback={<Loading />}><ForgetPassword /></Suspense> },
      { path: "/support", element: <Suspense fallback={<Loading />}><Support /></Suspense> },
      { path: "/my-orders", element: <Suspense fallback={<Loading />}><MyOrders /></Suspense> },
      { path: "/all-products", element: <Suspense fallback={<Loading />}><AllProductsPage /></Suspense> },
      { path: "/about-us", element: <Suspense fallback={<Loading />}><AboutUsPage /></Suspense> },
      { path: "/checkout", element: <Suspense fallback={<Loading />}><CheckoutPage /></Suspense> },
      { path: "/order/:id", element: <Suspense fallback={<Loading />}><OrderDetailsPage /></Suspense> },
      { path: "/order/track/:id", element: <Suspense fallback={<Loading />}><TrackOrderPage /></Suspense> },
      { path: "/forget-password", element: <Suspense fallback={<Loading />}><ForgetPasswordPage /></Suspense> },
      { path: "/seller/login", element: <Suspense fallback={<Loading />}><ResellerAuthPage /></Suspense> },
      { path: "/has-offers", element: <Suspense fallback={<Loading />}><HasOffers /></Suspense> },
      {path:"/contact-us",element:<Suspense fallback={<Loading />}><Contact/></Suspense>},
      {path:"/terms-and-conditions",element:<Suspense fallback={<Loading />}><TermsAndCondition/></Suspense>},
      {path:"/return-policy",element:<Suspense fallback={<Loading />}><ReturnAndRefundPolicy/></Suspense>},
      {path:"/products/category/:categoryName",element:<Suspense fallback={<Loading />}><CategoriesProductPage/></Suspense>},
    ]
  },
  {
    path: "/seller",
    element: <Suspense fallback={<Loading />}><SellerLayout /></Suspense>,
    children: [
      { path: "/seller/dashboard", element: <Suspense fallback={<Loading />}><Dashboard /></Suspense> },
      { path: "/seller/seller-dashboard", element: <Suspense fallback={<Loading />}><SellerHome /></Suspense> },
      { path: "/seller/about-us", element: <Suspense fallback={<Loading />}><AboutUs /></Suspense> },
      { path: "/seller/passive-income", element: <Suspense fallback={<Loading />}><PassiveIncomePage /></Suspense> },
      { path: "/seller/faq", element: <Suspense fallback={<Loading />}><SellerFaqPage /></Suspense> },
      { path: "/seller/learning-video", element: <Suspense fallback={<Loading />}><LearningVideos /></Suspense> },
      { path: "/seller/sales-guideline", element: <Suspense fallback={<Loading />}><SalesGuideline /></Suspense> },
      { path: "/seller/all-product", element: <Suspense fallback={<Loading />}><AllCategorys /></Suspense> },
      { path: "/seller/category/:category", element: <Suspense fallback={<Loading />}><AllProducts /></Suspense> },
      { path: "/seller/balance", element: <Suspense fallback={<Loading />}><Balance /></Suspense> },
      { path: "/seller/withdraw", element: <Suspense fallback={<Loading />}><Withdrow /></Suspense> },
      { path: "/seller/withdraw/payment-setting", element: <Suspense fallback={<Loading />}><PaymentSetting /></Suspense> },
      { path: "/seller/invoice", element: <Suspense fallback={<Loading />}><InvoiceGenerate /></Suspense> },
      { path: "/seller/withdraw/withdraw-report", element: <Suspense fallback={<Loading />}><WithdrowReport /></Suspense> },
      { path: "/seller/withdraw/withdraw", element: <Suspense fallback={<Loading />}><WithdrawForm /></Suspense> },
      { path: "/seller/order-report", element: <Suspense fallback={<Loading />}><OrderReport /></Suspense> },
      { path: "/seller/order-traking", element: <Suspense fallback={<Loading />}><OrderTracking /></Suspense> },
      { path: "/seller/customer-checker", element: <Suspense fallback={<Loading />}><CourierCheck /></Suspense> },
      { path: "/seller/product-request", element: <Suspense fallback={<Loading />}><ProductRequest /></Suspense> },
      { path: "/seller/seller-review", element: <Suspense fallback={<Loading />}><SellerReview /></Suspense> },
      { path: "/seller/settings", element: <Suspense fallback={<Loading />}><Settings /></Suspense> },
      { path: "/seller/service", element: <Suspense fallback={<Loading />}><Service /></Suspense> },
      { path: "/seller/support", element: <Suspense fallback={<Loading />}><Support /></Suspense> },
      { path: "/seller/profile", element: <Suspense fallback={<Loading />}><Profile /></Suspense> },
      { path: "/seller/my-team", element: <Suspense fallback={<Loading />}><ResellerRanking /></Suspense> },
      { path: "/seller/category/allproduct", element: <Suspense fallback={<Loading />}><AllProducts /></Suspense> },
      { path: "/seller/favourite-product", element: <Suspense fallback={<Loading />}><FavouriteProducts /></Suspense> },
      { path: "/seller/product/:id", element: <Suspense fallback={<Loading />}><SellerProductDetails /></Suspense> },
      { path: "/seller/order/:id", element: <Suspense fallback={<Loading />}><SellerOrderDetailsPage /></Suspense> },
      { path: "/seller/verifection", element: <Suspense fallback={<Loading />}><VerificationForm /></Suspense> },
    ],
  },
]);

export default router;