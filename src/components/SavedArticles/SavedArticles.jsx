import './savedArticles.css';

function SavedArticles() {
    return(
        <div className='savedArticles__container'>
            <p className='savedArticles__title'>Saved articles</p>
            <p className='savedArticles__numberSaved'>you have 5 saved articles</p>
            <p className='savedArticles__by'>By keywords: <span className='savedArticles__kewords'>Nature, Yellowstone, and 2 other</span></p>
        </div>
    )
}
export default SavedArticles;