function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
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