function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name}`}>
            <div className="popup__container">
                <form action="#" className="popup__form popup__form_type_prifile" name={`${props.name}`}>
                    <h2 className="popup__form-header">{props.title}</h2>

                    <button className="popup__button" type="submit">Сохранить</button>
                </form>
                <button className="popup__close popup__close_type_profile" type="button" aria-label="Закрыть"/>
            </div>
        </div>
    );
}

export default PopupWithForm;