import React from 'react';
import UserLayout from '../hoc/user/user-layout'
import ManageBrands from './manage-brands'
import ManageCategories from './manage-categories'
import './styles.css'

const AllCategories = () => {
    return (
        <UserLayout>
            <ManageBrands/>
            <ManageCategories/>
        </UserLayout>
    );
};

export default AllCategories;