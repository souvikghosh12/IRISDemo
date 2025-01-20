// components/FileViewer.tsx
import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";

interface FileViewerProps {
  fileSrc: string; // URL of the file to display
  type: "view" | "watch"; // Whether the file should be displayed or downloaded
}

const FileViewer: React.FC<FileViewerProps> = ({ fileSrc, type }) => {
  // Helper function to determine the file type
  const getFileType = (src: string): "image" | "video" | "unknown" => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm", "ogg"];

    const fileExtension = src?.split(".").pop()?.toLowerCase() || "";

    if (imageExtensions.includes(fileExtension)) {
      return "image";
    } else if (videoExtensions.includes(fileExtension)) {
      return "video";
    }
    return "unknown";
  };

  const fileType = getFileType(fileSrc);

  return (
    <div
      className={
        "w-100 h-100 " +
        (type === "view" ? "image-section" : "full-image-section")
      }
    >
      {fileType === "image" && (
        <Image
          width={100}
          height={100}
          src={fileSrc}
          className={`object-cover object-center mt-5 ${
            type === "view" ? "image-section h-auto" : "full-image-section"
          }`}
          alt="Uploaded file"
        />
      )}
      {type === "watch" && fileType === "video" && (
        <ReactPlayer url={fileSrc} controls width="100%" />
      )}
      {type === "view" && fileType === "video" && (
        <Image
          width={100}
          height={100}
          src={"/video_icon_default.png"}
          className="object-cover object-center image-section mt-5"
          alt="Uploaded file"
        />
      )}

      {fileType === "unknown" && (
        null
      )}
    </div>
  );
};

export default FileViewer;
