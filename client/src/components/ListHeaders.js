import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("signOut");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  console.log(cookies.Email);
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button onClick={() => setShowModal(true)} className="create">
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal mode="create" setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
