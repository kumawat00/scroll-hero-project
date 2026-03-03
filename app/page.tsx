"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Home() {

  const headingRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const text = "WELCOME ITZFIZZ".split("")

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {

      const tl = gsap.timeline()

      // LETTER ANIMATION
      tl.from(
        headingRef.current?.children || [],
        {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out"
        }
      )

      // STATS ANIMATION
      tl.from(
        statsRef.current?.children || [],
        {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out"
        },
        "-=0.5"
      )

      
       // IMAGE PARALLAX + PIN
        const scrollTL = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=1200",
    scrub: 1.2,
    pin: true
  }
})

scrollTL
  .to(imageRef.current, {
    y: -450,
    scale: 1.5,
    ease: "none"
  }, 0)
  .to(headingRef.current, {
    opacity: 0,
    y: -150
  }, 0)
  .to(statsRef.current, {
    opacity: 0,
    y: -100
  }, 0)
          

      
    })

    return () => ctx.revert()

  }, [])

  return (
    <div>

      <section
       ref={sectionRef}
       className="h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden"
        >

        <h1
          ref={headingRef}
          className="text-6xl tracking-[15px] font-bold mb-12 flex"
         >
          {text.map((letter, index) => (
            <span key={index} className="inline-block">
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        <div
          ref={statsRef}
          className="flex gap-16 text-center"
         >
          <div>
            <h2 className="text-4xl font-bold">95%</h2>
            <p>Client Satisfaction</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">120+</h2>
            <p>Projects Delivered</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">5+</h2>
            <p>Years Experience</p>
          </div>
        </div>

        <img
          ref={imageRef}
          src="/car.png"
          alt="hero"
          className="w-[450px] mt-10 drop-shadow-2xl"
        />

      </section>

      {/* <section className="h-[200vh] bg-gray-900"></section> */}

    </div>
  )
}