import avatar from '../images/avatar.jpg';
import React from 'react';
import api from '../utils/Api';

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getAllCards(), api.getApiUserInfo()])
            .then(([cards, userData]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar)
                // userInfo.setUserInfo(userData);
                // ownerId = userData._id;

                // cardList.renderItems(cards);
            })
            .catch((err) => {
                console.log(`${err}`);
            });
    }, [userName, userDescription, userAvatar]);

    return (
        <main className="content">
            <section className="profile page__item">
                <div className="profile__avatar-container">
                    <button onClick={props.onEditAvatar} className="profile__avatar-edit" />
                    <img src={userAvatar} alt={`Аватар пользователя ${userName}`} className="profile__avatar"/>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="Изменить имя">
                        </button>
                    </div>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="Добавить фото"/>
            </section>

            <section className="elements page__item" aria-label="Фотогалерея">
            </section>
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
        </main>
    );
}

export default Main;