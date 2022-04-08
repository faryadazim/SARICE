import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import "./attandence.css";

const MultiSelectAll = ({ setemployToBeSearch, setemployToBeSearchName }) => {
  // States
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([{ label: "All", value: "-1" }]);

  useEffect(() => {
    fetch("http://sa-hrm.genial365.com/api/Attandance/EmployeesList", {
      method: "GET",
      headers: {
        Authorization:
          JSON.parse(localStorage.getItem("authUser")).token_type +
          " " +
          JSON.parse(localStorage.getItem("authUser")).access_token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          const realData = data.map((item) => {
            return {
              label: `${item.EnrollNumber}  ` + item.Name,
              value: item.EnrollNumber,
            };
          });
          setOptions(realData);
          setSelectedOptions([{ label: "All", value: "-1" }, ...realData]);
        });
      })
      .catch((error) => console.log("error", error));
    setSelectedOptions([{ label: "All", value: "-1" }, ...options]);
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "-1")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "-1") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "-1"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "-1"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }

    var string = value.map((item) => {
      var stringForResult = item.value.toString();
      return stringForResult;
    });
    var stringForName = value.map((item) => {
      var stringForResultLabel = item.label.toString();
      return stringForResultLabel;
    });

    var theString = string.toString();
    var theStringName = stringForName.toString();
    var theWord = "-1";
    // Output — The word "looking" exists in given string.
    if (theString.indexOf(theWord) !== -1) {
      setemployToBeSearch("-1");
      setemployToBeSearchName("All");
    } else {
      setemployToBeSearch(theString);
      setemployToBeSearchName(theStringName);
    }
  }

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: `All `, value: "-1" }, ...options]}
      placeholderButtonLabel="Employees"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
};

export default MultiSelectAll;
