import { Link, NavLink } from "react-router-dom";
import menu from "../assests/menu.png";

const Sidebar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid ps-5">
          <Link className="navbar-brand text-white" to="/">
            Intern House
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <img src={menu} className="menu" alt="menu" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white-50 active"
                  aria-current="page"
                  to="/"
                >
                  Job Postings
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link text-white-50

"
                  to="/post-job"
                >
                  Post a Job
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Sidebar;
