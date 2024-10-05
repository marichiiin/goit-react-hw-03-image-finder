import React, { Component } from 'react';
//import css from './ImageGalleryItem.module.css';




export class ImageGalleryItem extends Component {
    static propTypes = {
        image: PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string,
        }).isRequired,
    };

    state = {
        showModal: false,
    };

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
        }));
    };

    render() {
        return (
            <div>
                <h1>Image Gallery Item</h1>
            </div>
        )
    }
}