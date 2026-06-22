function Display({ value, valid }) {
    if (value) {
        return (
            <div
                className={"submit-message alert alert-" + (valid ? "success" : "danger") + 
                    " mx-auto"}
                role="alert"
            >
                {value}
            </div>
        );
    }
    return;
}

export default Display;
