import './ShowMore.css';
import showmorebtn from '../../images/Rectangle.svg';

function ShowMore(){
    return(
        <div className='showmore__container'>
            <img src={showmorebtn} className='showmore__btn' alt="showmore"></img>
            <span className='showmore__text'>Show More</span>
        </div>
    )
}

export default ShowMore;