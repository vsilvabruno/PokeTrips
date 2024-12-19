import { useState } from "react";

function AddLocationForm() {
  // Today's date in ISO format:
  // - split at the T character to separate date from time in an array
  // - extraction of just the date from that array
  const today = new Date().toISOString().split('T')[0];

  // State to track the user input data
  const [userData, setUserData] = useState({
    country: "",
    town: "",
    dates: {
      from: "",
      to: "",
    },
    notes: "",
  });

  // State to track errors for the inputs
  const [errors, setErrors] = useState({
    country: false,
    town: false,
    dates: {
      from: false,
      to: false,
    },
    notes: false,
  });

  // State to manage alert messages for success or error when submitting the form
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  // State to track if the form has been submitted successfully
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle input changes and update state accordingly
  const addInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // Handle nested "dates" object when "from" or "to" field is updated
    if (name === "from" || name === "to") {
      setUserData({
        ...userData,
        dates: {
          ...userData.dates,
          [name]: value,
        },
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  // Function to handle form submission and validate inputs
  const submitInput = (event) => {
    event.preventDefault();

    // Check if any required fields are empty and set error states
    const newErrors = {
      country: !userData.country,
      town: !userData.town,
      dates: {
        from: !userData.dates.from,
        to: !userData.dates.to,
      },
      notes: !userData.notes,
    };
    // Update error state with the validation result
    setErrors(newErrors);

    // Check if there are any errors in the form
    const hasErrors = Object.values(newErrors).some(
      (error) => typeof error === "boolean" ? error : Object.values(error).includes(true)
    );
    
    // If there are errors, show an error message; otherwise, show success message and lock the submit button, and then print the user input in the console
    if (hasErrors) {
      setAlertMessage("Please fill all fields before submitting");
      setAlertType("error");
    } else {
      setAlertMessage("Form submitted successfully!");
      setAlertType("success");
      setIsSubmitted(true);
      console.info(
        "%cUser Input sucessfully submitted at " +
        new Date().toISOString().split('T')[1] +
        ":" +
        `
        Country: ${userData.country}
        Town: ${userData.town}
        Dates: from ${userData.dates.from} to ${userData.dates.to}
        Notes: "${userData.notes}"
        `,
        "color: green;");
    }
  };

  // "Add location form" component rendering
  return (
    <>
      <div className="form-container">
        <form onSubmit={submitInput}>
          {/* Country Input */}
          <div className="form-element">
            <label>Country:</label>
            <input
              name="country"
              type="text"
              value={userData.country}
              onChange={addInput}
              placeholder="Add a country"
              className={errors.country ? "error" : ""}
            />
          </div>

          {/* Town Input */}
          <div className="form-element">
            <label>Town:</label>
            <input
              name="town"
              type="text"
              value={userData.town}
              onChange={addInput}
              placeholder="Add a town"
              className={errors.town ? "error" : ""}
            />
          </div>

          {/* Date Input */}
          <div className="form-date">
            <div className="form-element">
              <label>From:</label>
              <input
                name="from"
                type="date"
                value={userData.dates.from}
                onChange={addInput}
                className={errors.dates.from ? "error" : ""}
                min={today}
              />
            </div>
            <div className="form-element">
              <label>To:</label>
              <input
                name="to"
                type="date"
                value={userData.dates.to}
                onChange={addInput}
                className={errors.dates.to ? "error" : ""}
                min={userData.dates.from || today}
              />
            </div>
          </div>

          {/* Notes Input */}
          <div className="form-element">
            <label>Notes:</label>
            <textarea
              name="notes"
              value={userData.notes}
              onChange={addInput}
              placeholder="Add some notes"
              className={errors.notes ? "error" : ""}
            />
          </div>

          {/* Alert Message after input */}
          <div className={`form-alert ${alertType}`}>
            {alertMessage}
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-submit-btn" disabled={isSubmitted}>
            {isSubmitted ? "Done!" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddLocationForm;