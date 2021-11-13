function PopupWithForm({isOpen, onClose, name, title, children}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_type_${name}`}>
                <form action="#" className={`popup__form popup__form_type_${name}`} name={`${name}`}>
                    <h2 className="popup__form-header">{title}</h2>
                    {children}
                    <button className="popup__button" type="submit">Сохранить</button>
                </form>
                <button onClick={onClose} className="popup__close popup__close_type_profile" type="button" aria-label="Закрыть"/>
            </div>
        </div>
    );
}

export default PopupWithForm;