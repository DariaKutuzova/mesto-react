import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = useRef('');

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
                           defaultValue={''}
                    />
                    <span id="avatar-input-error" className="popup__input-error"/>
                </>
            }/>
    );
}

export default EditAvatarPopup;