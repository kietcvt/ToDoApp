import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { useHref, useSearchParams } from "react-router";
import { toast } from "sonner";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState([]);
  const [completeTaskCount, setCompleteTaskCount] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dateQuery,setDateQuery] = useState('today');
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);
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

const handleTaskChanged = ()=>{
  fetchTasks();
}

// biến
  const filteredTasks = taskBuffer.filter((task)=>{
    switch(filter){
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'complete';
      default:
        return true;
    }
  });


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
          <AddTask
          handleNewTaskAdded = {handleTaskChanged}
          />

          {/* Thống kê và bộ lọc */}
          <StatsAndFilters
            activeTaskCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
            filter={filter}
            onFilterChange={setFilter}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList 
          filteredTasks={filteredTasks} 
          filter={filter}
          handleTaskChanged={handleTaskChanged}
          />

          {/* Phân trang và lọc theo page */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />

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
