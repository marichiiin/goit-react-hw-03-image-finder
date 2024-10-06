import { ImageGalleryItem  } from "components/ImageGalleryItem/ImageGalleryItem"
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
    return(
        <ul className={`${css.ImageGallery} js-gallery`}>
            {images.map(image => (
                <ImageGalleryItem
                    key={image.id}
                    image={image}
                />
            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ).isRequired
};