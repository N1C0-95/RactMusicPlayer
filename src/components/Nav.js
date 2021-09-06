import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  const libraryStatusHandler = () => {
    setLibraryStatus(!libraryStatus);
  };
  return (
    <nav onClick={libraryStatusHandler}>
      <h1>React Music Player</h1>
      <button>
        {!libraryStatus ? "Mostra Libreria" : "Chiudi Libreria"}
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
