import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const AddTask = () => {
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-row gap-3 items-center">
        <Input
          type="text"
          placeholder="Nhiệm vụ là gì?"
          className="h-12 text-base bg-slate-50 flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
        />

        <Button variant="gradient"
        size="default"
        className="px-4"
        >
          <Plus className="size-4"/>
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
