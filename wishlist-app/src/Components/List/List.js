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
    const checked = document.querySelector('#list-item-id-' + listItemId + ' input[name ="listItemChecked"]').checked,
      checked_by = document.querySelector('#list-item-id-' + listItemId + ' #checked-by-input'),
      check_button = document.querySelector('#list-item-id-' + listItemId + ' #check-item');
    if (checked) {
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
        console.log(response)
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
        <main id="all-list-items">
          {this.state.listItems.map(listItem =>
            (
              <div key={listItem.id} id={'list-item-id-' + listItem.id} className="list-item-container list-instance">
                  <div>
                    <h3>{listItem.name}</h3> 
                    <h3>{'£' + listItem.price}</h3>
                  </div>
                  {
                    listItem.url_image? <img src={listItem.url_image} alt={listItem.url_title} className="list-item-image" height='300' />: <div className="empty-image"></div>
                  }
                  <div className="link-details">
                    <h4>{listItem.url_title || listItem.name}</h4>
                    <h5>{listItem.url_description}</h5>
                  </div>
                  <input 
                    type="checkbox" 
                    name="listItemChecked" 
                    defaultChecked = { listItem.checked ? true : false } 
                    disabled = { listItem.checked ? true : false } 
                    onChange = {() => this.checkItem(listItem.id)}
                  />
                  <div className="checked-details">
                    <input 
                    type="text" 
                    name="checkedBy" 
                    id="checked-by-input"
                    placeholder="Enter your name"
                    />
                    {
                      listItem.checked && listItem.checked_by && localStorage.getItem("accessLevel") === '1'? <p>Checked by: { listItem.checked_by }</p>: ''
                    }
                    <span 
                      id="check-item"
                      className="tick" 
                      onClick={() => this.updateListItem(listItem.id)}>
                    </span>
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