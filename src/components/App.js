import {useState, useEffect} from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
// import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from '../components/EditProfilePopup'
import EditAvatarPopup from '../components/EditAvatarPopup'
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";


function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getAllCards(), api.getApiUserInfo()])
            .then(([allCards, userData]) => {
                setCurrentUser(userData);
                setCards(allCards);
            })
            .catch((err) => {
                console.log(`${err}`);
            });
        const close = (e) => {
            if(e.keyCode === 27){
                closeAllPopups();
            }
        }
        document.addEventListener('keydown', close)
        return () => document.removeEventListener('keydown', close)
    }, []);

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    function handleDeleteClick(card) {
        setSelectedCard(card);
        setConfirmPopupOpen(true);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setImagePopupOpen(false);
        setConfirmPopupOpen(false);
    }

    //???????????????? ???????? ????????????????????????
    function handleUpdateUser(data) {
        api.patchUserInfo(data)
            .then(
                (data) => {
                    setCurrentUser(data);
                    closeAllPopups();
                })
            .catch((err) => {
                console.log(err);
            })
    }

    //???????????????? ????????????
    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then(
                (data) => {
                    setCurrentUser(data);
                    closeAllPopups();
                })
            .catch((err) => {
                console.log(err);
            })
    }

    //?????????????? ?????????? ????????????????
    function handleCardLike(card) {
        // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
        console.log(err);
    });
    }

    //?????????????? ???????????????? ????????????????
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((elem) => elem !== card);
                setCards(newCards);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    //?????????????? ???????????????????? ????????????????
    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              cards={cards} />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard}
              onClose={closeAllPopups}/>
          <ConfirmPopup onClose={closeAllPopups} isOpen={isConfirmPopupOpen} card={selectedCard} onCardDelete={handleCardDelete}/>
      </div>
      </CurrentUserContext.Provider>
);
}

export default App;

