import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React from "react";

const HomePage = () => {
  return (

<div className="min-h-screen w-full bg-white relative">
  {/* Emerald Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)
      `,
      backgroundSize: "100% 100%",
    }}
  />
  <div className="container pt-8 mx-auto relative z-10">
      <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
        {/* Đầu trang */}
        <Header />

        {/* Tạo nhiệm vụ */}
        <AddTask />

        {/* Thống kê và bộ lọc */}
        <StatsAndFilters />

        {/* Danh sách nhiệm vụ */}
        <TaskList />

        {/* Phân trang và lọc theo page */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <TaskListPagination />

          <DateTimeFilter />
        </div>

        {/* Chân trang */}
        <Footer />
      </div>
    </div>
</div>

    
  );
};

export default HomePage;
