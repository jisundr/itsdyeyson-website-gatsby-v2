import React, { useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  faFacebookSquare,
  faTwitterSquare,
  faGithubSquare,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import Recaptcha from "react-google-recaptcha"
import TextInput from "../../components/forms/text-input"
import TextAreaInput from "../../components/forms/textarea-input"

const RECAPTCHA_KEY = process.env.GATSBY_SITE_RECAPTCHA_KEY

const contactFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .required("Please enter your email address")
    .email("Please enter your email address in format: yourname@example.com"),
  message: Yup.string().required("Please enter your message"),
})

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactSection = () => {
  const recaptchaRef = useRef(null)
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "contact-bg.jpg" }) {
        publicURL
      }
    }
  `)

  const handleFormSubmit = values => {
    const recaptchaValue =
      (recaptchaRef &&
        recaptchaRef.current &&
        recaptchaRef.current.getValue()) ||
      null

    const data = {
      "form-name": "contact",
      "g-recaptcha-response": recaptchaValue,
      ...values,
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(data),
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error))
  }

  return (
    <section id="contact-section" className="min-h-screen w-full flex">
      <div
        className="w-auto lg:w-1/3 min-h-screen"
        style={{
          backgroundImage: `url(${data.bg.publicURL})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="w-full lg:w-2/3 min-h-screen bg-white text-primary py-10 lg:py-20">
        <div className="container px-6 lg:px-20">
          <div className="mb-5 lg:mb-10">
            <h1 className="font-heading font-bold text-xl md:text-4xl">
              SAY HI!
            </h1>
            <p className="font-body text-sm lg:text-xl mb-8 lg:mb-16">
              If you want to get in touch, talk to about a project collaboration
              or just say hi, fill-up the form below or send to my e-mail at
              hello@dyeyson.dev and ~let’s talk.
            </p>
            <Formik
              initialValues={{
                name: "",
                email: "",
                message: "",
              }}
              validationSchema={contactFormValidationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ values, handleSubmit, handleChange }) => (
                <Form
                  className="w-full"
                  onSubmit={handleSubmit}
                  data-netlify="true"
                  data-netlify-recaptcha="true"
                  data-netlify-honeypot="bot-field"
                  noValidate
                >
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full lg:w-1/2 px-3 mb-4 lg:mb-8">
                      <TextInput
                        name="name"
                        label="Your Name"
                        placeholder="Juan Dela Cruz"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="w-full lg:w-1/2 px-3 mb-4 lg:mb-8">
                      <TextInput
                        name="email"
                        label="Your Email Address"
                        placeholder="juan.delacruz@gmail.com"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="w-full px-3 mb-4 lg:mb-8">
                      <TextAreaInput
                        name="message"
                        rows={8}
                        label="Your Message"
                        placeholder="Your message here..."
                        value={values.message}
                        onChange={handleChange}
                        noResize
                        // maxLength={1000}
                      />
                    </div>

                    <div className="w-full px-3 mb-6 md:mb-8 ">
                      <Recaptcha ref={recaptchaRef} sitekey={RECAPTCHA_KEY} />
                    </div>

                    <div className="w-full px-3 mb-4 lg:mb-0">
                      <button
                        type="submit"
                        className="inline-block text-sm p-4 leading-none border border-transparent rounded-full mt-4 lg:mt-0 bg-teal-500 text-white hover:bg-teal-600 hover:border-white w-full lg:w-auto"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <h1 className="font-heading font-bold text-xl lg:text-4xl mb-4">
              LET'S CONNECT
            </h1>
            <p className="font-body text-sm lg:text-xl mb-8 lg:mb-16">
              You may follow or connect me thru my social media accounts.
            </p>
            <div>
              <a
                href="mailto:hello@itsdyeyson.dev"
                target="_top"
                className="inline-block mt-4 lg:mt-0 mr-4"
              >
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </a>
              <a
                href="https://facebook.com/itsdyeyson"
                rel="noopener noreferrer"
                target="_blank"
                className="inline-block mt-4 lg:mt-0 mr-4"
              >
                <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
              </a>
              <a
                href="https://twitter.com/itsdyeyson"
                rel="noopener noreferrer"
                target="_blank"
                className="inline-block mt-4 lg:mt-0 mr-4"
              >
                <FontAwesomeIcon icon={faTwitterSquare} size="2x" />
              </a>
              <a
                href="https://github.com/itsdyeyson"
                rel="noopener noreferrer"
                target="_blank"
                className="inline-block mt-4 lg:mt-0 mr-4"
              >
                <FontAwesomeIcon icon={faGithubSquare} size="2x" />
              </a>
              <a
                href="https://www.linkedin.com/in/itsdyeyson/"
                rel="noopener noreferrer"
                target="_blank"
                className="inline-block mt-4 lg:mt-0 mr-4"
              >
                <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
