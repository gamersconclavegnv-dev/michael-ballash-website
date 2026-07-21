const PHOTOS = [
  "collage-01.jpeg", // food
  "collage-09.jpg",  // art
  "collage-02.jpeg", // food
  "collage-10.jpg",  // art
  "collage-03.jpg",  // food
  "collage-11.jpg",  // art
  "collage-04.jpg",  // food
  "collage-12.jpg",  // art
  "collage-05.jpeg", // food
  "collage-13.png",  // food/action
  "collage-06.png",  // food/action
  "collage-07.jpeg", // food
  "collage-08.jpeg", // food
  "collage-14.jpeg", // food
  "collage-15.jpeg", // food
];

export default function CollageHero() {
  const photos = PHOTOS.map((filename) => `/images/collage/${filename}`);

  return (
    <div className="collage-hero">
      <div className="collage-grid">
        {photos.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" className={`collage-tile tile-${i + 1}`} />
        ))}
      </div>
      <div className="collage-scrim" />

      <style>{`
        .collage-hero {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .collage-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 2px;
        }

        .collage-tile {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .collage-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(38, 32, 26, 0.15) 0%,
            rgba(38, 32, 26, 0.35) 55%,
            rgba(38, 32, 26, 0.75) 100%
          );
        }

        /* Tablet: fewer columns, show first 12 tiles only */
        @media (max-width: 900px) {
          .collage-hero {
            min-height: 74vh;
          }
          .collage-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(3, 1fr);
          }
          .tile-13, .tile-14, .tile-15 {
            display: none;
          }
        }

        /* Mobile: fewer still, show first 9 tiles only, shorter hero */
        @media (max-width: 600px) {
          .collage-hero {
            min-height: 62vh;
          }
          .collage-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
          }
          .tile-10, .tile-11, .tile-12 {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}