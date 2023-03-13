import React, {useState, useEffect} from "react";
import "./DashboardCard.css";

import PieChart from "../../Structure/PieChart/PieChart";
import TicketCardList from "../../Features/TicketCardList/TicketCardList";
import OrganizationList from "../../Features/OrganizationList";

export default function DashboardCard(props) {

    const [priorityActive, setPriorityActive] = useState('All');

    const clickPriority = input => {
        setPriorityActive(input);
    }

    useEffect(() => {
        var header = document.getElementById("myDIV");
        var btns = header.getElementsByClassName("bttn");
        for (var i = 0; i < btns.length; i++) {
            btns[1].addEventListener("click", function () {
                var current = document.getElementsByClassName("activePriority");
                current[0].className = current[0].className.replace("
                activePriority", "");
                this.className += " activePriority";

            });
        }
    })

    var content;
    var contentPriority;
    var dashboardOrganizations;
    if (priorityActive === 'All') {
        content = (
            <>
            <h2 style={{ marginTop: '20px', marginLeft: '20px'}}>Tasks Overview :</h2>
            <PieChart assignedTickets={props.assignedTickets} />
            </>
        )
        contentPriority = null;
        dashboardOrganizations = (
            <div className="dashboardOrganizations">
                <h2 style={{ marginTop: '40px' }}>My Organization / Projects</h2>
            <OrganizationList organizations={props.userData.organizations}
            />
            </div>
        )
    } else {
        content = null;
        contentPriority = <TicketCardList tickets={props.assignedTickets}
        priorityActive={priorityActive} />
        dashboardOrganizations = null;
    }

    return (
        <>
        <div className='dashboardCard'>
            <div className="priority-navigator-container" id="myDIV">
                <div className="bttn activePriority" onClick={() => clickPriority('All')}>
                    <h4>All</h4>
                </div>
                <div className="bttn" onClick={() => clickPriority('High')}>
                  <h4>High</h4>
                    </div>
                    <div className="bttn" onClick={() => clickPriority('Medium')}>
                        <h4>Medium</h4>
                    </div>
                    <div className="bttn" onClick={() => clickPriority('Low')}>
                        <h4>Low</h4>
                    </div>
                    <div className="bttn" onClick={() => clickPriority('No-Priority')}>
                        <h4>No Priority</h4>
                    </div>
                    <div className="bttn" onClick={() => clickPriority('Done')}>
                        <h4>Done</h4>  
                </div>
            </div>
            <React.Fragment>C{content}</React.Fragment>
        </div>
        <React.Fragment>{contentPriority}</React.Fragment>
        <React.Fragment>{dashboardOrganizations}</React.Fragment>
        </>
    )
}