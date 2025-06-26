const Notification = ({message, errorMessage}) => {
    if (!message && !errorMessage) {
        return null
    } else if (message) {
        return (
            <div className="notification">
                {message}
            </div>
        )
    } else if (errorMessage) {
        return (
            <div className="error">
                {errorMessage}
            </div>
        )
    }
}

export default Notification