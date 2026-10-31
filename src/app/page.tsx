
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    description:
      "Discover wonderful books, explore new ideas, and find your next favourite story all in one place.",
    note: "A little library with endless possibilities",
    image:
      "https://images.openai.com/static-rsc-4/klHX1ZV8wzByUt30fWX7ngJsVvFsS1-F25aHZprchbcR9SKYLcrzEnGxfFKY3r2Zpi0Yln-IEFROVRF7kCXU-obzQlaEP_ZbcCA6YWkkUUeuiEejwEq8Wign2qlGng8GgzTnWdkG9IoUoQyvYhBwY86mIuaHt-csQLJeNV53B68nLRzOMMFX-RaipSdiclyp?purpose=fullsize",
  },
  {
    description:
      "Give your favourite books another journey. Share the stories you love with fellow readers.",
    note: "Your bookshelf can inspire someone else",
    image:
      "https://images.openai.com/static-rsc-4/cypnn2ZpmifyztAn3Mbyl7f8BnL1NNnKn8U5LLBwt2-shvIhCGxadqy8XfU7KJ1gf8l9pGVV8XMvQ7def1q4xVnx2Dv6garOjYPv-6T1gjyliSKwfKPNE3dhHGLGzLBATJ1a7WadCbzL4EbulnCcvni1U-EaKSOfeThSeW7AIHNSy9U668bJkUuDm0ioG3yW?purpose=fullsize",
  },
  {
    description:
      "Choose a book, enjoy every page, and return it for the next reader to discover.",
    note: "Read together, grow together",
    image:
      "https://images.openai.com/static-rsc-4/casUBirv1mpq_jeIzlkhCtcq9k0bInHucNCABQR_J1gUXzHVGnJ7VljWJ6tPYrnLd9MYY4zBtF3KacULRgMD5bAZWgZD33LziUVpfwpHBvkktFpvMYKtRD97nR9t9sjnw-ZXpm53FlKItXUhqdN1W0GX0X84toUNymplE6EtYB7SwO4AVW9IoM2xC7HkpoYj?purpose=fullsize",
  },
];

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-[#081810]">
      <section className="booknook-hero w-full">
       <Swiper
  modules={[Autoplay, Pagination, Navigation]}
  slidesPerView={1}
  initialSlide={0}
  loop
  speed={900}
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  }}
  pagination={{ clickable: true }}
  navigation
  className="w-full"
>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative flex min-h-[400px] w-full items-center bg-cover bg-center md:min-h-[440px] lg:min-h-[480px]"
                style={{
                  backgroundImage: `url("${slide.image}")`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#07150E]/95 via-[#07150E]/75 to-[#07150E]/15" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07150E]/45 via-transparent to-[#07150E]/10" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:px-14 lg:px-20">
                  <div className="max-w-3xl">
                    <p className="mb-4 font-[var(--font-playfair)] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C6A58A]/80 sm:text-xs">
                   BookNook
               </p>
                   <h1 className="max-w-2xl font-[var(--font-playfair)] text-[32px] font-bold leading-[1.2] tracking-normal text-[#F8F5EE] sm:text-4xl md:text-[44px] lg:text-5xl">
  {index === 0 ? (
    <>
      Your neighbourhood
      <br />
      <em className="font-normal text-[#B9DCCB]">
        library, online.
      </em>
    </>
  ) : index === 1 ? (
    <>
      Share the books
      <br />
      <em className="font-normal text-[#B9DCCB]">
        on your shelf.
      </em>
    </>
  ) : (
    <>
      Borrow. Read.
      <br />
      <em className="font-normal text-[#B9DCCB]">
        Return. Repeat.
      </em>
    </>
  )}
</h1>
<p className="mt-5 max-w-xl text-[11px] leading-6 text-[#E5E8E1]/90 sm:text-xs sm:leading-7">
  {slide.description}
</p>

          <Link
  href="/books"
  className="mt-7 inline-flex items-center rounded-full bg-[#B9DCCB] px-4 py-2 text-[11px] font-semibold tracking-wide text-[#0C1C15] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#E7F1EA] sm:text-xs"
>
  Browse Books
</Link>

                    <div className="mt-10 text-xs tracking-wide text-[#D8E4DA]/85">
                      {slide.note}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-10 right-7 z-10 font-[var(--font-playfair)] text-sm tracking-[0.2em] text-white/85 sm:right-12 md:right-16">
                  0{index + 1}
                  <span className="mx-2 text-[#B9DCCB]/70">/</span>
                  03
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}
