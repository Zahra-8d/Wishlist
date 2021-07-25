import React, { useState, useEffect } from 'react';
import AddList from '../AddList/AddList';
import { convertUnixDate } from '../Utils/Utils';

export default function Lists() {
  const [lists, setLists] = useState([]);
  const [listCount, setListCount] = useState(0);

  const updateListCount = count => {
    if (count !== this.state.listCount) {
      fetch('/lists/list')
      .then(res => res.json())
      .then(res => {
        setLists(res.data)
        setListCount(res.data.length)
      });
    }
  }

  const openList = listId => {
    window.location.assign('/list/' + listId);
  }

  useEffect(() => {
    fetch('/lists/list')
    .then(res => res.json())
    .then(res => {
      setLists(res.data)
      setListCount(res.data.length)
    });
  }, [lists]);

  return (
      <main id="all-lists">
        {(localStorage.getItem("accessLevel") === '1') ? (
          <AddList action={updateListCount} listCount={listCount} />
        ): ''}
        {lists.map(list =>
          (
            <div key={list.id} className="list-container list-item" onClick={() => openList(list.id)}>
              <div className="inner-container">
                <h3>{list.name}</h3>
                <h5>{convertUnixDate(list.date)}</h5>
                <p>{list.description}</p>
              </div>
            </div>
          )
        )}  
    </main>
  );
}