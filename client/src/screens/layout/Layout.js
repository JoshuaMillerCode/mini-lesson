import '../../App.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <h1 className="title">Trello</h1>
        {/* //Will always be displayed */}
      </header>
      <main>
        <Outlet />
        {/* // Where the rest of our components will be displayed */}
      </main>
    </div>
  );
};

export default Layout;
