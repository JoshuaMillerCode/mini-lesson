import '../../App.css';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <h1 className="title">Trello</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout