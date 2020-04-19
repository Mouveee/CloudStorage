import * as React from 'react';

import './About.css';
import './Main.css';

export default function About(props) {
  let classAbout = 'App-about';

  if (props.isMobile) {
    classAbout += ' App-mobile';
  }

  return (
    <div className={classAbout}>
      <div>Marco Huwig</div>
      <div>Gärtnerstraße 31</div>
      <div><br></br></div>
      <div>66117 Saarbrücken</div>

      <div><small>2020</small></div>

      <a className="App-clickable" href='mailto:huwig.marco@gmail.com'>huwig.marco@gmail.com</a>
    </div>
  )

}

