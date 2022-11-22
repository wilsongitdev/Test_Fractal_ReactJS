import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/my-orders">Mis ordenes</Link>
          </li>
          <li>
            <Link to="/add-order/:id">Agregar/EditarOrden</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;