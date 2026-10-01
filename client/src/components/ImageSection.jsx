import { ArrowRight, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IMAGE_ITEMS = [
  {
    id: 1,
    title: "Modern Workplace",
    category: "Workplace",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=85",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: 2,
    title: "Career Growth",
    category: "Career",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000&auto=format&fit=crop&q=85",
  },
  {
    id: 3,
    title: "Professional Team",
    category: "Professionals",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&auto=format&fit=crop&q=85",
  },
  {
    id: 4,
    title: "Learning Together",
    category: "Learning",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=85",
  },
  {
    id: 5,
    title: "Team Collaboration",
    category: "Workplace",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=85",
  },
];

const ImageSection = () => {
  const navigate = useNavigate();

  const goToGallery = () => {
    navigate("/gallery");
  };

  return (
    <section className="bg-white px-4 py-6 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
      <div className="mx-auto w-full max-w-7xl">
        {/* SECTION HEADER */}
        <div className="mb-8 flex flex-col items-center gap-5 text-center sm:mb-10">
          <div>
            {/* Small Label */}
            <div className="mb-3 flex items-center justify-center gap-2">
              <div className="h-1 w-8 rounded-full bg-[#30AFFF]" />

              <span className="text-xs font-bold uppercase tracking-wider text-[#159FEF] sm:text-sm">
                CareerNova Gallery
              </span>

              <div className="h-1 w-8 rounded-full bg-[#30AFFF]" />
            </div>

            {/* Heading */}
            <h2 className="text-xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
              Explore Our <span className="text-[#30AFFF]">World</span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
              Discover inspiring moments, professional journeys, workplace
              culture and experiences from the CareerNova community.
            </p>
          </div>
        </div>

        {/* IMAGE GRID */}
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[240px] sm:gap-5 lg:grid-cols-4 lg:auto-rows-[200px] lg:gap-6">
          {IMAGE_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              // onClick={goToGallery}
              aria-label={`View ${item.title} in gallery`}
              className={`group relative min-h-[220px] overflow-hidden rounded-2xl bg-gray-200 text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#30AFFF]/20 sm:min-h-[240px] lg:min-h-0 lg:rounded-3xl ${
                item.className || ""
              }`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

              {/* Category */}
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-[10px] font-bold text-gray-700 shadow-sm backdrop-blur-md sm:text-xs">
                {item.category}
              </div>

              {/* Center Icon */}
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-white/95 text-[#30AFFF] opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 sm:h-14 sm:w-14">
                <Images size={21} />
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-white sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs text-white/70 sm:text-sm">
                      CareerNova
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:bg-[#30AFFF]">
                    <ArrowRight
                      size={16}
                      className="-rotate-45 text-white transition-transform duration-300 group-hover:rotate-0"
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* BOTTOM CTA */}
        {/* Intentionally kept commented as in your code */}
        {/* <div className="mt-6 flex justify-center sm:mt-8">
          <button
            type="button"
            onClick={goToGallery}
            className="group inline-flex items-center gap-2 rounded-full bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#159FEF] hover:shadow-xl"
          >
            <Sparkles size={16} />

            Explore More Photos

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default ImageSection;
