export const authReducer = (state = null, action) => {
    switch (action.type) {
        case "AUTH":
            localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
            return { ...state, ...action?.data };
        case "LOGOUT":
            localStorage.clear();
            return (state = null);
        default:
            return state;
    }
};
