import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { emailRegex } from "@/utils/regex";
import * as Yup from "yup";
import { sendContactEmail } from "@/utils/emailAPI";
import { useTranslation } from "next-i18next";
import Container from "@/components/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Textarea, Input } from "@material-tailwind/react";

export default function Contact() {
  const { t } = useTranslation(["forms", "buttons"]);

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("name_required")),
    subject: Yup.string().required(t("subject_required")),
    email: Yup.string()
      .required(t("email_required"))
      .matches(emailRegex, t("email_incorrect")),
    phone: Yup.number(t("phone_incorrect")).optional(),
    message: Yup.string()
      .required(t("message_required"))
      .min(10, t("message_min")),
  });

  const [contactForm, setContactForm] = useState({ ...initialValues });

  const isEmptyForm = Object.values(contactForm).some((k) => k.length < 1);

  const handleFormChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await sendContactEmail(contactForm);
  };



  return (
    <Container>
      <Wrapper>
        <div className="container p-4 my-12 max-w-xl mx-auto flex flex-col flex-1 gap-4">
        <div className="h-full flex justify-between">
            <div className="w-full">
              <div className="bg-offWhite rounded-md">
              <div className="p-6 text-transparent bg-clip-text bg-gradient-to-t from-[#0ba360] to-[#3cba92]">
                <div className="flex flex-row items-center gap-2">
                <i class="fa-solid fa-envelope-open-text"/>
                  <p className=" text-xl text-transparent font-semibold leading-5 ">
                    {t("email_contact")}
                  </p>
                </div>
                <p className=" font-normal text-base leading-6 text-gray-600 my-4">
                  info.troyka@gmail.com
                </p>
              </div>
              </div>
            </div>
          </div>
          <div className="bg-offWhite rounded-md p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-t from-[#0ba360] to-[#3cba92]">
              {t("contact_us")}
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isValid, errors, handleBlur, handleChange }) => (
                <Form onChange={handleFormChange}>
                  {console.log(isValid)}
                  <div className="mb-4">
                    <Input
                      className="bg-white"
                      label={t("firstName")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.name}
                      type="text"
                      id="name"
                      name="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      label={t("email")}
                      error={errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      id="email"
                      name="email"
                      className="bg-white"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      error={errors.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label={t("phoneNumber") + '*'}
                      type="tel"
                      id="phone"
                      name="phone"
                      className="bg-white"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      error={errors.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="subject"
                      name="subject"
                      rows="4"
                      label={t("subject")}
                      className="bg-white"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Textarea
                      error={errors.message}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label={t("message")}
                      id="message"
                      name="message"
                      className="bg-white"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      render={(msg) => (
                        <div className=" text-red-400">{msg}</div>
                      )}
                    />
                  </div>
                  <button
                    disabled={!isValid || isEmptyForm}
                    type="submit"
                    className={`${
                      isValid && !isEmptyForm
                        ? "bg-gradient-to-t from-[#0ba360] to-[#3cba92]"
                        : "bg-gradient-to-t from-[#0ba360] to-[#3cba92]/[0.5]"
                    } 
                    text-white 
                    drop-shadow-lg 
                    font-bold 
                    py-2 
                    px-4 
                    rounded 
                    focus:outline-none 
                    focus:shadow-outline`}
                  >
                    {t("send", { ns: "buttons" })}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "footer",
        "nav",
        "buttons",
        "forms",
        "banner",
      ])),
    },
  };
}
