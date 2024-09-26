





class ImageGalleryItem extends Component {
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
        
    }
}