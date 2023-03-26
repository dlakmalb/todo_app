const Navbar = ({ onclickLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand">Todo App</span>
            </div>
            <div className="navbar-collapse container-fluid d-flex justify-content-end">
                <div className="navbar-nav">
                    <a className="nav-link cursor" onClick={onclickLogout}>
                        Logout
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
