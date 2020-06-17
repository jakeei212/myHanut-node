import React, { Component } from "react";
import UserLayout from "../../hoc/user/user-layout";
import "../../hoc/user/user-layout.css";
import MyButton from "../utils/button";
import HistoryBlock from "../utils/history_block";

class UserDashboard extends Component {
  render() {
    const { user } = this.props;
    const { name } = user.authBlyat;
    const { lastname } = user.authBlyat;
    const { email } = user.authBlyat;
    const { history } = user.authBlyat;

    return (
      <UserLayout>
        <div>
          <div className="user_nfo_panel">
            <h1>User information</h1>
            <div>
              <span>{name}</span>
              <span>{lastname}</span>
              <span>{email}</span>
            </div>
            <MyButton
              type="default"
              title="Edit account info"
              linkTo="/user/user_profile"
            />
          </div>
          {user.authBlyat.history ? (
            <div className="user_nfo_panel">
              <h1>History purchases</h1>
              <div className="user_product_block_wrapper">
                <HistoryBlock
                 products={user.authBlyat.history} />
              </div>
            </div>
          ) : null}
        </div>
      </UserLayout>
    );
  }
}

export default UserDashboard;
