import React from 'react';
import { withRouter } from "react-router-dom";
import AddToList from '../AddToList/AddToList';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.updateListItemCheckedCount = this.updateListItemCheckedCount.bind(this);
    this.updateListItemCount = this.updateListItemCount.bind(this);
    this.state = {
      listItems: [],
      ListItemCheckedCount: 0,
      ListItemCount: 0,
      listName: '',
    }
  }

  updateListItemCheckedCount(count, ListId) {
    if (count !== this.state.ListItemCheckedCount) {
      this.getListItemsById();
    }
  }

  updateListItemCount(count, ListId) {
    if (count !== this.state.ListItemCount) {
      this.getListItemsById();
    }
  }

  checkItem(listItemId) {
    const checked = document.querySelector('#list-item-id-' + listItemId + ' .item-checked-details').getAttribute('data-checked'),
      checked_by = document.querySelector('#list-item-id-' + listItemId + ' #checked-by-input'),
      check_button = document.querySelector('#list-item-id-' + listItemId + ' #check-item');
    if (checked === 'false') {
      checked_by.style.display = 'block';
      check_button.style.display = 'block';
    } else {
      checked_by.style.display = 'none';
      check_button.style.display = 'none';
    }
  }

  getListItemsById() {
    const { id } = this.props.match.params;
    fetch("/list_items/list_by_id", {
      "method": "POST",
      "headers": {
          "content-type": "application/json",
          "accept": "application/json"
      },
      "body": JSON.stringify({
        list_id: id
      })
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ 
        listItems: response.items, 
        ListItemCheckedCount: response.items.filter(x => x.checked === 1).length, 
        listItemCount: response.items.length 
      })
    })
    .catch(err => {
        console.log(err);
    });
  }

  updateListItem(listItemId) {
    const { id } = this.props.match.params;
    let checked_by = document.querySelector('#list-item-id-' + listItemId + ' #checked-by-input');
    if (listItemId && checked_by.value) {
      fetch("/list_items/update", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify({
            id: listItemId,
            checked_by: checked_by.value
        })
      })
      .then(response => response.json())
      .then(response => {
        checked_by.style.border ='1px solid #bdbbbb';
        document.querySelector('#list-item-id-' + listItemId + ' #checked-by-input').style.display = 'none';
        document.querySelector('#list-item-id-' + listItemId + ' #check-item').style.display = 'none';
        this.setState({ListItemCheckedCount: this.state.ListItemCheckedCount + 1})
        this.updateListItemCheckedCount(this.state.ListItemCheckedCount + 1, id)
      })
      .catch(err => {
          console.log(err);
      });
    } else {
      checked_by.style.border = '1px solid red';
    }
  }

  componentDidMount() {
      const { id } = this.props.match.params;
      fetch("/lists/get_name", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify({
            id: id
        })
      })
      .then(response => response.json())
      .then(response => {
        this.setState({ listName: response.data[0].name })
      })
      .catch(err => {
          console.log(err);
      });

    this.getListItemsById();
  }

  render() {
    return (
      <div>
        <h2>{this.state.listName}</h2>
        <h3>{ this.state.listItems.length === 0 ? 'No items on the list!' : '' }</h3>
        <main id="all-list-items">
          {this.state.listItems.map(listItem =>
            (
              <div key={listItem.id} id={'list-item-id-' + listItem.id} className="list-item-container">
                <div className="inner-container list-instance">
                  <div className="list-item-name">
                    <a href={listItem.url} target="_blank"><h3>{listItem.name}</h3></a> 
                    <h3>{'£' + listItem.price}</h3>
                  </div>
                  {
                    listItem.url_image? <img src={listItem.url_image} alt={listItem.url_title} className="list-item-image" />: <div className="empty-image"></div>
                  }
                  <div className="link-details">
                  <a href={listItem.url} target="_blank"><h4>{listItem.url_title.substring(0, 70) || listItem.name}</h4></a>
                    <h5>{listItem.url_description? listItem.url_description.substring(0, 70) + '...': ''}</h5>
                  </div>
                  <div className="item-checked-details" data-checked={ listItem.checked === 1 ? true : false } onClick = {() => this.checkItem(listItem.id)} >
                    { listItem.checked ? <p className="promised-message">Promised!</p> : <p className="promised-message">I'll get this!</p> } 
                    <div className="checked-details">
                      <input 
                      type="text" 
                      name="checkedBy" 
                      id="checked-by-input"
                      placeholder="Enter your name"
                      />
                      {
                        listItem.checked && listItem.checked_by && localStorage.getItem("accessLevel") === '1'? <p>by { listItem.checked_by }</p>: ''
                      }
                      <span 
                        id="check-item"
                        className="tick" 
                        onClick={() => this.updateListItem(listItem.id)}>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}  
          {(localStorage.getItem("accessLevel") === '1') ? (
            <AddToList action={this.updateListItemCount} listItemCount={this.state.listItemCount} />
          ): ''}
        </main>
      </div>
    );
  }
}

export default withRouter(List);