
export const isNameValid = (name) => {
    let testName = /^[a-zA-Z ]*$/;
    return testName.test(name);
};

export const isEmailValid = (email) => {
    let testEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    return testEmail.test(email);
};
