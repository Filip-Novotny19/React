export const validateAndShow = (values, showModal) => {
    const { email, password } = values;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && password && emailRegex.test(email)) {
        showModal();
    }
};