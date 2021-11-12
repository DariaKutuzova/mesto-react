function ImagePopup() {
    return (
        <div className="popup popup_type_open-image">
            <div className="popup__open-image">
                <img src="#" alt="#" className="popup__image"/>
                <p className="popup__image-title"/>
                <button className="popup__close popup__close_type_image" type="button" aria-label="Закрыть"/>
            </div>
        </div>
    );
}

export default ImagePopup;