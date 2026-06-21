function Display({ value, valid }) {
    return (
        <div className={"alert alert-"+(valid ? "success" : "danger")} role="alert">
            {value}
        </div>
    );
}

export default Display;
