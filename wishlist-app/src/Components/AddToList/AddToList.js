import React from 'react';
import { withRouter } from "react-router-dom";
import { validateTextFields } from '../Utils/Utils';

const AddToList = (props) => {
    const toggleFields = show => {
        if (show) {
            document.getElementById('add-list-item-new').style.display = 'block';
            document.getElementById('add-list-item').style.display = 'none';
        } else {
            document.getElementById('add-list-item-new').style.display = 'none';
            document.getElementById('add-list-item').style.display = 'block';
        }
    }

    const resetFields = fields => {
        for (var i=0; i<fields.length;i++) {
            fields[i].style.border ='1px solid #bdbbbb';
            fields[i].value = '';
        }
    }

    const addNewListItem = props => {
        const name = document.getElementsByName("name")[0],
            price = document.getElementsByName("price")[0],
            url = document.getElementsByName("url")[0],
            { id } = props.match.params;

        if (validateTextFields([name, price, url]) > 0) {
            return;
        }

        fetch(`${process.env.REACT_APP_API_PATH}/list_items/new`, {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                id: id,
                name: name.value,
                price: price.value,
                url: url.value,
                username: localStorage.getItem("username")
            })
        })
        .then(response => response.json())
        .then(response => {
            const { id } = props.match.params;
            props.action(props.listItemCount + 1, id);
            toggleFields(false);
            resetFields([name, price, url]);
        })
        .catch(err => {
            console.log(err);
        });
    }
    return (
        <div className="list-item-container">
            <div id="add-list-item">
                <h3 id="add-new-list-item-title">Add new</h3>
                <span id="plus-button" className="plus" onClick={() => toggleFields(true)}></span>
            </div>
            <div id="add-list-item-new">
                <input placeholder="Enter name of item" name="name" type="text" />
                <input placeholder="Enter price" type="number" name="price" />
                <input placeholder="Enter item url" type="text" name="url" />
                <button className="add-item" onClick={() => addNewListItem(props)}>Add</button>
            </div>
        </div>
    );
}
export default withRouter(AddToList);