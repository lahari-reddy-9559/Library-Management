export default function Contact(){
    return(
        <div className="container">
            <h1 className="text-primary">Contact Us</h1>
            <p>We'd love to hear from you. Reach out to us for any queries or information</p>
            <div className="row">
                <div className="col-md-6">
                    <div className="container">
                        <p>Address</p>
                        <p>123 Learning Street , Education city , Knowledgw park , 560001</p>
                    </div>
                    <div className="container">
                        <p>Phone</p>
                        <p>+91 98765 43210</p>
                    </div>
                    <div className="container">
                        <p>Email</p>
                        <p>info@brightfutureacademy.com</p>
                    </div>
                    <div className="container">
                        <p>Office Hours</p>
                        <p>Monday - Saturday : 9:00AM - 6:00PM</p>
                    </div>
                </div>
                <div className="col">
                <div className="shadow p-2">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="name" className="form-label" > Name </label>
                                    <br />
                                    <input type="text" className="form-control mb-2" placeholder="Enter your name"></input>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label"> Email </label>
                                    <input type="email" className="form-control mb-2" placeholder="Enter your email"></input>
                                </div>
                            </div>
                            <div className="">
                                    <label htmlFor="subject" className="form-label"> Subject </label>
                                    <input type="text" className="form-control mb-2" placeholder="Enter subject"></input>
                            </div>
                            <div className="">
                                    <label htmlFor="Message" className="form-label"> message </label>
                                    <textarea className="form-control mb-2" placeholder="Enter your message" rows='5'></textarea>
                            </div>
                            <button className="btn btn-primary">Send message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}