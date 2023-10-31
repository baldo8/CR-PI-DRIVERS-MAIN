const validate = (values) => {

    const regexNationality = /^[A-Za-z\s]+$/;
    const regexNameandSurname = /^[A-Za-z]+$/;
    const regexImage =/^(http|https):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/[\w\-./?%&=]*)?$/;
    const errors = {}
    
    if (!values.name) {
        errors.name = "Name is required";
      } else if (!regexNameandSurname.test(values.name)) {
        errors.name = "Name must contain only letters";
      } else if (values.name.length < 3) {
        errors.name = "Name must have at least 3 letters";
      }
    
      if (!values.surname) {
        errors.surname = "Surname is required";
      } else if (!regexNameandSurname.test(values.surname)) {
        errors.surname = "Surname must contain only letters";
      } else if (values.surname.length < 3) {
        errors.surname = "Surname must have at least 3 letters";
      }
    
    
     if (!values.nationality) {
     errors.nationality = "Nationality is required";
    } else if (!regexNationality.test(values.nationality)) {
     errors.nationality = "Nationality must contain only letters and spaces";
    }

     if (!values.image) {
     errors.image = "Image is required";
     } else if (!regexImage.test(values.image)) {
     errors.image = "Invalid image URL";
     }
     if (!values.dob) {
        errors.dob = "Date of birth is required";
      } else {
        const currentDate = new Date();
        const dobDate = new Date(values.dob);
        let age = currentDate.getFullYear() - dobDate.getFullYear();
        const monthDiff = currentDate.getMonth() - dobDate.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
          age--;
        }
    
        if (age < 18) {
          errors.dob = "Must be at least 18 years old";
        }
      }
    if(!values.description) {
        errors.description = "Description is required"
    }
    if(values.teams.length === 0) {
        errors.teams = "Need to add at least one team"
    }
    return errors
}
export default validate