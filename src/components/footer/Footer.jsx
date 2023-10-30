import './footer.css'
import FacebookIcon from '../../icons/footerfb.png';
import InstagramIcon from '../../icons/footerInstagram.png';
import YouTubeIcon from '../../icons/footeryoutube.png';


const Footer = () => {
    return (
        <section className='footer'>
            <div className="footerContainer">
                <div className="footerFirstWrapper">
                    <div className="fLists">
                        <ul className="fList">
                            <li className="fListTitle">Company</li>
                            <li className="fListItem">About Us</li>
                            <li className="fListItem">Legal Information</li>
                            <li className="fListItem">Help Center</li>
                            <li className="fListItem">Contact</li>
                        </ul>
                        <ul className="fList">
                            <li className="fListTitle">Use Cases</li>
                            <li className="fListItem">Home Design Software</li>
                            <li className="fListItem">Bathroom Planner</li>
                            <li className="fListItem">Room Planner</li>
                            <li className="fListItem">Kitchen Planner</li>
                            <li className="fListItem">Office Design</li>
                            <li className="fListItem">Floor Plan Software</li>
                            <li className="fListItem">Floor Plan Creator</li>
                        </ul>
                        <ul className="fList">
                            <li className="fListTitle">Features</li>
                            <li className="fListItem">Automatic Room Generator</li>
                            <li className="fListItem">AI Plan Recognition</li>
                            <li className="fListItem">AR-Driven 3D Interior Projecting Feature</li>
                            <li className="fListItem">Automated Furniture Arrangement</li>
                        </ul>
                    </div>
                </div>

                <div className="footerSecondWrapper">
                    <div className="footerIconContainer">
                        <img src={InstagramIcon} alt="" className="footerIcon" />
                        <img src={YouTubeIcon} alt="" className="footerIcon" />
                        <img src={FacebookIcon} alt="" className="footerIcon" />
                    </div>
                    <div className="fText">&copy; 2023 Be Designer, Inc. All Rights Reserved</div>
                </div>
            </div>
        </section>
    )
}

export default Footer
