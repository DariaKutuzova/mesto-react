import logo from "../images/logo.svg";

function Header() {
    return (
            <header className="header page__item">
                <img src={logo} alt="Лого шапки" className="header__logo" />
            </header>
        );
        }

export default Header;