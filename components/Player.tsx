import { RefObject, useEffect } from "react";

type PlayerProps = {
  dataUrl: string;
  serverName: string;
  iframeRef: RefObject<HTMLIFrameElement>;
  frameStyle: string;
  onEnded: () => void; // Add onEnded prop
};

export const Player = ({
  dataUrl,
  serverName,
  iframeRef,
  frameStyle,
  onEnded, // Destructure onEnded
}: PlayerProps) => {
  // Dynamic Iframe Height
  useEffect(() => {
    const handleHeight = (event: MessageEvent) => {
      if (iframeRef.current && event.data && event.data.type === "iframeHeight") {
        iframeRef.current.style.height = `${event.data.height}px`;
      }
    };
    window.addEventListener("message", handleHeight);
    return () => {
      window.removeEventListener("message", handleHeight);
    };
  }, [iframeRef]);

  // Detect when the iframe's content ends
  useEffect(() => {
    const handleIframeEnd = (event: MessageEvent) => {
      if (
        event.origin === new URL(dataUrl).origin && // Ensure the event is from a trusted source
        event.data.type === "videoEnded" // Custom event type for video ending
      ) {
        onEnded(); // Call onEnded when video ends
      }
    };

    window.addEventListener("message", handleIframeEnd);
    return () => {
      window.removeEventListener("message", handleIframeEnd);
    };
  }, [dataUrl, onEnded]);

  // Iframe Props with fixed width and height
  const iframeProps = {
    allowFullScreen: true,
    scrolling: "no",
    ref: iframeRef,
    title: "Video Player",
    className: `${frameStyle}`,
    width: "1000px", // Manually set the width
    height: "1960px", // Manually set the height
  };

  return (
    <iframe
      src={dataUrl}
      {...iframeProps}
      sandbox={
        serverName === "Filelions to be delete" || serverName === "Streamwish"
          ? "allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-top-navigation allow-forms"
          : undefined
      }
    />
  );
};
