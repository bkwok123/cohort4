import React from 'react';
import dragon from '../Green-Dragon-Silhouette.svg';
import coronavirus from '../coronavirus.svg';
import camel from '../johnny_automatic_camel_silhouette.svg';
import Unicorn from '../Magical-Unicorn-Silhouette.svg';

import './Svg.css';

class Svg extends React.Component {

	render() {
        return (
            <div>
                <img src={dragon} className="Svgimg icon green spin-clk" alt="dragon" />
                <img src={coronavirus} className="Svgimg red spin-cnclk" alt="coronavirus" />
                <img src={camel} className="Svgimg blue spin-clk" alt="camel" />
                <img src={Unicorn} className="Svgimg purple spin-cnclk" alt="Unicorn" />
            </div>
        )
    }
}

export default Svg;