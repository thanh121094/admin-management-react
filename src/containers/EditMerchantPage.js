import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as merchantActions from '../actions/merchantActions';
// Child components
import MerchantForm from '../components/MerchantForm';

class EditMerchantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formStatus: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // Check if form has any errors
        if (!this.props.merchantForm.syncErrors) {
            // Add current merchant ID and bids to form fields
            let merchant = Object.assign({}, this.props.merchantForm.values, {
                id: this.props.currentMerchant.id,
                bids: this.props.currentMerchant.bids
            });
            this.props.actions.editMerchant(merchant);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            this.props.ajaxLoading ?
                <p className="text-center alert alert-info">Loading merchant...</p>
                :
                !this.props.currentMerchant ?
                    <p className="text-center alert alert-danger">Merchant not found.</p>
                    :
                    <div className="add-merchant">
                        <h1 className="text-center text-capitalize">Edit merchant information</h1>
                        <MerchantForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus}
                                      initialValues={this.props.currentMerchant} goBack={this.props.goBack} />
                    </div>
        )
    }
}

// Find current merchant based on ID passed in URL
function findCurrentMerchant(merchants, id = -1) {
    // Find merchant for given id
    return merchants.find(merchant => {
        return parseInt(merchant.id, 10) === parseInt(id, 10);
    });
}

function mapStateToProps(state, ownProps) {
    let currentMerchant = state.merchants.length ? findCurrentMerchant(state.merchants, ownProps.match.params.id) : null;
    return {
        currentMerchant,
        merchantForm: state.form.merchant,
        ajaxLoading: state.ajaxLoading,
        goBack: ownProps.history.goBack
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(merchantActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMerchantPage);