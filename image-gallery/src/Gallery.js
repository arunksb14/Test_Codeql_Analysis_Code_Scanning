import React, { useEffect, useState } from 'react';
import ImagesSlide from './components/ImagesSlide';
import './Gallery.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let imageData = [];

const Gallery = () => {

    const [slideModal, setSlideModal] = useState(false);
    const [slideImgSrc, setSlideImgSrc] = useState('');
    const [slideNumber, setSlideNumber] = useState(0);
    const [imageList, setImageList] = useState([]);
    const [dataFound, setDataFound] = useState(true);

    useEffect(() => {
        const fetchImageData = async () => {
            const response = await fetch('https://imagedatabase-c1fb7-default-rtdb.firebaseio.com/imageData.json');

            const responseData = await response.json();
            setImageList(responseData);
        }
        
        fetchImageData();
    }, [])

    const getImages = (index) => {
        setSlideModal(true);
        imageData = imageList[index]['images'];
        setSlideImgSrc(imageData[slideNumber]);
    }

    const closeModal = () => {
        setSlideModal(false);
        imageData = [];
    }

    const prevSlide = () => {
        slideNumber === 0 ? setSlideNumber(imageData.length - 1) : setSlideNumber(slideNumber - 1);
        setSlideImgSrc(imageData[slideNumber]);
    }

    const nextSlide = () => {
        slideNumber === imageData.length - 1 ? setSlideNumber(0) : setSlideNumber(slideNumber + 1);
        setSlideImgSrc(imageData[slideNumber]);
    }

    const searchImages = (criteria, text) => {
        let data = {};
        let imageFilteredData = imageList;
        let uniqueData = {};

        uniqueData = [...new Set(imageFilteredData.map((item) => criteria.toLocaleLowerCase() === "brand" ? item["brand"].toLocaleLowerCase() : item["category"].toLocaleLowerCase()))];

        if (Object.values(uniqueData).indexOf(text.toLocaleLowerCase()) > -1) {
            data = [...new Set(imageFilteredData.filter((item) => item[criteria.toLocaleLowerCase()].toLocaleLowerCase() === text.toLocaleLowerCase()))];
            setImageList(data);
            setDataFound(true);
        }
        else {
            setDataFound(false);
            toast.error(criteria + " - " + text + " not found");
        }
    }

    return (
        <>
            <div className={slideModal ? 'slideModal open' : 'slideModal'}>
                <ImagesSlide imageData={slideImgSrc} />
                <CloseIcon className='btnClose' onClick={closeModal} />
                <ArrowBackIosNewIcon className='btnPrev' onClick={prevSlide} />
                <ArrowForwardIosIcon className='btnNext' onClick={nextSlide} />
            </div>
            <SearchBar searchImages={(searchCriteria, searchText) => searchImages(searchCriteria, searchText)} />
            {!dataFound && <ToastContainer />}
            {dataFound && <div className='gallery'>
                {imageList.map((item, index) => {
                    return (
                        <div className='pics' key={imageList['id']} onClick={() => getImages(index)}>
                            <img src={imageList[index]['thumbnail']} title={imageList[index]['title']} style={{ width: '100%' }} />
                        </div>
                    )
                })}
            </div>}
        </>
    )
}

export default Gallery;