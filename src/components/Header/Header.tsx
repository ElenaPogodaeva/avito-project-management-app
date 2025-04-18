import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.headerContainer}>
        <nav className={style.headerMenu}>
          <ul className={style.menuList}>
            <li>
              <NavLink to="/tasks" className={style.menuLink}>
                Все задачи
              </NavLink>
            </li>
            <li>
              <NavLink to="/boards" className={style.menuLink}>
                Проекты
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
