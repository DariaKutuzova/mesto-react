import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useContext} from 'react';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    //Подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_visible' : 'card__like-button_hidden'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick}/>
            <div className="element__caption">
                <h2 className="element__description">{card.name}</h2>
                <div className="element__likes">
                    <button className="element__like" type="button" aria-label="Нравится" />
                    <span className="element__number-of-likes">{card.likes.length}</span>
                </div>
            </div>
            <button className="element__trash" type="button" aria-label="Удалить" />
        </article>
    );
}

export default Card;