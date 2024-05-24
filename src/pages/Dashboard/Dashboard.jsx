import Column from "../../components/Column/Column";
import AddOneMoreCol from "../../components/ui/AddOneMoreCol/AddOneMoreCol";
import CreateNewBoardItem from "../../components/ui/CreateNewBoardItem/CreateNewBoardItem";
import Default from "../../layouts/default/Default";
import styles from "./Dashboard.module.scss";
import axios from "axios";

// import { Droppable } from './Droppable';
// import { Draggable } from './Draggable';

import { useState, useEffect } from "react";


import { closestCenter, DndContext } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const data = [
  {
    id: 1,
    name: "Samaria",
  },
  {
    id: 2,
    name: "Gauthier",
  },
  {
    id: 3,
    name: "Mellisa",
  },
  {
    id: 4,
    name: "Arabela",
  },
  {
    id: 5,
    name: "Devon",
  },
  {
    id: 6,
    name: "Stacee",
  },
  {
    id: 7,
    name: "Federica",
  },
  {
    id: 8,
    name: "Jecho",
  },
  {
    id: 9,
    name: "Alasteir",
  },
  {
    id: 10,
    name: "Elston",
  },
];


const SortableUser = ({ user }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: user.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="user"
    >
      {user.name}
    </div>
  );
};




export default function Dashboard(props) {

  const [users, setUsers] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const addUser = () => {
    let newUser = {
      id: "1",
      name: inputValue,
    };
    setInputValue("");
    setUsers((users) => [...users, newUser]);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setUsers((users) => {
      const oldIndex = users.findIndex((user) => user.id === active.id);
      const newIndex = users.findIndex((user) => user.id === over.id);
      return arrayMove(users, oldIndex, newIndex);
    });
  };


  const [columns, setColumns] = useState([]);
  const [show, setShowElement] = useState(true);
  const [newName, setText] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/columns')
      .then(function (response) {
        setColumns(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onClickAdd = () => {
    if (newName !== '') {
      setColumns([...columns, {
        id: 3,
        name: newName,
        order: 3,
        cards: [],
      }
      ]);
      setShowElement(true);
    }
    else {
      return false;
    }
  }

  return (
    <div>
      <Default>

        <div>
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={users} strategy={verticalListSortingStrategy}>
              {users.map((user) => (
                <SortableUser key={user.id} user={user} />
              ))}
            </SortableContext>
          </DndContext>
        </div>


        <div className={styles.Columns}>
          {
            columns.map((column) =>
              <Column
                key={column.id}
                dataColumn={column}
              >

                <span>
                  тут нужен код добавления карточек
                  {/* можно использовать компоненты: CreateNewBoardItem и AddOneMoreCol. */}
                </span>

              </Column>
            )
          }
          <CreateNewBoardItem
            className={show ? styles.none : ''}
            buttonText={'Добавить список'}
            spellCheck="false"
            dir="auto"
            maxLength="512"
            autoComplete="off"
            name="Ввести заголовок списка"
            placeholder="Ввести заголовок списка"
            aria-label="Ввести заголовок списка"
            data-testid="list-name-textarea"
            autoFocus={show ? false : true}
            hideElAction={setShowElement}
            showFlag={true}
            changeAction={setText}
            newText={newName}
            addColumnAction={onClickAdd}
            newColName={columns}
          />
          <AddOneMoreCol
            className={show ? '' : styles.none}
            // hidden={show? 'hidden' : ''}
            buttonText={'Добавьте еще одну колонку'}
            showElAction={setShowElement}
            showFlag={false}
          />

        </div>

      </Default>

    </div>
  )
};
