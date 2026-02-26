"use client";

import React, { useEffect, useRef, useState } from "react";
import DecryptedText from "@/components/DecryptedText/DecryptedText";
import Reveal from "@/app/components/Reveal";
import styles from "./ContactSection.module.css";

type FieldName = "name" | "email" | "phone" | "message";
type FormErrors = Partial<Record<FieldName, string>>;

const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  phone: { max: 30 },
  message: { min: 10, max: 1000 },
} as const;

const FIELD_NAMES: FieldName[] = ["name", "email", "phone", "message"];

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string>("");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  function normalizeValue(value: string) {
    return value.replace(/\s+/g, " ").trim();
  }

  function normalizeMessage(value: string) {
    return value.replace(/[ \t]+/g, " ").trim();
  }

  function validateField(field: FieldName, value: string) {
    const trimmed = value.trim();

    switch (field) {
      case "name": {
        if (!trimmed) return "Name is required.";
        if (trimmed.length < LIMITS.name.min) return "Name is too short.";
        if (trimmed.length > LIMITS.name.max) return "Name is too long.";
        return "";
      }
      case "email": {
        if (!trimmed) return "Email is required.";
        if (trimmed.length > LIMITS.email.max)
          return "Email is too long.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return "Please provide a valid email address.";
        }
        return "";
      }
      case "phone": {
        if (!trimmed) return "";
        if (trimmed.length > LIMITS.phone.max)
          return "Phone number is too long.";
        return "";
      }
      case "message": {
        if (!trimmed) return "Message is required.";
        if (trimmed.length < LIMITS.message.min)
          return "Message is too short.";
        if (trimmed.length > LIMITS.message.max)
          return "Message is too long.";
        return "";
      }
    }
  }

  function validateForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const nextErrors: FormErrors = {};

    FIELD_NAMES.forEach((field) => {
      const value = String(formData.get(field) || "");
      const error = validateField(field, value);
      if (error) nextErrors[field] = error;
    });

    setErrors(nextErrors);
    setFormError(
      Object.keys(nextErrors).length
        ? "Please fix the highlighted fields."
        : "",
    );
    return nextErrors;
  }

  function handleBlur(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.currentTarget;
    if (!FIELD_NAMES.includes(name as FieldName)) return;
    const field = name as FieldName;
    const trimmed = value.trim();

    // Do not show field-level required errors on blur for empty values.
    if (!trimmed) {
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const { [field]: _removed, ...rest } = prev;
        return rest;
      });
      return;
    }

    const error = validateField(field, value);

    setErrors((prev) => {
      if (error) {
        return { ...prev, [field]: error };
      }
      if (!prev[field]) return prev;
      const { [field]: _removed, ...rest } = prev;
      return rest;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setMessage("");

    const form = event.currentTarget;
    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const formData = new FormData(form);
    const payload = {
      name: normalizeValue(String(formData.get("name") || "")),
      email: normalizeValue(String(formData.get("email") || "")),
      phone: normalizeValue(String(formData.get("phone") || "")),
      message: normalizeMessage(String(formData.get("message") || "")),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong.");
      }

      form.reset();
      setStatus("sent");
      setMessage("Thanks for reaching out");
      setErrors({});
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
      resetTimer.current = window.setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Sorry — we couldn’t send your message.",
      );
    }
  }

  const isSending = status === "sending";

  return (
    <section id="contact" className={styles.section}>
      <Reveal>
        <div className={styles.contactPanel}>
          <DecryptedText
            text="Let’s work together"
            speed={120}
            maxIterations={8}
            sequential
            revealDirection="center"
          />
          <p>
            Looking for a software engineer? You’re welcome to reach out via the
            form below.
          </p>
          <div className={styles.contactLinks}>
            <a
              className={styles.contactLink}
              href="https://www.linkedin.com/in/mathias-foght-549197252"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className={styles.contactLink}
              href="https://github.com/MathiasFoght"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a className={styles.contactLink} href="tel:25156137">
              Direct
            </a>
          </div>
          <form
            className={styles.contactForm}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  maxLength={LIMITS.name.max}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={errors.name ? styles.inputError : undefined}
                  required
                />
                {errors.name ? (
                  <p
                    id="contact-name-error"
                    className={styles.fieldError}
                    role="status"
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@mail.com"
                  maxLength={LIMITS.email.max}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  className={errors.email ? styles.inputError : undefined}
                  required
                />
                {errors.email ? (
                  <p
                    id="contact-email-error"
                    className={styles.fieldError}
                    role="status"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-phone">Telephone (optional)</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                maxLength={LIMITS.phone.max}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? "contact-phone-error" : undefined
                }
                className={errors.phone ? styles.inputError : undefined}
              />
              {errors.phone ? (
                <p
                  id="contact-phone-error"
                  className={styles.fieldError}
                  role="status"
                >
                  {errors.phone}
                </p>
              ) : null}
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="What should I know?"
                maxLength={LIMITS.message.max}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                className={errors.message ? styles.inputError : undefined}
                required
              />
              {errors.message ? (
                <p
                  id="contact-message-error"
                  className={styles.fieldError}
                  role="status"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>
            <button
              className={`${styles.submitButton} ${
                status === "sent" ? styles.successButton : ""
              }`}
              type="submit"
              disabled={isSending}
            >
              {status === "sent"
                ? message
                : status === "sending"
                  ? "Sending..."
                  : "Send"}
            </button>
            {formError ? (
              <p className={styles.errorMessage} role="status">
                {formError}
              </p>
            ) : null}
            {status === "error" && message ? (
              <p className={styles.errorMessage} role="status">
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </Reveal>
    </section>
  );
}
