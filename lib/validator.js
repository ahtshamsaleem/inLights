

export const validateName = (event) => {
    const value = event.target.value;
    if (value.trim() === '' || value.length > 25 ) {
        ///addClasses(event);
        return false;
    } else {
       //removeClasses(event)
       return true
    }
    
}

export const validateEmail = (event) => {
    const value = event.target.value;
    if (value.trim() === '' || value.length > 30) {
       // addClasses(event);
        return false;
    } else {
        //removeClasses(event)
        return true;
    }
}

export const validatePhone = (event) => {
    const value = event.target.value;
    if (value.trim() === '' || value.length > 15) {
        //addClasses(event);
        return false;
    } else{
        //removeClasses(event)
        return true;
    }
}

export const validatePassword = (event) => {
    const value = event.target.value;
    if (value.trim() === '' || value.length < 8) {
       // addClasses(event);
        return false;
    } else {
       // removeClasses(event)
        return true;
    }
}

