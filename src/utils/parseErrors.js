import _ from 'lodash';

export default function(errors) {
    const result = {};

    // We want to create the same object
    // We use lodash to iterate through errors that are passed to this function
    _.forEach(errors, (val, key) => {
        result[key] = val.message;
    });

    return result;
}