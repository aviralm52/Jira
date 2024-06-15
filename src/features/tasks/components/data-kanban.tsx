import { useState } from "react";

import { DragDropContext } from "@hello-pangea/dnd";

import { Task, TaskStatus } from "../types";
import { KanbanColumnHeader } from "./kanban-column-header";

interface DataKanbanProps {
  data: Task[];
}

const boards: TaskStatus[] = [
  TaskStatus.DONE,
  TaskStatus.TODO,
  TaskStatus.BACKLOG,
  TaskStatus.IN_REVIEW,
  TaskStatus.IN_PROGRESS,
];

type TaskState = {
  [key in TaskStatus]: Task[];
};

export const DataKanban = ({ data }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TaskState>(() => {
    const initialTasks: TaskState = {
      [TaskStatus.DONE]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.IN_PROGRESS]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort(
        (a, b) => a.position - b.position
      );
    });

    return initialTasks;
  });

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className=" flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="flex-1 mx-2 bg-neutral-300 p-1.5 rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};