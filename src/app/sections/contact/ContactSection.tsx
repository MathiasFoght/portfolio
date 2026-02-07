"use client";

import React, { useEffect, useRef, useState } from "react";
import DecryptedText from "@/components/DecryptedText/DecryptedText";
import Reveal from "@/app/components/Reveal";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string>("");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
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
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@mail.com"
                  required
                />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-phone">Telephone (optional)</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="What should I know?"
                required
              />
            </div>
            <button
              className={`${styles.submitButton} ${
                status === "sent" ? styles.successButton : ""
              }`}
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sent"
                ? message
                : status === "sending"
                  ? "Sending..."
                  : "Send"}
            </button>
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
