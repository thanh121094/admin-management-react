import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import * as merchantActions from '../actions/merchantActions';
// Child components
import MerchantForm from '../components/MerchantForm';

class AddMerchantPage extends React.Component {
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
            // Add new ID and empty array of bids to form fields
            let merchant = Object.assign({}, this.props.merchantForm.values, {
                id: this.props.newId,
                bids: []
            });
            this.props.actions.addMerchant(merchant);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            <div className="add-merchant">
                <h1 className="text-center text-capitalize">Add new merchant</h1>
                <MerchantForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus} />
            </div>
        )
    }
}

// Generate ID for new merchant
function generateNewId(merchants) {
    // Clone merchants array
    let sortedMerchants = merchants.slice(0);
    // Sort merchants by ID
    sortedMerchants = sortedMerchants.sort(function(a, b) {
        return b.id - a.id;
    });
    let lastId = sortedMerchants.length ? parseInt(sortedMerchants[0].id, 10) : 0;
    return lastId + 1;
}

function mapStateToProps(state) {
    let newId = generateNewId(state.merchants);
    return {
        merchantForm: state.form.merchant,
        newId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(merchantActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantPage);