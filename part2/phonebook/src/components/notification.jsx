const Notification = ({message, errorMessage}) => {
    if (message === null) {
        return null
    }

    return (
        <div>
            <div className='notification'>
                {message}
            </div>
            <div className='error'>
                {errorMessage}
            </div>
        </div>
    )
}

export default Notification