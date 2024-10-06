import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { getAPI } from '../pixabay-api';
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
//import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    isError: false,
    isEnd: false,
  };

  async componentDidUpdate(_prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;
    //console.log(searchQuery);
    // Fetch new images if the search query or current page changes
    if (prevState.searchQuery !== searchQuery || prevState.currentPage !== currentPage) {
      console.log("before awaiting response from fetchImages");
      await this.fetchImages(searchQuery, currentPage);
    }
  };

  fetchImages = async (searchQuery, currentPage) => {
    //const { searchQuery, currentPage } = this.state;

    //this.setState({ isLoading: true, isError: false });

    try {
      this.setState({isLoading: true});
      const fetchedImages= await getAPI(searchQuery, currentPage);

      console.log(fetchedImages);

      const { totalHits, hits } = fetchedImages;

      // Check if the API returns no images for the seearch query
      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        this.setState({ isLoading: false });
        return;
      }

      // Display a success message when the first page is loaded
      if (currentPage === 1) {
        toast.success(`Horray! We found ${totalHits} images`);
      }

      // Check if all available images have been loaded
      if (currentPage * 12 >= totalHits) {
        this.setState({ isEnd: true});
        toast("We're sorry, but you've reached the end of search results.", {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }

      this.setState(prevState => ({
        images: currentPage === 1 ? hits : [...prevState.images, ...hits],
        isEnd: prevState.images.length + hits.length >= totalHits,
      }));
    } catch (error) {
      // Handle any errors that occur during the API request
      this.setState({ isError: true });
      toast.error('Oops, something went wrong! Reload this page!');
    } finally {
      // Ensure loading state is reset once the API request completes
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchQuery } = this.state;
    const newSearch = e.target.search.value.trim().toLowerCase();

    // if new search string is different from the current search string saved in state
    if (newSearch !== searchQuery) {
      this.setState({ searchQuery: newSearch, currentPage: 1, images: [] });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1}));
    console.log("click")
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className={styles.Appstyle}>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {!isError && images.length > 0 && !isEnd && <Button onClick={this.handleLoadMore} />}
        {isError && <p>Something went wrong. Please try again later.</p>}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }
}


