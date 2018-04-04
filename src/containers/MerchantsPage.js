import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as merchantActions from '../actions/merchantActions';
// Child components
import MerchantList from '../components/MerchantList';

class MerchantsPage extends React.Component {
    constructor(props) {
        super(props);
        this.deleteMerchant = this.deleteMerchant.bind(this);
    }

    deleteMerchant(id) {
        if (window.confirm('Are you sure you want to delete this merchant?')) {
            this.props.actions.deleteMerchant(id);
        }
    }

    render() {
        return (
            <div className="merchants">
                {
                    this.props.ajaxLoading ?
                        <p className="text-center alert alert-info">Loading merchants...</p>
                        :
                        <MerchantList merchants={this.props.merchants} pages={this.props.pages}
                                      onDeleteMerchant={this.deleteMerchant} currentPage={this.props.currentPage} />
                }
            </div>
        )
    }
}

// Generate list of merchants for given page number
function generateMerchantsByPage(merchants, pageNo) {
    // I assumed showing 10 merchants per page
    const perPage = 10;
    if (merchants.length) {
        // Filter 10 merchants by page number
        return merchants.filter((merchant, i) => {
            return i >= perPage*(pageNo-1) && i < perPage*pageNo;
        });
    }
    return [];
}

function mapStateToProps(state, ownProps) {
    // Set page number to 1 if no number in url params
    let pageNo = ownProps.match.params.pageNo || 1;
    let merchants = generateMerchantsByPage(state.merchants, pageNo);
    return {
        merchants: merchants,
        pages: Math.ceil(state.merchants.length / 10), // Determine number of pages for pagination
        currentPage: pageNo,
        ajaxLoading: state.ajaxLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(merchantActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantsPage);