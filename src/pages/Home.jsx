import React, { useState } from "react";
import { fetchImages } from "../services/model-api";
import LoaderImg from "../Images/loader.gif";

import demoImg from "../Images/anime of cute girl in green dress park.jpg";

const Home = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [gender, setGender] = useState("");
    const [outfit, setOutfit] = useState("");
    const [location, setLocation] = useState("");

    const [imageResult, setImageResult] = useState(demoImg);

    let promptQuery = `anime of cute ${gender} in ${outfit} ${location}`;

    const handleSearch = (event) => {
        setGender(event.target.value);
    };
    const handleSearch2 = (event) => {
        setOutfit(event.target.value);
    };

    const handleSearch3 = (event) => {
        setLocation(event.target.value);
    };

    const fetchData = async () => {
        try {
            setShowLoader(true);
            const imageBlob = await fetchImages(promptQuery);

            const fileReaderInstance = new FileReader();
            // This event will fire when the image Blob is fully loaded and ready to be displayed
            fileReaderInstance.onload = () => {
                let base64data = fileReaderInstance.result;
                setImageResult(base64data);
            };
            // Use the readAsDataURL() method of the FileReader instance to read the image Blob and convert it into a data URL
            fileReaderInstance.readAsDataURL(imageBlob);
            setShowLoader(false);
        } catch (error) {
            // Handle error
            console.error("Error fetching images from API:", error);
            setShowLoader(false);
        }
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        fetchData();
    };
    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-black dark:bg-black">
            <div class="max-w-2xl w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <div class="text-center space-y-2">
                    <h1 class="text-3xl font-bold tracking-tight text-muted-foreground dark:text-white">
                        Anime Style Cute AI Model Generator
                    </h1>
                    <p class="text-muted-foreground dark:text-white">
                        Enter Gender, Outfit and location you want and let our AI generate
                        an anime style Model for you.
                    </p>
                </div>
                <div class="flex items-center space-x-4">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                fetchData();
                            }
                        }}
                        onChange={handleSearch}
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                        type="text"
                        placeholder="Enter Gender..."
                    />
                    <input
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                fetchData();
                            }
                        }}
                        onChange={handleSearch2}
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                        type="text"
                        placeholder="Enter Outfit..."
                    />
                </div>
                <div class="flex items-center space-x-4">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                fetchData();
                            }
                        }}
                        onChange={handleSearch3}
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                        type="text"
                        placeholder="Enter location"
                    />
                    <button
                        onClick={handleGenerate}
                        id="btn"
                        class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible: focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 md:bg-yellow-500 hover:bg-yellow-500 h-11 rounded-md px-8"
                    >
                        Generate
                    </button>
                </div>
                <div class="bg-card dark:bg-muted rounded-xl overflow-hidden">
                    {showLoader ? (
                        <img
                            src={LoaderImg}
                            width="800"
                            height="600"
                            alt="loading"
                            class="w-full h-auto object-cover"
                            styles="aspect-ratio:800/600;object-fit:cover"
                        ></img>
                    ) : (
                        <>
                            {" "}
                            <img
                                src={imageResult}
                                width="800"
                                height="600"
                                alt="image"
                                class="w-full h-auto object-cover"
                                styles="aspect-ratio:800/600;object-fit:cover"
                            ></img>
                            <br />
                            <a download={promptQuery} href={imageResult}>
                                <button
                                    id="btn"
                                    class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible: focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 md:bg-yellow-500 hover:bg-yellow-500 h-11 rounded-md px-8"
                                >
                                    Download
                                </button>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Home;
