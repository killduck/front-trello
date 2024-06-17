import { Link } from "react-router-dom"

import styles from "./DashboardPreview.module.scss"


export default function DashboardPreview(props) {
  return (
    <li className={styles.DashboardPreview}>
      <Link>
        <span class="board-tile-fade"></span>
        <div class="board-tile-details is-badged">
          <div title="Диплом 31" dir="auto" class="board-tile-details-name">
            <div class="LinesEllipsis  ">Диплом 31</div>
          </div>
          <div class="board-tile-details-sub-container">
            <span class="board-tile-options">
              <span title="Нажмите, чтобы добавить доску в список избранного." class="icon-sm icon-star board-tile-options-star-icon"></span>
            </span>
          </div>
        </div>
        <span class="board-tile-badges"></span>
      </Link>
    </li>
  )
};
