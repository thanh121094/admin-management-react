import React from 'react';

const BidList = ({bids, goBack}) => {
    return (
        !bids.length ?
            <p className="alert alert-warning text-center">No bids found for the merchants.</p>
            :
            <div className="bid-list">
                <div className="responsive-table">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Car Title</th>
                            <th>Amount</th>
                            <th>Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bids.map(bid =>
                            <tr key={bid.id}>
                                <td>{bid.id}</td>
                                <td>{bid.carTitle}</td>
                                <td>{formatAmount(bid.amount)}</td>
                                <td>{formatDate(bid.created)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
    )
};

function formatAmount(amount) {
    return '\u20AC' + amount.toLocaleString();
}

function formatDate(date) {
    return new Date(date).toString();
}

export default BidList;