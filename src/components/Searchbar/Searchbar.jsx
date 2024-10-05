import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ onSubmit }) => {
    return(
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={onSubmit}>
                <button type="submit" className={css.SearchFormButton}>
                    <FaSearch />
                    <span className={css.SearchFormButtonLabel}>Search</span>
                </button>
                <input 
                    className={css.SearchForminput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="search"
                />   
            </form>
        </header>
    )
}