function ImagePopup(props) {
    return (
        <div className={`popup popup_type_open-image ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__open-image">
                <img src={props.card.link} alt={props.card.name} className="popup__image"/>
                <p className="popup__image-title">{props.card.name}</p>
                <button className="popup__close popup__close_type_image" type="button" aria-label="Закрыть"
                        onClick={props.onClose}/>
            </div>
        </div>
    );
}

export default ImagePopup;