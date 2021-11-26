import {useState, useEffect} from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/Api";


function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const [currentUser, setCurrentUser] = useState({ name: 'Алёша' });

    useEffect(() => {
        Promise.all([api.getAllCards(), api.getApiUserInfo()])
            .then(([allCards, userData]) => {
                setCurrentUser(userData);
                // setUserName(userData.name);
                // setUserDescription(userData.about);
                // setUserAvatar(userData.avatar)
                //
                // setCards(allCards);

            })
            .catch((err) => {
                console.log(`${err}`);
            });
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

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setImagePopupOpen(false);
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}/>
          <Footer />
          <PopupWithForm
              name={'profile'}
              title={'Редактировать профиль'}
              children={
                  <>
                      <input type="text" placeholder="Имя Фамилия" className="popup__input popup__input_value_name"
                             id="name-input" name="name" minLength="2" maxLength="40" required/>
                      <span id="name-input-error" className="popup__input-error"/>
                      <input type="text" placeholder="Род деятельности"
                             className="popup__input popup__input_value_job"
                             id="job-input" name="info" minLength="2" maxLength="200" required/>
                      <span id="job-input-error" className="popup__input-error"/>
                  </>
              }
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              />
          <PopupWithForm
              name={'add-place'}
              title={'Новое место'}
              children={
                  <>
                      <input type="text" placeholder="Название" className="popup__input popup__input_value_place"
                             id="place-input" name="name" minLength="2" maxLength="30" required/>
                      <span id="place-input-error" className="popup__input-error"/>
                      <input type="url" placeholder="Ссылка на картинку"
                             className="popup__input popup__input_value_link"
                             id="link-input" name="link" required/>
                      <span id="link-input-error" className="popup__input-error"/>
                  </>
              }
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}/>
          <PopupWithForm
              name={'avatar'}
              title={'Обновить аватар'}
              children={
                  <>
                      <input type="url" placeholder="https://somewebsite.com/someimage.jpg"
                             className="popup__input popup__input_value_link popup__input_type_notlast"
                             id="avatar-input"
                             name="avatar" required/>
                      <span id="avatar-input-error" className="popup__input-error"/>
                  </>
              }
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}/>
          <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard}
              onClose={closeAllPopups}/>
      </div>
      </CurrentUserContext.Provider>
);
}

export default App;

