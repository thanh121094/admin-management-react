import React from 'react';
import {NavLink} from 'react-router-dom';
// Child components
import Pagination from './Pagination';

const MerchantList = ({merchants, onDeleteMerchant, pages, currentPage}) => {
    return (
        !merchants.length ?
            <p className="alert alert-warning text-center">No merchants found.</p>
            :
            <div className="merchant-list">
                <div className="responsive-table">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Avatar</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Premium</th>
                            <th>Bids</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {merchants.map(merchant =>
                            <tr key={merchant.id}>
                                <td>{merchant.id}</td>
                                <td>{merchant.firstname}</td>
                                <td>{merchant.lastname}</td>
                                <td><img className="avatar" src={merchant.avatarUrl} alt="Merchant Avatar"/></td>
                                <td>{merchant.email}</td>
                                <td>{merchant.phone}</td>
                                <td className="premium">
                                    {
                                        merchant.hasPremium ?
                                            <span className="glyphicon glyphicon-ok"></span>
                                            :
                                            <span className="glyphicon glyphicon-remove"></span>
                                    }
                                </td>
                                <td>
                                    <NavLink to={'/bids/' + merchant.id}>View Bids</NavLink>
                                </td>
                                <td>
                                    <NavLink className="btn btn-primary btn-sm"
                                             to={'/edit/' + merchant.id}>Edit</NavLink>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                            onClick={() => onDeleteMerchant(merchant.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                { /* show pagination if there are more than 1 page */
                    pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>
                }
            </div>
    )
};

export default MerchantList;