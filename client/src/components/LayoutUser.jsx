// eslint-disable-next-line react/prop-types
const LayoutUser = ({ children }) => {
    return (
        <div>
            Navbar
            <div>{children}</div>
            Footer
        </div>
    )
}

export default LayoutUser