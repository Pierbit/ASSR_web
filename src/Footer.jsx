import React from 'react';
import './assets/components_css/footer.css';
import logo from './assets/components_images/logo_nometa.png'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <p>Sponsored by <strong>NO META</strong></p>
                    <p>Special thanks to <strong>Justkiss</strong> for keeping up the spirit of the blackzone.</p>
                </div>
                <div className="footer-right">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <div className="footer-icons">
                        <a href="https://www.youtube.com/@JustKiss_AO" target="_blank" rel="noopener noreferrer">YouTube</a>
                        <a href="https://discord.gg/fyuZwzTF4F" target="_blank" rel="noopener noreferrer">Discord</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;