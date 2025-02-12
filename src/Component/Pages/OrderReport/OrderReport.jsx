import { useForm } from "react-hook-form";
import OrderReportTable from "./OrderReportTable";

export default function OrderReport() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Perform search logic here
  };

  return (
    <div data-aos="fade-down"  className="p-0">
   

      {/* Order Report Table */}
      <OrderReportTable />
    </div>
  );
}
