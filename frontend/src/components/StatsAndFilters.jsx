import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StatsAndFilters = ({
  completedTasksCount = 0,
  activeTaskCount = 0,
  filter = "all",
  onFilterChange
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      {/* Phần thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-800 border-blue-200"
        >
          {activeTaskCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 border-green-200"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>
      {/* Phần filter */}
      <div className="flex flex-row gap-2 sm:flex-row">
        {
          Object.keys(FilterType).map((type)=>(
            <Button
              key ={type}
              variant = {filter === type? 'gradient':'ghost'}
              size ='sm'
              className ='capitalize'
              onClick={() => onFilterChange(type)}
            >
            <Filter className="size-4"/>
            {FilterType[type]}
            </Button>
          ))
        }
      </div>
    </div>
  );
};

export default StatsAndFilters;
