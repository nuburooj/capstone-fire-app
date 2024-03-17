import { Link, useMatch, useResolvedPath } from "react-router-dom"

function NavBar(){
    return (
    
    <nav className="nav">
        <Link to='/' className="site-title">
            Fire
        </Link>
        <ul>
           <CustomLink to="/">Home</CustomLink>
           <CustomLink to="/genres">Genres</CustomLink>
           <CustomLink to="/post">Post</CustomLink>
           <CustomLink to="/me">ME</CustomLink>  
        </ul>
    </nav>
    )
}

function CustomLink({to, children, ...props }){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname })
    return(
        <li className={isActive === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default NavBar;