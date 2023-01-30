import React, { useState, useEffect } from "react";
import "./social.css"

const SocialLinks = () => {


    return (
        <nav class="social">
            <ul>
                <li><a
                    href="https://jakeye25.github.io/"
                    target="_blank"
                    rel="noopener noreferrer">Portfolio <i className="fa-solid fa-folder"></i></a></li>
                <li><a href="https://github.com/jakeye25"
                    target="_blank"
                    rel="noopener noreferrer">Github <i className="fa fa-github"></i></a></li>
                <li><a href="https://www.linkedin.com/in/jake-ye-a2365250/"
                    target="_blank"
                    rel="noopener noreferrer">Linkedin <i className="fa fa-linkedin"></i></a></li>
                <li><a href="mailto:jayyeucla@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer">Email <i className="fa-solid fa-envelope"></i></a></li>
            </ul>
        </nav>
    );
}

export default SocialLinks
