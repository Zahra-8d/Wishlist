export function convertUnixDate(date) {
    return new Date(date * 1000).toLocaleDateString('en-GB') || '';
}

export function validateTextFields(fields) {
    let failedFields = 0;
    for (var i=0; i< fields.length; i++) {
        fields[i].style.border =  (fields[i].value)? '1px solid #bdbbbb': '1px solid red';
        failedFields += (!fields[i].value)? 1: 0;
    }
    return failedFields
}
