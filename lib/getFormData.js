export function getFormData(formData, ...names) {

    let dataObject = {};

    names?.forEach((el) => {
        let value = formData?.get(el);
        dataObject[el] = value;
    })

    return dataObject;
}