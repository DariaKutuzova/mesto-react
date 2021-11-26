import PopupWithForm from "./PopupWithForm";
import {useState, useContext, useEffect, useRef} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const [avatar, setAvatar] = useState('');

    const avatarRef = useRef('');
    
    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input type="url" placeholder="https://somewebsite.com/someimage.jpg"
                           className="popup__input popup__input_value_link popup__input_type_notlast"
                           id="avatar-input"
                           name="avatar" required
                           ref={avatarRef}
                           onChange={handleChangeAvatar}/>
                    <span id="avatar-input-error" className="popup__input-error"/>
                </>
            }/>
    );
}

export default EditAvatarPopup;