import React from 'react';
import dragon from '../Green-Dragon-Silhouette.svg';
import coronavirus from '../coronavirus.svg';
import camel from '../johnny_automatic_camel_silhouette.svg';
import unicorn from '../Magical-Unicorn-Silhouette.svg';
import { ReactSvgInjector, Mutate } from "react-svg-injector";

import './Svg.css';

class Svg extends React.Component {

	render() {
        return (
            <div>
                {/* <img src={dragon} className="Svgimg icon green spin-clk" alt="dragon" />
                <img src={coronavirus} className="Svgimg red spin-cnclk" alt="coronavirus" />
                <img src={camel} className="Svgimg blue spin-clk" alt="camel" />
                <img src={Unicorn} className="Svgimg purple spin-cnclk" alt="Unicorn" /> */}                

                <ReactSvgInjector src={dragon} className="Svgimg green spin-clk">
                    <Mutate selector="path" class="dragon" />
                </ReactSvgInjector>
                <ReactSvgInjector src={coronavirus} className="Svgimg red spin-cnclk">
                    <Mutate selector="path" class="coronavirus" />
                </ReactSvgInjector>
                <ReactSvgInjector src={camel} className="Svgimg blue spin-clk">
                    <Mutate selector="path" class="camel" />
                </ReactSvgInjector>
                <ReactSvgInjector src={unicorn} className="Svgimg purple spin-cnclk">
                    <Mutate selector="path" class="unicorn" />
                </ReactSvgInjector>                                                
                
            </div>
        )
    }
}

export default Svg;