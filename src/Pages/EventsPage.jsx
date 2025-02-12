import React, { useEffect } from "react";
import Header from "../Components/Layout/Header";


import Footer from "../Components/Layout/Footer";

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ['wholesaleProducts'],
  //   queryFn: fetchOfferProducts,
  // });


  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedProduct(null);
  // };



  return (
    <>
      <Header activeHeading={4} />

      

      <Footer />
    </>
  );
};

export default EventsPage;





