import React, { Component } from "react";
import FormField from "../components/utils/form-field";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from "../components/utils/from-actions";
import { connect } from "react-redux";
import { getBrands, addBrand } from "../redux/actions/product-action";
import "./styles.css";

class ManageBrands extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          lable: "Brand name",
          name: "name_input",
          type: "text",
          placeholder: "Enter brand name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
    },
  };

  showCategoriesItems = () =>
    this.props.products.brands
      ? this.props.products.brands.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  componentDidMount() {
    this.props.dispatch(getBrands());
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "brands");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldsHandle = () => {
    const newFormData = resetFields(this.state.formdata, "brands");

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    //Validation
    let dataToSubmitIntilize = generateData(this.state.formdata, "brands");
    //General validation
    let formIsValid = isFormValid(this.state.formdata, "brands");
    //add publish true
    let dataToSubmit = { ...dataToSubmitIntilize, publish: true };
    //getting the brands from redux
    let existingBrands = this.props.products.brands;

    if (formIsValid) {
      this.props
        .dispatch(addBrand(dataToSubmit, existingBrands))
        .then((response) => {
          //check if get success caching from redux when addBrand
          if (response.payload.success) {
            this.resetFieldsHandle();
          } else {
            this.setState({
              formError: true,
            });
          }
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <div className="admin_category_wrapper container">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left ">
            {" "}
            <div className="brands_container">{this.showCategoriesItems()}</div>
          </div>

          <div className="right ">
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="form_success">Success</div>
              ) : null}
              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={(event) => this.submitForm(event)}>
                Add brand
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ManageBrands);
