import React from 'react';
import { convertUnixDate, validateTextFields } from '../Utils/Utils';

export default function AddList(props) {
    const toggleFields = show => {
        if (show) {
            document.getElementById('add-list-new').style.display = 'block';
            document.getElementById('add-list').style.display = 'none';
        } else {
            document.getElementById('add-list-new').style.display = 'none';
            document.getElementById('add-list').style.display = 'block';
        }
    }

    const resetFields = fields => {
        for (var i=0; i<fields.length;i++) {
            fields[i].style.border ='1px solid #bdbbbb';
            fields[i].value = '';
        }
    }

    const addNewList = props => {
        const name = document.getElementsByName("name")[0],
            desc = document.getElementsByName("desc")[0];

        if (validateTextFields([name, desc]) > 0) {
            return;
        }

        fetch("/lists/new", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                name: name.value,
                description: desc.value
            })
        })
        .then(response => response.json())
        .then(response => {
            props.action(props.listCount + 1);
            toggleFields(false);
            resetFields([name, desc]);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="list-container">
            <div id="add-list">
                <h3 id="add-new-title">Add new</h3>
                <span id="plus-button" className="plus" onClick={() => toggleFields(true)}></span>
            </div>
            <div id="add-list-new">
                <input placeholder="Enter name of list" name="name" type="text" />
                <h5 className="add-new-date">{convertUnixDate(new Date()/1000)}</h5>
                <input placeholder="Enter description" type="text" name="desc" />
                <button className="add" onClick={() => addNewList(props)}>Add</button>
            </div>
        </div>
    );
}
