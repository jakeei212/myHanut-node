export const validate = (element, formdata = []) => {
  //Initialize error array of messages
  let error = [true, ""];

  //Validation of Email
  if (element.validation.email) {
    //regex validation
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "Must be a valid email" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  //Confirm Password
  if (element.validation.confirm) {
    // if value empty trim all white spaces
    const valid = //password.formdata.validation.confirm match the values
      element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? "Passwords do not match" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  //Validation of Required
  if (element.validation.required) {
    //if value empty trim all white spaces
    const valid = element.value.trim() !== "";
    //create error message if not valid
    const message = `${!valid ? "This field is required" : ""}`;
    //if not valid show msg
    error = !valid ? [valid, message] : error;
  }

  return error;
};

//UPDATE  @fieldID, @data of fieldID,
export const update = (element, formdata, formName) => {
  //Making copy of formdata
  const newFormdata = {
    ...formdata,
  };
  //Making copy of fieldID key
  const newElement = {
    ...newFormdata[element.id],
  };
  //Value of field iD
  newElement.value = element.event.target.value;
  //Checking if user touched input
  if (element.blur) {
    //returns true or false
    let validData = validate(newElement, formdata);
    //first value true or false
    newElement.valid = validData[0];
    //second value the message
    newElement.validationMessage = validData[1];
  }

  //if user touched field element.blur will be false
  newElement.touched = element.blur;
  //Assign new state of  formdata
  newFormdata[element.id] = newElement;

  //copy of formadata
  return newFormdata;
};

//GENERATE
export const generateData = (formdata, formName) => {
  let dataToSubmit = {};
  //loop the formdata email or password all keys
  for (let key in formdata) {
    //if key confirmPassword then dont do it removes confirmPassword value from console and state
    if (key !== "confirmPassword") {
      //email or password = field user input value
      dataToSubmit[key] = formdata[key].value;
    }
  }

  return dataToSubmit;
};

//Validate
export const isFormValid = (formdata, formName) => {
  let formIsValid = true;
  //loop the formdata email or password all keys
  for (let key in formdata) {
    //formata.valid and if true
    formIsValid = formdata[key].valid && formIsValid;
  }
  return formIsValid;
};

//GET OPTIONS SELECT
export const populateOptionFields = (formdata, arrayData = [], field) => {
  const newArray = [];
  const newFormdata = { ...formdata };

  //loop the options
  arrayData.forEach((item) => {
    newArray.push({ key: item._id, value: item.name });
  });
  newFormdata[field].config.options = newArray;
  return newFormdata;
};

//GET OPTIONS SELECT
export const resetFields = (formdata, formName) => {
  const newFormdata = { ...formdata };

  //loop the items
  for (let key in newFormdata) {
    //if single image set it to array
    if (key === "images") {
      newFormdata[key].value = [];
      //if array image set it to string
    } else {
      newFormdata[key].value = "";
    }

    newFormdata[key].valid = false;
    newFormdata[key].touched = false;
    newFormdata[key].validationMessage = "";
  }
  return newFormdata;
};

//update profile
export const populateFields = (formData, fields) => {
  console.log(formData);
  console.log(fields);
  for (let key in formData) {
    formData[key].value = fields[key];
    formData[key].valid = true;
    formData[key].touched = true;
    formData[key].validationMessage = "";
  }
  return formData;
};
