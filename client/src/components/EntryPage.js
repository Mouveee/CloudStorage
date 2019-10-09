import * as React from 'react';

class EntryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  componentDidMount = () => {
    this.setState({ visible: true });
  }

  render() {
    let classHead = this.props.isMobile ? 'App-headMobile' : 'App-head';

    let mainClass = '';
    if (this.state.visible) {
      mainClass += 'App-mainVisibile';
    }

    if (this.props.isMobile) {
      mainClass += ' mobile';
    }

    return (
      <section
        id='App-mainPage'
        className={mainClass}
      >
        <h1 className={classHead} id='App-mainHeader'>

        </h1>

        <section className='App-mainText'>
          Hallo,
          <br></br>
          <br></br>
          mein Name ist Marco Huwig und ich bin begeisterter Junior Devoper im Bereich Web Development.
          Nach einem längeren Ausflug in die Welt der Gastronomie habe ich beschlossen, die von mir im Studium erworbenen
          Fähigkeiten weiter auszubauen und eine berufsqualifizierende Maßnahme bei der Taylorix e.V. zu starten.
          Diese habe ich dieses Jahr erfolgreich beendet und mich dabei auf den Bereich Web Development spezialisiert.
        </section>
      </ section>
    )
  }
}

export default EntryPage;

