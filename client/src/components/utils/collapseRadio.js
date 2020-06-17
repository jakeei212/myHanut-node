import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class CollapseRadio extends Component {
  state = {
    open: false,
    value: "0",
  };

  //component did got props
  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState,
      });
    }
  }

  //change toggle
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  //change icon
  handleAngle = () =>
    this.state.open ? (
      <div
        style={{
          fontWeight: "900",
          color: "red",
          cursor: "pointer",
          position: "relative",
          left:"13px",
          top: "-20px",
        }}
      >
        +
      </div>
    ) : (
      <div
        style={{
          fontWeight: "900",
          color: "red",
          cursor: "pointer",
          position: "relative",
          left:"13px",
          top: "-20px",
        }}
      >
        -
      </div>
    );

  //show the prices
  renderList = () =>
    this.props.list
      ? this.props.list.map((value) => (
          <FormControlLabel
            key={value._id}
            value={`${value._id}`}
            control={<Radio />}
            label={value.name}
          />
        ))
      : null;

  //pick the price
  handleChange = (event) => {
    //sending back the props
    this.props.handleFilters(event.target.value);
    //setting the price
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div>
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 23px 10px 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
              style={{
                cursor: "pointer",
                position: "relative",
                left:"-10px",
                top: "-20px",
              }}
            />
           
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseRadio;
