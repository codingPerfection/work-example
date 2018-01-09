import React, { Component } from 'react';
import './Attending.css';
import Explanation from './Explantation/Explanation';
import CharType from './CharType/CharType';
import TypeBreakdown from './TypeBreakdown/TypeBreakdown';
import StatusBreakdown from './StatusBreakdown/StatusBreakdown';
import InviteWow from './InviteWow/InviteWow'
import { userSettings } from '../../../../helpers/UserSettings';


class Attending extends Component {

    sortType(type) {
        var total = this.props.attends.filter((c) => c.charType === type);
        var attending = total.filter((c) => c.status === 'yes');
        var percent = '0';
        if (total.length !== 0) {
            percent = Math.round((attending.length / total.length) * 100);
        }
        if (percent < 15) {
            percent = 15;
        }
        return {
            total: total,
            attending: attending,
            percent: percent + '%'
        }
    }


    render() {
        if (!this.props.attends || this.props.attends.length === 0) {
            return (
                <div id="attending" className="attendingList">
                    <div className="content">
                        <Explanation notification={true} updates={true} />
                    </div>
                </div>
            )
        }
        let dps = this.sortType('dps');
        let tank = this.sortType('tank');
        let healer = this.sortType('healer');
        let late = this.props.attends.filter((c) => c.status === 'late');
        let notComing = this.props.attends.filter((c) => c.status === 'no');
        let notResponded = this.props.attends.filter((c) => c.status === 'pending');

        let forInvite = this.props.attends.filter(c => c.status === 'late' || c.status === 'yes');

        return (
            <div id="attending" className="attendingList">
                <div className="content">


                    <h3>ATTENDING:</h3>
                    <div className="overview">
                        <CharType attending={dps.attending.length} total={dps.total.length} percent={dps.percent} type="dps" />
                        <CharType attending={healer.attending.length} total={healer.total.length} percent={healer.percent} type="healer" />
                        <CharType attending={tank.attending.length} total={tank.total.length} percent={tank.percent} type="tank" />
                    </div>
                    <div className="clearfix"></div>

                    <h3 className="attendingBreakdown">attending Breakdown:</h3>
                    <TypeBreakdown type="dps" attending={dps.attending} total={dps.total.length} />
                    <TypeBreakdown type="healer" attending={healer.attending} total={healer.total.length} />
                    <TypeBreakdown type="tank" attending={tank.attending} total={tank.total.length} />

                    <StatusBreakdown
                        title="LATE:"
                        late={true}
                        empty="No one responded coming late"
                        chars={late}
                    />

                    <StatusBreakdown
                        title="NOT COMING:"
                        empty="No one responded not coming"
                        chars={notComing}
                    />

                    <StatusBreakdown
                        title="NOT RESPONDED:"
                        empty="All responded"
                        chars={notResponded}
                    />

                    {userSettings.isManager ? <InviteWow chars={forInvite} /> : null}

                    <Explanation updates={true} />
                </div>
            </div>
        );
    }
}

export default Attending;