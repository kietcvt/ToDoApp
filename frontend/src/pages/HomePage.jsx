import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
import React, { useEffect, useState } from "react";
import { useHref, useSearchParams } from "react-router";
import { toast } from "sonner";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState([]);
  const [completeTaskCount, setCompleteTaskCount] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);
  useEffect(() => {
    setPage(1);
  }, [filter]);
  //logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks: ", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks");
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  }; //next
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  }; //previous

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  // biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit); // tong so trang = tong so nv / so trang limit

  useEffect(() => {
    if (totalPages === 0) {
      // Nếu không có trang nào thì luôn để page = 1 cho an toàn
      if (page !== 1) setPage(1);
      return;
    }

    // Nếu page vượt quá totalPages thì kéo về trang cuối cùng
    if (page > totalPages) {
      setPage(totalPages);
    }
    // Nếu page < 1 thì đưa về 1 (chỉ để phòng hờ)
    if (page < 1) {
      setPage(1);
    }
  }, [page, totalPages]);

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
        <div className="w-full max-w-2xl mx-auto space-y-7 sm:space-y-8 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
          {/* Đầu trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Thống kê và bộ lọc */}
          <StatsAndFilters
            activeTaskCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
            filter={filter}
            onFilterChange={setFilter}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/* Phân trang và lọc theo page */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 shadow-sm backdrop-blur-sm">
              <TaskListPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
            </div>

            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Chân trang */}
          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
