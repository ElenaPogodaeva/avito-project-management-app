import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import style from './Layout.module.scss';

function Layout() {
  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.main}>
        <div className={style.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
