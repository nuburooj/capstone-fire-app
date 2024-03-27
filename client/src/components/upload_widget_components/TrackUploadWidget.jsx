import React, { useEffect, useRef } from "react";

function TrackUploadWidget({ onSetTrack }) {
    const widgetRef = useRef(null);

    useEffect(() => {
        if (!window.cloudinary) return;

        widgetRef.current = window.cloudinary.createUploadWidget({
            cloudName: 'dhrdnu95p',
            uploadPreset: 'Track-File',
            sources: ["local", "url"],
            multiple: false,
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Upload Successful:", result.info);
                onSetTrack(result.info.secure_url);
            }
        });
    }, [onSetTrack]);

    const showWidget = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        }
    };

    return (
        <div>
            <button onClick={showWidget} type="button">Upload Track</button>
        </div>
    );
}

export default TrackUploadWidget;