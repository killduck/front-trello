import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useState } from "react";

import TrashIcon from "../ui/Icons/TrashIcon";

import styles from './TaskCard.module.scss';


export default function TaskCard(props) {

  let task = props.task;
  let deleteTask = props.deleteTask;
  let updateTask = props.updateTask;


  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  let [label, setLabel] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        <textarea
          className="
        h-[90%]
        w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
        "
          value={task.name}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  function onCard_label() {
    console.log('Проверка выполения функции =>', onCard_label.name);

    label ?
      setLabel(false)
      :
      setLabel(true)

  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      // className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      className={styles.TaskCard}
    >
      <div className={styles.TaskCard__Wrap}>

        <div className={styles.CardView}>

          <div className={styles.ColorLabel}>
            <div
              className={styles.ColorLabel_Wrap}
              onClick={() => { onCard_label() }}
            >
              <span
                className={
                  label ?
                    styles.LabelActive
                    :
                    styles.Label
                } >
                Важно
              </span>
            </div>
          </div>

          {/* <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
            {task.name}
          </p> */}

          <a className={styles.CardText} href="#">
            {task.name}
          </a>

          {mouseIsOver && (
            <button
              onClick={() => {
                deleteTask(task.id);
              }}
              className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
            >
              <TrashIcon />
            </button>
          )}
        </div>

        <div className={styles.CardEdit}>
          <form>

          </form>
        </div>

      </div>
    </li>
  );
}
