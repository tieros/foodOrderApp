export const validate = (values) => {
    let errors = {};

    Object.keys(values).forEach((key) => {
        
        if (key === 'name' || 'surname') {
            if (!values[key]) {
                errors[key] = `${key} is required`;
            }
        } if (key === 'email') {
            if(!values[key].match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                errors[key] = 'Invalid email address'
            }
        } if (key === 'phone') {
            if(!values[key].match(/^\d{10}$/)) {
                errors[key] = 'Invalid phone number'
            }
        } if (key === 'address') {
            if(!values[key].length < 10) {
                errors[key] = 'Address is required'
            }
        } if (key === 'password') {
            if(values[key].length < 6) {
                errors[key] = 'Password must be at least 6 characters'
            }
        } if (key === 'verifyPassword') {
            if(values[key] !== values['password']) {
                errors[key] = 'Passwords must match'
            }
        }
      })
      
      return errors;
    };