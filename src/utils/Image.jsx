const ImageFull = ({ src, alt = "" }) => {
  return (
    <div className="w-full h-full overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageFull;