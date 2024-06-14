import Default from "../../layouts/default/Default";
import request from "../../api/request";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Workspace(props) {
  // console.log(`props => ${props.cardName}`);
  // console.log(props);

  let [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    request('GET', 'dashboards/', (response) => { requestDashboards(response) });
  }, []);

  function requestDashboards(response) {
    setDashboards(response);
  }


  return (
    <div className="header_offset">

      {
        dashboards.map((dashboard) =>
          <div key={dashboard.id}>
            <Link to={"dashboard/" + dashboard.id}>
              <h3>{dashboard.name}</h3>
            </Link>
          </div>

        )
      }

      <Default>
        Workspace
      </Default>
    </div >
  )
};

