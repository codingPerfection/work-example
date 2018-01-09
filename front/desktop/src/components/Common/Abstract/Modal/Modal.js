import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Modal.css'
import { icon } from './../../../../helpers/Icon'
import loader from './../../../../img/loader.gif';
// react-native

// react-dom (what we'll use here)



class Modal extends Component {

    closeModal = (e) => {
        /* istanbul ignore next */
        if (!this.state.loading) {
            this.props.close();
        }
    }

    /* istanbul ignore next */
    renderModalContent() {
        throw new Error("Modal needs to be extended");
    }


    render() {
        if (this.props.data) {
            return (
                <div id="modal">
                    <div className="modalBackground" onClick={this.closeModal}>
                    </div>
                    <div className="modalContent">
                        <div className="relative">
                            {this.state.loading ? (
                                <div className="loaderContainer">
                                    <img src={loader} alt="loader" />
                                </div>

                            ) :
                                (<div>
                                    <div id="modalCloseButton" className="closeModalContainer" onClick={this.closeModal}>
                                        {icon.getUiIcon('closeWhite', 'closeModal')}
                                    </div>
                                    {this.renderModalContent()}
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }

}

export default observer(Modal);
