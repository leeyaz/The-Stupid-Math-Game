function Button({children, color="primary", onClick}) {
    return <button className={"btn btn-" + color} onClick={onClick}>{children}</button>
}

export default Button;