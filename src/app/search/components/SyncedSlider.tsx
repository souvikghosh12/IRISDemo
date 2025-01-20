import React, { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FileViewer from "./FileViewer";

const SyncedSlider = ({
  fetchedData,
  selectedIndex,
  setModal,
}: {
  fetchedData: any;
  selectedIndex: number;
  setModal: (value: boolean) => void;
}) => {
  const mainSliderRef = useRef<Slider | null>(null);
  const thumbSliderRef = useRef<Slider | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [sliderReady, setSliderReady] = useState(false);

  const mainSliderSettings: Settings = {
    asNavFor: sliderReady ? thumbSliderRef.current : undefined,
    ref: mainSliderRef,
    arrows: false,
    fade: true,
    slidesToShow: 1,
  };

  const thumbSliderSettings: Settings = {
    asNavFor: sliderReady ? mainSliderRef.current : undefined,
    ref: thumbSliderRef,
    slidesToShow: 4,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "10px",
    arrows: false,
  };

  useEffect(() => {
    setSliderReady(true);
    return () => setSliderReady(false);
  }, []);

  useEffect(() => {
    if (sliderReady) {
      mainSliderRef.current?.slickGoTo(selectedIndex);
      thumbSliderRef.current?.slickGoTo(selectedIndex);
    }
  }, [selectedIndex, sliderReady]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModal(false); // Close the modal if clicked outside
      }
    };

    // Add event listener for outside click detection
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className="w-[100%] max-w-[750px] p-5 max-h-fit bg-[#000] mx-auto  relative  rounded-lg z-50"
    >
      <button
        className="absolute top-4 right-5"
        onClick={() => setModal(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14px"
          height="14px"
          viewBox="0 0 15 15"
        >
          <path
            fill="#fff"
            d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
          ></path>
        </svg>
      </button>
      <div className="h-fit ">
        <Slider {...mainSliderSettings}>
          {fetchedData?.map((image: any, index: number) => (
            <div key={index}>
              <FileViewer
                fileSrc={image?.message_media?.media_url}
                type="watch"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div>
        <Slider {...thumbSliderSettings}>
          {fetchedData?.map((image: any, index: number) => (
            <div key={index} className="px-2">
              <FileViewer
                fileSrc={image?.message_media?.media_url}
                type="view"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SyncedSlider;
