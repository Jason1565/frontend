import React from 'react';
import img10526 from '../../img/1-0526-伤心.png';

function Contact() {
    return (
        <div class="pet-list" style={{marginTop:"100px"}}>
            <h1>Contact Us</h1>
            <p>Feel free to reach out to us via the following methods:</p>

            {/* Contact Information */}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                    <strong>Email:</strong> <a href="mailto:example@example.com">example@example.com</a>
                </li>
                <li>
                    <strong>Phone:</strong> +1234567890
                </li>
                <li>
                    <strong>Address:</strong> 123 Main Street, Anytown, USA
                </li>
                <li>
                    <strong>Social Media:</strong>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li>
                            <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </li>
                    </ul>
                </li>
            </ul>

            {/* Image */}
            <img src={img10526} style={{ width: '10%', position: 'absolute', bottom: 0, right: 0 }} alt="Sad Face" />

            {/* Note about the failed image */}
            <p style={{ color: 'red', fontSize: '12px' }}>
                Note: The image from <a href="https://tse3-mm.cn.bing.net/th/id/OIP-C.0DtkYnC4Bc1y6pDsK7UuhgAAAA?w=148&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" target="_blank" rel="noopener noreferrer">this link</a> failed to load. Please check the URL or try again later.
            </p>
        </div>
    );
}

export default Contact;