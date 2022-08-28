import React, { useState } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import EditTicketForm from "./EditTicketForm";
import TicketDetail from "./TicketDetail";

function TicketControl() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formVisibleOnPage: false,
  //     mainTicketList: [],
  //     selectedTicket: null,
  //     editing: false
  //   };
  // }

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);

  const handleClick = () => {
    if (this.state.selectedTicket != null) {
      setFormVisibleOnPage(false);
      // this.setState({
      //   // formVisibleOnPage: false,
      //   selectedTicket: null,
      //   editing: false
      // });
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleDeletingTicket = (id) => {
    const newMainTicketList = mainTicketList.filter(
      (ticket) => ticket.id !== id
    );

    setMainTicketList(newMainTicketList);
    // this.setState({
    //   mainTicketList: newMainTicketList,
    //   selectedTicket: null
    // });
  };

  const handleEditClick = () => {
    this.setState({ editing: true });
  };

  const handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = mainTicketList
      .filter((ticket) => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);

      setMainTicketList(editedMainTicketList);
    // this.setState({
    //   mainTicketList: editedMainTicketList,
    //   editing: false,
    //   selectedTicket: null,
    // });
  };

  const handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = mainTicketList.concat(newTicket);
    // this.setState({ mainTicketList: newMainTicketList });
    setMainTicketList(newMainTicketList)
    setFormVisibleOnPage(false);
  };

  const handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(
      (ticket) => ticket.id === id
    )[0];
    this.setState({ selectedTicket: selectedTicket });
  };

  let currentlyVisibleState = null;
  let buttonText = null;
  if (this.state.editing) {
    currentlyVisibleState = (
      <EditTicketForm
        ticket={this.state.selectedTicket}
        onEditTicket={handleEditingTicketInList}
      />
    );
    buttonText = "Return to Ticket List";
  } else if (this.state.selectedTicket != null) {
    currentlyVisibleState = (
      <TicketDetail
        ticket={this.state.selectedTicket}
        onClickingDelete={handleDeletingTicket}
        onClickingEdit={handleEditClick}
      />
    );
    buttonText = "Return to Ticket List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = (
      <NewTicketForm onNewTicketCreation={handleAddingNewTicketToList} />
    );
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = (
      <TicketList
        onTicketSelection={handleChangingSelectedTicket}
        ticketList={mainTicketList}
      />
    );
    buttonText = "Add Ticket";
  }
  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={handleClick}>{buttonText}</button>
    </React.Fragment>
  );
}

export default TicketControl;
