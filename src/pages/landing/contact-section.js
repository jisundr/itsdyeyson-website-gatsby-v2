import React, { useRef, useState, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  faFacebookSquare,
  faTwitterSquare,
  faGithubSquare,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"
import _debounce from "lodash.debounce"
import { faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { store } from "react-notifications-component"
import Recaptcha from "react-google-recaptcha"
import useIntersectionObserver from "@react-hook/intersection-observer"

import TextInput from "../../components/forms/text-input"
import TextAreaInput from "../../components/forms/textarea-input"
import SiteContext from "../../context/SiteContext"
import clsx from "clsx"

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
  const formikRef = useRef(null)
  const { currentAnchor, showHeader, ...site } = useContext(SiteContext)
  const [entry, observerRef] = useIntersectionObserver({
    threshold: 0.5,
  })
  const [loading, setLoading] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "contact-bg.jpg" }) {
        publicURL
      }
    }
  `)

  const updateCurrentAnchor = _debounce(
    () => site.setCurrentAnchor("#contact-section"),
    100
  )

  if (entry.isIntersecting && currentAnchor !== "#contact-section") {
    updateCurrentAnchor()
  }

  const handleFormSubmit = () => {
    const values = (formikRef.current && formikRef.current.values) || null

    if (values) {
      setLoading(true)
      const recaptchaValue =
        (recaptchaRef &&
          recaptchaRef.current &&
          recaptchaRef.current.getValue()) ||
        null

      const encodedData = encode({
        "form-name": "contact",
        "g-recaptcha-response": recaptchaValue,
        ...values,
      })

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedData,
      })
        .then(() => {
          const initialValues =
            (formikRef.current && formikRef.current.initialValues) || {}
          formikRef.current && formikRef.current.resetForm(initialValues)
          recaptchaRef.current && recaptchaRef.current.reset()
          store.addNotification({
            title: "Message Sent",
            message: "Great! Thank you for contacting me.",
            type: "success",
            insert: "top",
            container: "bottom-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 4000,
            },
          })
        })
        .catch(error => alert(error))
        .finally(() => setLoading(false))
    }
  }

  const recaptchaClassName = clsx("block", {
    invisible: currentAnchor !== "#contact-section",
  })

  return (
    <section
      ref={observerRef}
      id="contact-section"
      className="min-h-screen w-full flex"
    >
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

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
            </form>

            <Formik
              innerRef={formikRef}
              initialValues={{
                name: "",
                email: "",
                message: "",
              }}
              validationSchema={contactFormValidationSchema}
              onSubmit={() =>
                recaptchaRef.current && recaptchaRef.current.execute()
              }
            >
              {({ values, handleSubmit, handleChange }) => (
                <Form
                  className="w-full"
                  onSubmit={handleSubmit}
                  name="contact"
                  data-netlify="true"
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

                    <div className={recaptchaClassName}>
                      <Recaptcha
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={RECAPTCHA_KEY}
                        onChange={handleFormSubmit}
                      />
                    </div>

                    <div className="w-full px-3 mb-4 lg:mb-0">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full lg:w-auto"
                      >
                        {(loading && (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        )) ||
                          `Send Message`}
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
