import './Preloader.css';

function Preloader() {
    return(
        <div className='preloader__container'>
        <div className='circle-preloader'></div>
        <p className='preloader__paragraph'>Searching For News...</p>
        </div>
    )
}

export default Preloader;