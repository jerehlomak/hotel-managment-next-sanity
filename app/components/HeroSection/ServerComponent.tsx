import Image from "next/image";

export const heading1 = (
    <>
        <h1 className="font-heading mb-6">Explore Our Exquisite Hotel</h1>
        <p className="text-[#4a4a4a] dark:text-[#ffffea] mb-12 max-w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, officia.
        </p>
        <button className="btn-primary">Get Started</button>
    </>
)

export const section1 = (
    <>
         <div className="md:grid hidden gap-4 grid-cols-1">
        <div className="rounded-2xl overflow-hidden h-48">
          <Image
            src="/images/hero5.avif"
            alt="hero background Image"
            width={300}
            height={300}
            className="img scale-animation"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 h-40">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/hero1.avif"
              alt="hero background Image"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/hero2.avif"
              alt="hero background Image"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>
        </div>
      </div>
    </>
)