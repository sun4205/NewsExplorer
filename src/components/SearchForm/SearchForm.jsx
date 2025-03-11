import './SearchForm.css';

function SearchForm() {
    return(
        <div className='searchForm__container'>
            <h1 className='searchForm__title'>What's going on in the world?</h1>
            <p className='searchForm__description'>Find the latest news on any topic and save them in your personal account.</p>
            <div className='searchForm__controls'>
                <label className='searchForm__label'>
                <input className='searchForm__input' type="text" id="search__input"  placeholder='Enter Topic'></input>
                </label>
                <button className='searchForm__btn'></button>
            </div>
        </div>
    )
}

export default SearchForm;