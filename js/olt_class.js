/**
 * This file contains the main class implementing common funtionalities called by each specific tool script,
 *
 * such as fetching, checking and displayind data in the tool page.
 *
 */

// no conflict mode in jQuery
var $j = jQuery.noConflict();

class olt {
  numConstants;
  fields;
  domElements = {};
  inputFields = [];
  data = {};

  constructor(numConstants, fields) {
    this.numConstants = numConstants;
    this.fields = fields;
    this.getDomElements();
    this.getInputFields();
  }

  // retrieve ALL DOM interaction elements
  getDomElements() {
    this.fields.forEach((field) => {
      this.domElements[field] = $j("#olt-" + field);
    });
  }

  // retrieve of INPUT fields
  getInputFields() {
    let inputs = [];

    // get every input field
    // and populate our inputFields array
    // with its id "parsed" to match our fields
    $j(".olt-input").each(function () {
      let field = $j(this).attr("id").split("-")[1];
      inputs.push(field);
    });

    this.inputFields = inputs;

    // debug check
    console.log("inputFields", this.inputFields);
  }

  // display a warning (as a DOM element <p>)
  displayBadInputWarning(field) {
    // <p> warning for bad input
    const badInputWarning = `
      <p class="olt-bad-input-warning">please check your input value</p>
      `;
    this.domElements[field].parent().append(badInputWarning);
  }

  // remove all bad input warning
  removeBadInputWarnings() {
    $j(".olt-bad-input-warning").each(function () {
      $j(this).remove();
      // console.log($j(this));
    });
  }

  /***** fetch user data input *****/
  retrieveData() {
    // debug check
    console.log("domElements", this.domElements);

    let userInputIsOK = true;

    this.fields.forEach((field) => {
      // first, check if field is a defined constant in the specific tool script
      if (field in this.numConstants) {
        this.data[field] = this.numConstants[field];
      } else {
        // otherwise "parse" user input so french comma is accepted as anglosaxon dot for decimal notation
        this.data[field] = this.domElements[field].val().replaceAll(",", ".");
        // and make it a Number
        this.data[field] = Number(this.data[field]);
        // then we check fi the inputs are valid
        if (this.inputFields.includes(field) && isNaN(this.data[field])) {
          this.displayBadInputWarning(field);
          userInputIsOK = false;
        }
      }
    });

    // says if we have a NaN in input fields
    return userInputIsOK;
  }

  /***** display fields in page *****/
  displayOutput(exceptSpecificFields = []) {
    for (let field of this.fields) {
      // special fields are not displayed
      if (!exceptSpecificFields.includes(field)) {
        // Leave user input such as for display
        if (!this.inputFields.includes(field)) {
          // Format numerical output calculated values only as scientific if not easily readable :
          if (
            Math.abs(this.data[field]) >= 10000 ||
            Math.abs(this.data[field]) <= 0.1
          ) {
            // this.domElements[field].val(this.data[field].toExponential(3));
            // this.domElements[field].text(this.data[field].toExponential(3));
            this.domElements[field].html(this.data[field].toExponential(3));
          } else {
            // this.domElements[field].val(this.data[field].toFixed(3));
            // this.domElements[field].text(this.data[field].toFixed(3));
            this.domElements[field].html(this.data[field].toFixed(3));
          }
        } else {
          // display user input such as
          console.log(this.domElements[field].val());
          this.domElements[field].val(this.data[field]);
          // this.domElements[field].html(this.data[field]);
        }
      }
    }
  }
}
