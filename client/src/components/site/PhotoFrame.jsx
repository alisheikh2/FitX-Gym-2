/**
 * Consistent fixed-ratio photo frame. The source fills the existing frame
 * without letterboxing; objectPosition can keep a subject in view when a
 * portrait image is used in a landscape slot.
 */
export default function PhotoFrame({
  src,
  alt,
  width,
  height,
  className = '',
  imageClassName = '',
  objectPosition = '50% 50%',
  loading = 'lazy'
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        style={{ objectPosition }}
        className={`block h-full w-full object-cover ${imageClassName}`}
      />
    </div>
  );
}
