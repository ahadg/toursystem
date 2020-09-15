export const hidealert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
}

export const showAlert = () => {
  //  hidealert();
    const markup = `<div class"alert alert-${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentElement('afterbegin',markup);
    window.setTimeout(hidealert,5000);
}