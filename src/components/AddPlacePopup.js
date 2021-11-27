import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();

        onAddPlace({
            link: link,
            name: name
        });
    }

    useEffect(() => {
        if (isOpen) {
            setName('')
            setLink('')
        }
    },[isOpen])

    return (
        <PopupWithForm
            name={'add-place'}
            title={'Новое место'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input type="text" placeholder="Название" className="popup__input popup__input_value_place"
                           id="place-input" name="name" minLength="2" maxLength="30" value={name || ""}
                           onChange={handleChangeName}
                           required/>
                    <span id="place-input-error" className="popup__input-error"/>
                    <input type="url" placeholder="Ссылка на картинку"
                           className="popup__input popup__input_value_link"
                           id="link-input" name="link" value={link || ""} onChange={handleChangeLink} required />
                    <span id="link-input-error" className="popup__input-error"/>
                </>
            }
        />
    );
}

export default AddPlacePopup;