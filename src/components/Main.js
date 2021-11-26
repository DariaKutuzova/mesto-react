import {useState, useEffect, useContext} from 'react';
import api from '../utils/Api';
import Card from './Card';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    // const [userName, setUserName] = useState('');
    // const [userDescription, setUserDescription] = useState('');
    // const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    //Подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        Promise.all([api.getAllCards(), api.getApiUserInfo()])
            .then(([allCards, userData]) => {
                // setUserName(userData.name);
                // setUserDescription(userData.about);
                // setUserAvatar(userData.avatar)

                setCards(allCards);

            })
            .catch((err) => {
                console.log(`${err}`);
            });
    }, []);


    return (
        <main className="content">
            <section className="profile page__item">
                <div className="profile__avatar-container">
                    <button onClick={onEditAvatar} className="profile__avatar-edit" />
                    <img src={currentUser.avatar} alt={`Аватар пользователя ${currentUser.name}`} className="profile__avatar"/>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Изменить имя">
                        </button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить фото"/>
            </section>

            <section className="elements page__item" aria-label="Фотогалерея">
                {cards.map(card =>
                    <Card card={card} key={card._id} onCardClick={onCardClick}/>
                )}
            </section>
        </main>
    );
}

export default Main;