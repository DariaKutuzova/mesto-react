function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <form action="#" className="popup__form popup__form_type_prifile" name={`${props.name}`}>
                    <h2 className="popup__form-header">{props.title}</h2>
                    {props.children}
                    <button className="popup__button" type="submit">Сохранить</button>
                </form>
                <button onClick={props.onClose} className="popup__close popup__close_type_profile" type="button" aria-label="Закрыть"/>
            </div>
        </div>
    );
}

export default PopupWithForm;