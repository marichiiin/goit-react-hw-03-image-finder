import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick }) => {
    return(
        <div className={css.ButtonWrap}>
            <button className={css.Button} onClick={onClick}>
                Load More
            </button>
        </div>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}