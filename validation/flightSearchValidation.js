const validateInputs = (query) => {
    let errors = [];
    if (!query.origin) {
        errors.push('Origin is required');
    }   else if(!query.destination) {
        errors.push('Destination is required');
    }
    return errors;
}
module.exports = validateInputs;