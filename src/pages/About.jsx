import image from '/src/images/courses/images (2).jpeg'
export default function About(){
    return(
        <div className="container">
            <h1 className="text-primary mt-3">About us</h1>
            <div className="row mb-9 p-4">
                <div className="col-7">
                    <img src={image} className="borderRadius-5 flex img-fluid w-0 rounded-5"></img>
                </div>
                <div className="col-5 mb-9">
                    <h3>
                        Empowering Minds Through Academic Resources
                    </h3>
                    <p>
                        Welcome to the Academic Digital Knowledge Center. Our library management ecosystem is built to streamline resource sharing, catalog tracking, and student checkouts. We aim to provide an organized digital library space that bridges students with critical data assets and advanced reading materials effortlessly.
                    </p>
                </div>
            </div>
            <div className='row mb-5 mt-5'>
              <div className='col-md-3'>
              <div className='card bg-primary text-white shadow h-100'>
                <div className='card-body'>
                    <h5>Rich Catalog</h5>
                    <p>Explore specialized academic research books.</p>
                </div>
              </div>
              </div>
              <div className='col-md-3'>
              <div className='card bg-success text-white shadow'>
                <div className='card-body'>
                  <h5>Digital Tracking</h5>
                  <p>Up-to-date log records managed instantly.</p>
                </div>
              </div>
              </div>
              <div className='col-md-3'>
              <div className='card bg-warning text-white shadow'>
                <div className='card-body'>
                  <h5>Seamless Returns</h5>
                  <p>Easy book renewals and immediate checkout updates.</p>
                </div>
              </div>
              </div>
              <div className='col-md-3'>
              <div className='card bg-danger text-white shadow'>
                <div className='card-body'>
                  <h5>Overdue Alerts</h5>
                  <p>Automated reminders for pending distributions.</p>
                </div>
              </div>
              </div>
            </div>
          </div>
    )
}