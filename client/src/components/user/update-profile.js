import React from 'react';
import UserLayout from '../../hoc/user/user-layout'
import UpdatePersonalInfo from './update_personal_nfo'

const UpdateProfile = () => {
    return (
        <UserLayout>
            <h1>Profile</h1>
            <UpdatePersonalInfo/>
        </UserLayout>
    );
};

export default UpdateProfile;