import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: [],
    list: this.props.list,
  };

  //GET THE LIST
  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState,
      });
    }
  }

  //OPEN CLOSE
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  //CHANGE ICON
  handleAngle = () =>
    this.state.open ? (
      <div
        style={{
          fontWeight: "900",
          color: "red",
          cursor: "pointer",
        }}
      >
        -
      </div>
    ) : (
      <div
        style={{
          fontWeight: "900",
          color: "red",
          cursor: "pointer",
        }}
      >
        +
      </div>
    );

  renderList = () =>
    this.state.list
      ? this.state.list.map((value) => (
          <ListItem key={value._id} style={{ padding: "10px 0" }}>
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
               
                onChange={this.handleToggle(value._id)}
                checked={this.state.checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  handleToggle = (value) => () => {
    const { checked } = this.state;
    //entering array of checked and checking the index
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked,
      },
      () => {
        //promise
        //passing back props to SHOP COMPONENT
        this.props.handleFilters(newChecked);
      }
    );
  };

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem onClick={this.handleClick} style={{ padding: "10px" }}>
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
              style={{
                cursor: "pointer",
                position: "relative",
                left: "-25px",
                top: "-20px",
              }}
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
