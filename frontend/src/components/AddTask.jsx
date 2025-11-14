import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const AddTask = ({handleNewTaskAdded}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async()=>{
    if(newTaskTitle.trim()){
      try {
        await axios.post("http://localhost:5001/api/tasks",{title:newTaskTitle})
        toast.success(`Nhiệm vụ ${newTaskTitle} được thêm vào`)
        handleNewTaskAdded();
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm nhiệm vụ:",error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới.");
      }
      setNewTaskTitle("");
    }else{
      toast.error("Bạn cần nhập nội dung của nhiệm vụ");
    }
  }

  const handleKeyPress = (event)=>{
    if((event.key) == "Enter"){
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-row gap-3 items-center">
        <Input
          type="text"
          placeholder="Nhiệm vụ là gì?"
          className="h-12 text-base bg-slate-50 flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
        onKeyPress = {handleKeyPress}
        />

        <Button variant="gradient" size="default" className="px-4" onClick ={addTask}>
          <Plus className="size-4" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
