import React, { Component } from 'react';
import CopyBox from './../../../../Common/CopyBox/CopyBox'
import './InviteWow.css'



class InviteWow extends Component {

    constructWowString() {
        let str = "/run "
        this.props.chars.forEach(c => {
            str += `InviteUnit("${c.charName}");`
        });
        if (str.length > 254) {
            str = ""
            this.props.chars.forEach(c => {
                str += `/invite ${c.charName} \n`
            });
            return { string: str, multiline: true };
        } else {
            return { string: str, multiline: false };
        }

    }

    render() {
        if (this.props.chars.length !== 0) {
            let dataToCopy = this.constructWowString();

            return (
                <div id="inviteWow" className="updatesInfo">
                    <h3 className="attendingBreakdown addMargin">AUTOMATIC INVITATION:</h3>
                    <div id="Explanation">
                        <div className="breakDown">
                            <div className="emptyMsg">
                                <div className="fade">
                                    <div className="explanation">This will invite all guildies that said they are attending or  late</div>
                                    <ol>
                                        <li >Create a party</li>
                                        <li >Convert it to raid</li>
                                        {dataToCopy.multiline ? (
                                            <li id="pastePlugin" >Copy paste the code below into  <a href="https://www.curseforge.com/wow/addons/paste">Paste plugin</a>
                                            </li>
                                        ) : (
                                                <li>Copy paste the code below into chat</li>

                                            )}
                                    </ol>
                                </div>
                                <CopyBox confirmed="Invites copied to clipboard"
                                    text={dataToCopy.string}
                                    multiline={dataToCopy.multiline} />
                            </div>
                        </div>
                    </div>
                </div >
            )
        } else {
            return null;
        }

    }
}

export default InviteWow;
