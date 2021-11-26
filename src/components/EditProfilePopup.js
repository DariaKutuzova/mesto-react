import PopupWithForm from "./PopupWithForm";
import {useState, useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    //Подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            info: description
        });
    }

    return (
        <PopupWithForm
            name={'profile'}
            title={'Редактировать профиль'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input type="text" placeholder="Имя Фамилия" className="popup__input popup__input_value_name"
                           id="name-input" name="name" minLength="2" maxLength="40" required value={name}
                           onChange={handleChangeName}/>
                    <span id="name-input-error" className="popup__input-error"/>
                    <input type="text" placeholder="Род деятельности"
                           className="popup__input popup__input_value_job"
                           id="job-input" name="info" minLength="2" maxLength="200" required value={description}
                           onChange={handleChangeDescription}/>
                    <span id="job-input-error" className="popup__input-error"/>
                </>
            }
        />
    );
}

export default EditProfilePopup;