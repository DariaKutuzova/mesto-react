import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);

    function handleEditProfileClick() {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(false);
    }

  return (
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
          {/*<PopupWithForm isOpen={isEditProfilePopupOpen}/>*/}
          <ImagePopup
              card={selectedCard}
              isOpen={selectedCard}
              onClose={closeAllPopups}/>
      </div>
);
}

export default App;

