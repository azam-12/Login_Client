import "./home.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import UserIcon from "../../icons/laptop.png"
import VendorIcon from "../../icons/setting.png"
import HDIcon from "../../icons/hdvisual.png"
import ThreeDIcon from "../../icons/3dmodes.png"
import ItemCatalogIcon from "../../icons/itemcatalog.png"
import UserInterfaceIcon from "../../icons/userinterface.png"
import ItemEditIcon from "../../icons/itemedit.png"
import CommunityIcon from "../../icons/community.png"



const Home = () => {
    return (
        <div>
            <Navbar />


            <section className="intro">
                <div className="center">Intro Section yet to be finalized</div>
            </section>



            <section className="features">
                <span className="featureTitle top50">Be Designer plan for...</span>
                <div className="featureContainer">

                    <div className="featureBox">
                        <div className="featureIconTitleCon">
                            <img src={UserIcon} alt="" className="featureIcon" />
                            <span className="featureSpanText">User</span>
                        </div>
                        <p className="featurePara">With our 3D design software, planners and interior designers can bring their furnishing ideas to life. </p>
                        <button className="featureBtn">Start now</button>
                    </div>

                    <div className="featureBox">
                        <div className="featureIconTitleCon">
                            <img src={VendorIcon} alt="" className="featureIcon" />
                            <span className="featureSpanText">Vendor</span>
                        </div>
                        <p className="featurePara">Industrial companies can strengthen their sales and distribution organization with Be Designer.</p>
                        <button className="featureBtn top30">Join Us</button>
                    </div>

                </div>
            </section>




            <section className="services">

                <div className="serviceMainContainer">

                    <div className="serviceInfoContainer">
                        <span className="serviceTitle">Created for Amateurs</span>
                        <p className="serviceInfoPara">Use Be Designer for your interior house design needs without any professional skills</p>
                    </div>


                    <div className="serviceBoxContainer">
                        <div className="serviceBox">
                            <img src={HDIcon} className="serviceIcon" alt="serviceIcon" />
                            <span className="serviceSpan">HD Vizualizations</span>
                            <p className="servicePara">Use the Renders feature to capture your design as a realistic image - this adds shadows, lightning and rich colors to make your work look like a photograph!</p>
                        </div>
                        <div className="serviceBox">
                            <img src={ThreeDIcon} className="serviceIcon" alt="serviceIcon" />
                            <span className="serviceSpan">2D/3D Modes</span>
                            <p className="servicePara">Experiment with both 2D and 3D views as you design from various angles. Arrange, edit and apply custom surfaces and materials.</p>
                        </div>
                        <div className="serviceBox">
                            <img src={ItemCatalogIcon} className="serviceIcon" alt="serviceIcon" />
                            <span className="serviceSpan">5000+ Item Catalog</span>
                            <p className="servicePara">Explore our project gallery and browse our content. We have something great in our store for everyone in our user-generated library.</p>
                        </div>
                    </div>

                    <div className="serviceBoxContainer">
                        <div className="serviceBox">
                            <img src={UserInterfaceIcon} className="serviceIcon" alt="serviceIcon" />
                            <span className="serviceSpan">Easy User Interface</span>
                            <p className="servicePara">The intuitive and user-focused interface provides an easy design process without any tutorials or instructions.</p>
                        </div>
                        <div className="serviceBox">
                            <img src={ItemEditIcon} className="serviceIcon" alt="serviceIcon" />
                            <span className="serviceSpan">Item Editing</span>
                            <p className="servicePara">Apply custom colors, patterns and materials to furniture, walls and floors to fit your interior design style.</p>
                        </div>
                        <div className="serviceBox">
                            <img src={CommunityIcon} className="serviceIcon" alt="serviceIcon" />
                            <span className="serviceSpan">Community</span>
                            <p className="servicePara">Be a part of growing community. Upload and customize projects. Get inspired by designs created by other users.</p>
                        </div>
                    </div>

                    <button className="serviceBtn">Start now</button>

                </div>
            </section>




            <Footer />
        </div>
    )
}

export default Home
