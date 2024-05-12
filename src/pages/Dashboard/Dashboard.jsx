import Column from "../../components/Column/Column";
import AddNewBoardItem from "../../components/ui/AddNewBoardItem/AddNewBoardItem";
import Default from "../../layouts/default/Default";
import styles from "./Dashboard.module.scss";

export default function Dashboard(props) {

  let columns = [
    {
      id: 1,
      name: "backlog",
      order: 1,
      cards:[
        {
          id: 1,
          name: "Лёня",
          author_id: 3,
          order: 1,
        },
        {
          id: 2,
          name: "Андрей",
          author_id: 2,
          order: 2,
        },
      ],
    },
    {
      id: 2,
      name: "in progress",
      order: 2,
      cards:[
        {
          id: 1,
          name: "Лёня",
          author_id: 4,
          order: 1,
        },
      ],
    },
  ]

  return (
    <div>
      
      <Default>
        
        <div className={styles.Columns}>
          {
            columns.map((column) => 
              <Column key={column.id} dataColumn={column}/>
            )
          }

          <AddNewBoardItem />

        </div>

      </Default>
    </div>
  )
};
