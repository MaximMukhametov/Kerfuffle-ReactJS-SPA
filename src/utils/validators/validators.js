// Validator for required fields.
export const required = (value) => {
    if (value) return undefined;
    return 'Field is required';
};


// Template to create text length validators for forms.
export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
};