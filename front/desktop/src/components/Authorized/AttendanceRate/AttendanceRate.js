import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { attendanceStore } from './AttendanceStore/AttendanceStore'
import { userSettings } from './../../../helpers/UserSettings';
import CharType from './CharType/CharType';
import ModalKick from './ModalKick/ModalKick';
import ModalChangeRole from './ModalChangeRole/ModalChangeRole';
import loader from './../../../img/loader.gif';
import './AttendanceRate.css';



class AttendanceRate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        attendanceStore.fetchAttends().then((data) => {
            this.setState({ loading: false })
        });
    }


    render() {
        return (
            <div id="attendanceRate">

                {this.state.loading ? (
                    <div className="mainLoader  flexContainer flexV">
                        <div className="space"></div>
                        <div className="content">
                            <div className="loaderContainer">
                                <img src={loader} alt="loader" />
                            </div>
                        </div>
                        <div className="space"></div>
                    </div>
                ) : (
                        <div className="attendanceRateContent">
                            <div className="attendanceRateBackground">
                                <div className="managerInfo">
                                    <div className="formulaInfo">
                                        *Attendance Rate formula = ( late + yes ) / total
                                        <div className="additional">higher is better</div>
                                </div>
                                    <div className="formulaInfo">
                                        *Late Rate formula = late / ( yes + late )
                                        <div className="additional">lower is better</div>
                                </div>
                                    {userSettings.isManager ? (
                                        <div className="manager">
                                            Click on guildie name if you want to change his role or kick him from impbot
                                </div>
                                    ) : null}
                                </div>
                                <CharType data={attendanceStore.dps} />
                                <CharType data={attendanceStore.healer} />
                                <CharType data={attendanceStore.tank} />
                                <ModalKick data={attendanceStore.kickModal} close={() => { attendanceStore.kickModal = null }} />
                                <ModalChangeRole data={attendanceStore.changeRoleModal} close={() => { attendanceStore.changeRoleModal = null }} />
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}


export default observer(AttendanceRate);