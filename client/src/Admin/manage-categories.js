import React, { Component } from 'react';
import './styles.css'
import FormField from "../components/utils/form-field";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from "../components/utils/from-actions";
import { connect } from "react-redux";
import { getCategory, addCategory } from "../redux/actions/product-action";
import "./styles.css";


class ManageCategories extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
          name: {
            element: "input",
            value: "",
            config: {
              lable: "Category name",
              name: "name_input",
              type: "text",
              placeholder: "Enter category name",
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

      componentDidMount() {
        this.props.dispatch(getCategory());
      }
    
      updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, "category");
        this.setState({
          formError: false,
          formdata: newFormdata,
        });
      };

      showCategoriesItems = () =>
      this.props.products.category
        ? this.props.products.category.map((item, i) => (
            <div className="category_item" key={item._id}>
              {item.name}
            </div>
          ))
        : null;
  

        resetFieldsHandle=()=>{
            const newFormData = resetFields(this.state.formdata, "category");

            this.setState({
              formdata: newFormData,
              formSuccess: true,
            });
        }

        submitForm = (event) => {
            event.preventDefault();
            //Validation
            let dataToSubmitIntilize = generateData(this.state.formdata, "category");
            //General validation
            let formIsValid = isFormValid(this.state.formdata, "category");
            //add publish true
            let dataToSubmit = { ...dataToSubmitIntilize, publish: true };
            //getting the brands from redux
            let existingCategory = this.props.products.category;
        
            if (formIsValid) {
              this.props
                .dispatch(addCategory(dataToSubmit, existingCategory))
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
            <h1>Categories</h1>
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
                    Add category
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
export default connect(mapStateToProps)(ManageCategories);