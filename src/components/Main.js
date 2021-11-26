import {useState, useEffect, useContext} from 'react';
import api from '../utils/Api';
import Card from './Card';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    const [cards, setCards] = useState([]);

    //Подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        Promise.all([api.getAllCards(), api.getApiUserInfo()])
            .then(([allCards, userData]) => {

                setCards(allCards);
            })
            .catch((err) => {
                console.log(`${err}`);
            });
    }, []);

    //Функция лайка карточки
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    //Функция удаления карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((elem) => elem !== card);
                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            })
    }

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
                    <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={handleCardLike}
                          onCardDelete={handleCardDelete}/>
                )}
            </section>
        </main>
    );
}

export default Main;