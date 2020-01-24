import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const AboutSection = () => {
  const data = useStaticQuery(graphql`
    query {
      ociLogo: file(relativePath: { eq: "oci-logo.png" }) {
        publicURL
      }

      reactLogo: file(relativePath: { eq: "react-logo.png" }) {
        publicURL
      }

      gatsbyLogo: file(relativePath: { eq: "gatsby-logo.png" }) {
        publicURL
      }

      laravelLogo: file(relativePath: { eq: "laravel-logo.png" }) {
        publicURL
      }

      reactJsPhLogo: file(relativePath: { eq: "reactjsph-logo.png" }) {
        publicURL
      }
    }
  `)

  return (
    <section id="about-section" className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-10 md:py-20">
        <div className="w-auto pb-10 md:pb-20">
          <h1 className="font-heading text-xl md:text-4xl text-center">
            I’m <span className="font-bold">Jayson De los Reyes</span>, a
            software engineer based in the Philippines specializes in{" "}
            <span className="font-bold">Front-end Web Development</span> and{" "}
            <span className="font-bold">Mobile App Development</span>.
          </h1>
        </div>

        <div className="w-full pb-5 md:pb-10">
          <div className="w-full md:w-1/2">
            <img
              src={data.ociLogo.publicURL}
              className="h-8 md:h-16 mb-8"
              alt="Orange and Crane Innovations, Inc."
            />
            <h3 className="font-heading font-bold text-xl md:text-2xl pb-4">
              WORK
            </h3>
            <p className="font-body text-sm md:text-xl">
              I currently working as front-end developer at Orange and Crane
              Innovations, Inc.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-end pb-5 md:pb-10">
          <div className="w-full md:w-1/2">
            <div className="flex">
              <img
                src={data.reactLogo.publicURL}
                className="h-8 md:h-16 mb-8 mr-4"
                alt="React JS"
              />
              <img
                src={data.gatsbyLogo.publicURL}
                className="h-8 md:h-16 mb-8 mr-4"
                alt="Gatsby JS"
              />
              <img
                src={data.laravelLogo.publicURL}
                className="h-8 md:h-16 mb-8 mr-4"
                alt="Laravel PHP Framework"
              />
            </div>
            <h3 className="font-heading font-bold text-xl md:text-2xl pb-4">
              TECH STACK
            </h3>
            <p className="font-body text-sm md:text-xl">
              On my past works and projects, I use React and GatsbyJS for
              frontend, Laravel and Firebase for backend, React Native for
              mobile and more …
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full md:w-1/2">
            <img
              src={data.reactJsPhLogo.publicURL}
              className="h-8 md:h-16 mb-8"
              alt="React JS Philippines"
            />
            <h3 className="font-heading font-bold text-xl md:text-2xl pb-4">
              OUTSIDE WORK
            </h3>
            <p className="font-body text-sm md:text-xl">
              During my free time, I spent my time working on freelance or
              personal projects and learn new technologies on web development,
              user experiences and/or product development.
            </p>
            <br />
            <p className="font-body text-sm md:text-xl">
              I also organize tech meetups for ReactJS Philippines and attend
              events from other local tech communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
