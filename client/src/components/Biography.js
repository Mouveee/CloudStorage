import * as React from 'react';

import './Biography.css'

class Biography extends React.Component {
    constructor(props){
        super(props);

        this.state = { visible: this.props.visible }
    }

    render(){
        let classOfContainer = '';

        if (this.state.visible) {
          classOfContainer += 'App-mainVisibile';
        }
    
        if (this.props.isMobile) {
          classOfContainer += ' mobile';
        }

        return(
            <div id='App-mainPage' className={classOfContainer}>
                Vor und während meiner Beschäftigung mit Web Development habe ich viel in der Gastronomie gearbeitet und 
                habe mir dabei einen offenen Umgang mit Menschen angeeignet. Ich habe gern Kundenkontakt und arbeite auch 
                an der Schnittstelle zwischen Beratung und Entwicklung. 
                <br></br>
                Privat beschäftige ich mich viel mit Musik und lese, 
                sowohl Fachliteratur als auch Romane. 
                <br></br>
            </div>
    )}
}

export default Biography;



