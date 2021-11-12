import avatar from '../images/avatar.jpg';

function Main() {
    function handleEditAvatarClick() {
        console.log('something')
        document.querySelector('.popup_type_avatar').classList.add('popup_opened');
    }
    function handleEditProfileClick() {
        document.querySelector('.popup_type_profile').classList.add('popup_opened');
    }
    function handleAddPlaceClick() {
        document.querySelector('.popup_type_add-place').classList.add('popup_opened');
    }

    return (
        <main className="content">
            <section className="profile page__item">
                <div className="profile__avatar-container">
                    <button onClick={handleEditAvatarClick} className="profile__avatar-edit" />
                    <img src={avatar} alt="Аватар" className="profile__avatar"/>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">Жак-Ив Кусто</h1>
                        <button onClick={handleEditProfileClick} className="profile__edit-button" type="button" aria-label="Изменить имя">
                        </button>
                    </div>
                    <p className="profile__description">Исследователь океана</p>
                </div>
                <button onClick={handleAddPlaceClick} className="profile__add-button" type="button" aria-label="Добавить фото"/>
            </section>

            <section className="elements page__item" aria-label="Фотогалерея">
            </section>
            <div className="popup popup_type_profile">
                <div className="popup__container">
                    <form action="#" className="popup__form popup__form_type_prifile" name="change-profile">
                        <h2 className="popup__form-header">Редактировать профиль</h2>
                        <input type="text" placeholder="Имя Фамилия" className="popup__input popup__input_value_name"
                               id="name-input" name="name" minLength="2" maxLength="40" required/>
                        <span id="name-input-error" className="popup__input-error"/>
                        <input type="text" placeholder="Род деятельности"
                               className="popup__input popup__input_value_job"
                               id="job-input" name="info" minLength="2" maxLength="200" required/>
                        <span id="job-input-error" className="popup__input-error"/>
                        <button className="popup__button" type="submit">Сохранить</button>
                    </form>
                    <button className="popup__close popup__close_type_profile" type="button" aria-label="Закрыть"/>
                </div>
            </div>
            <div className="popup popup_type_add-place">
                <div className="popup__container">
                    <form action="#" className="popup__form popup__form_type_add" name="add-form">
                        <h2 className="popup__form-header">Новое место</h2>
                        <input type="text" placeholder="Название" className="popup__input popup__input_value_place"
                               id="place-input" name="name" minLength="2" maxLength="30" required/>
                        <span id="place-input-error" className="popup__input-error"/>
                        <input type="url" placeholder="Ссылка на картинку"
                               className="popup__input popup__input_value_link"
                               id="link-input" name="link" required/>
                        <span id="link-input-error" className="popup__input-error"/>
                        <button className="popup__button popup__button_type_add" type="submit">Создать</button>
                    </form>
                    <button className="popup__close popup__close_type_add" type="button" aria-label="Закрыть"/>
                </div>
            </div>
            <div className="popup popup_type_open-image">
                <div className="popup__open-image">
                    <img src="#" alt="#" className="popup__image"/>
                    <p className="popup__image-title"/>
                    <button className="popup__close popup__close_type_image" type="button" aria-label="Закрыть"/>
                </div>
            </div>
            <div className="popup popup_type_confirm">
                <div className="popup__container popup__container_type_confirm">
                    <form action="#" className="popup__form popup__form_type_confirm" name="confirm-form">
                        <h2 className="popup__form-header">Вы уверены?</h2>
                        <button className="popup__button popup__button_type_confirm" type="submit">Да</button>
                    </form>
                    <button className="popup__close popup__close_type_confirm" type="button" aria-label="Закрыть"/>
                </div>
            </div>
            <div className="popup popup_type_avatar">
                <div className="popup__container popup__container_type_avatar">
                    <form action="#" className="popup__form popup__form_type_avatar" name="avatar-form">
                        <h2 className="popup__form-header">Обновить аватар</h2>
                        <input type="url" placeholder="https://somewebsite.com/someimage.jpg"
                               className="popup__input popup__input_value_link popup__input_type_notlast"
                               id="avatar-input"
                               name="avatar" required/>
                        <span id="avatar-input-error" className="popup__input-error"/>
                        <button className="popup__button popup__button_type_avatar" type="submit">Создать</button>
                    </form>
                    <button className="popup__close popup__close_type_add" type="button" aria-label="Закрыть"/>
                </div>
            </div>
        </main>
    );
}

export default Main;