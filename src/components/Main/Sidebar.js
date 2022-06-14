const Sidebar = ({ position, children }) => {
    return (
        <div className={position}>
            {children}
        </div>
    )
}

export default Sidebar;