function Display({ value, valid }) {
    if (value) {
        return (
            <div
                className={"alert alert-" + (valid ? "success" : "danger")}
                role="alert"
            >
                {value}
            </div>
        );
    }
    return;
}

export default Display;
