import React from 'react';
import { connect } from 'react-redux';
// Child components
import BidList from '../components/BidList';

const BidsPage = ({ajaxLoading, bids, goBack}) => {
    return (
        <div className="bids">
            {
                ajaxLoading ?
                    <p className="text-center alert alert-info">Loading bids...</p>
                    :
                    <div>
                        <button onClick={goBack} className="btn btn-info">
                            <span className="glyphicon glyphicon-arrow-left"></span> Back to merchant list
                        </button>
                        <BidList bids={bids} />
                    </div>
            }
        </div>
    )
};

// Find bids for given merchant
function generateBids(merchants, id = -1) {
    // Find merchant for given ID
    let merchant = merchants.find(merchant => {
        return parseInt(merchant.id, 10) === parseInt(id, 10);
    });
    if (merchant) {
        // Sort merchant bids by created date
        return merchant.bids.sort(function(a, b) {
            return new Date(b.created) - new Date(a.created);
        });
    } else {
        return [];
    }
}

function mapStateToProps(state, ownProps) {
    let bids = state.merchants.length ? generateBids(state.merchants, ownProps.match.params.id) : [];
    return {
        bids,
        ajaxLoading: state.ajaxLoading,
        goBack: ownProps.history.goBack
    }
}

export default connect(mapStateToProps)(BidsPage);