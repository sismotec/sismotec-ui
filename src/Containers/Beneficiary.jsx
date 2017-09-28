import React, { Component } from 'react';
import {ActionButton} from 'react-popup';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import { connect } from 'react-redux';
 
function hola() {
return(
    <div>
        Hello
        </div>
)
}


<Popup
    className="mm-popup"
    btnClass="mm-popup__btn"
    closeBtn={true}
    closeHtml={null}
    defaultOk="Ok"
    defaultCancel="Cancel"
    wildClasses={false}
    closeOnOutsideClick={true} 
/>

Popup.create({
    className: 'prompt'
});

Popup.alert('Hello, look at me');



export default connect;