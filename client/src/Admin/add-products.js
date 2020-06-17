import React, { Component } from "react";
import UserLayout from "../hoc/user/user-layout";

import FormField from "../components/utils/form-field";
import {
  populateOptionFields,
  update,
  generateData,
  isFormValid,
  resetFields,
} from "../components/utils/from-actions";
import { connect } from "react-redux";
import {
  getBrands,
  getCategory,
  addProduct,
  clearProduct,
} from "../redux/actions/product-action";
import "./styles.css";

import FileUpload from "../components/utils/file-upload";
class AddProducts extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          lable: "Item name",
          name: "name_input",
          type: "text",
          placeholder: "Enter item name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          lable: "Item Description",
          name: "description_input",
          type: "text",
          placeholder: "Enter item description",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      price: {
        element: "input",
        value: "",
        config: {
          lable: "Item price",
          name: "price_input",
          type: "number",
          placeholder: "Enter item price",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      brand: {
        element: "select",
        value: "",
        config: {
          lable: "Item Brand",
          name: "brand_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      category: {
        element: "select",
        value: "",
        config: {
          lable: "Item category",
          name: "category_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      frets: {
        element: "select",
        value: "",
        config: {
          lable: "Frets",
          name: "frets_input",
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      available: {
        element: "select",
        value: "",
        config: {
          lable: "Item available",
          name: "available_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showlabel: false,
      },
    },
  };

  updateFields = (newFormdata) => {
    this.setState({
      formdata: newFormdata,
    });
  };

  componentDidMount() {
    const formdata = this.state.formdata;

    this.props.dispatch(getBrands()).then((response) => {
      console.log(response.payload);
      const newFormData = populateOptionFields(
        formdata,
        response.payload, //this.props.products.brands
        "brand" //key
      );
      this.updateFields(newFormData);
    });

    this.props.dispatch(getCategory()).then((response) => {
      const newFormData = populateOptionFields(
        formdata,
        response.payload, //this.props.products.brands
        "category" //key
      );
      this.updateFields(newFormData);
    });
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "products");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, "products");

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
    //check if every went ok
    setTimeout(() => {
      this.setState({
        formSuccess: false,
      });
      this.props.dispatch(clearProduct);
    }, 3000);
  };

  submitForm = (event) => {
    event.preventDefault();
    //Validation
    let dataToSubmitIntilize = generateData(this.state.formdata, "products");
    //General validation
    let formIsValid = isFormValid(this.state.formdata, "products");
    //add publish true
    let dataToSubmit = { ...dataToSubmitIntilize, publish: true };
    console.log(dataToSubmit);

    if (formIsValid) {
      this.props
        .dispatch(addProduct(dataToSubmit))
        .then((otvetOtServera) => {
          console.log(this.props);
          console.log(otvetOtServera);
          if (otvetOtServera.payload.success) {
            //Clean form if saved
            this.resetFieldHandler();
            alert("NEW PRODUCT WAS CREATED");
          } else {
            alert("SOMETHING WENT WRONG");
            this.setState({ formError: true });
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  //Upload images
  imagesHandler = (images) => {
    const newFormData = {
      ...this.state.formdata,
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({
      formdata: newFormData,
    });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>
          <form onSubmit={(event) => this.submitForm(event)}>
            <FileUpload
              imagesHandler={(images) => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />

            <FormField
              id={"name"}
              formdata={this.state.formdata.name}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"description"}
              formdata={this.state.formdata.description}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"price"}
              formdata={this.state.formdata.price}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_devider"></div>
            <h5>Available</h5>
            <FormField
              id={"available"}
              formdata={this.state.formdata.available}
              change={(element) => this.updateForm(element)}
            />
            <div className="form_devider"></div>
            <h5>Brand</h5>
            <FormField
              id={"brand"}
              formdata={this.state.formdata.brand}
              change={(element) => this.updateForm(element)}
            />

            <h5>Category</h5>
            <FormField
              id={"category"}
              formdata={this.state.formdata.category}
              change={(element) => this.updateForm(element)}
            />
            <h5>Frets</h5>
            <FormField
              id={"frets"}
              formdata={this.state.formdata.frets}
              change={(element) => this.updateForm(element)}
            />
            {this.state.formError ? (
              <div className="form_success">Success</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={(event) => this.submitForm(event)}>
              Add product
            </button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(null, mapStateToProps)(AddProducts);
