import React from "react";

//Field,functin,field ID
const Formfield = ({ formdata, change, id }) => {
  const showError = () => {
    let errorMessage = null;

    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className="error_label">{formdata.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;
    //check the fomadata object
    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div className="formBlock">
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div className="formBlock">
            <select
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            >
              <option value="">Select one</option>
              {formdata.config.options.map((item) => (
                <option key={item.key} value={item.key}>{item.value}</option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      case "textarea":
        formTemplate = (
          <div className="formBlock">
            <textarea
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default Formfield;
