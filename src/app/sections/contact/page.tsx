'use client';

import type React from 'react';
import { type FormEvent, useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { cn } from '@/lib/utils';
import { FaLinkedin } from 'react-icons/fa';
import styles from './styles.module.css';
import { ScrollAnimation } from '@/app/components/animations/scrollAnimation';

interface ContactFormData {
     name: string;
     phone: string;
     email: string;
     message: string;
}

const ContactSection: React.FC = () => {
     const [state, handleSubmit] = useForm('meojjygk');
     const [buttonText, setButtonText] = useState<string>('Send');
     const [isSuccess, setIsSuccess] = useState<boolean>(false);
     const [formData, setFormData] = useState<ContactFormData>({
          name: '',
          phone: '',
          email: '',
          message: '',
     });
     const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

     useEffect(() => {
          if (state.succeeded) {
               setButtonText('Thank you!');
               setIsSuccess(true);
               setFormData({ name: '', phone: '', email: '', message: '' });
               setErrors({});
               const timer = setTimeout(() => {
                    setButtonText('Send');
                    setIsSuccess(false);
               }, 5000);
               return () => clearTimeout(timer);
          }
     }, [state.succeeded]);

     const validateField = (name: keyof ContactFormData, value: string) => {
          if (!value.trim()) {
               return true;
          }
          if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
               return true;
          } else if (name === 'phone' && !/^\+?[0-9\s-]+$/.test(value)) {
               return true;
          }
          return false;
     };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target as {
               name: keyof ContactFormData;
               value: string;
          };
          setFormData((prev) => ({ ...prev, [name]: value }));
          if (errors[name]) {
               setErrors((prev) => ({
                    ...prev,
                    [name]: validateField(name, value),
               }));
          }
     };

     const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target as {
               name: keyof ContactFormData;
               value: string;
          };
          setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
     };

     const handleSubmitWithValidation = (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const newErrors: Partial<Record<keyof ContactFormData, boolean>> = {};
          let hasError = false;
          const requiredFields: (keyof ContactFormData)[] = ['name', 'email', 'message'];
          requiredFields.forEach((field) => {
               if (validateField(field, formData[field]!)) {
                    newErrors[field] = true;
                    hasError = true;
               }
          });
          setErrors(newErrors);
          if (!hasError) {
               handleSubmit(event);
          }
     };

     return (
          <section className={styles.wrapperContact} id="contact">
               <div className={styles.contactContainer}>
                    <ScrollAnimation animation={'fadeIn'} triggerOnce={false}>
                         <div className={styles.contactContent}>
                              <h1 className={styles.contactHeader}>Contact</h1>
                              <h2 className={styles.contactSubheader}>{"Let's work together."}</h2>
                              <a
                                   href="https://www.linkedin.com/in/mathias-foght-549197252/"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   aria-label="LinkedIn Profile"
                              >
                                   <FaLinkedin size={32} className={styles.linkedinIcon} />
                              </a>
                         </div>
                    </ScrollAnimation>
                    <ScrollAnimation animation={'fadeIn'} triggerOnce={false}>
                         <form
                              className={styles.loginForm}
                              onSubmit={handleSubmitWithValidation}
                              noValidate
                         >
                              <div className={styles.formInputMaterial}>
                                   <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder=" "
                                        autoComplete="name"
                                        className={cn(styles.formControlMaterial, {
                                             [styles.error]: errors.name,
                                        })}
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                   />
                                   <label htmlFor="name">Full Name</label>
                                   <ValidationError
                                        prefix="Name"
                                        field="name"
                                        errors={state.errors}
                                        className="text-red-500 text-xs mt-1"
                                   />
                              </div>
                              <div className={styles.formInputMaterial}>
                                   <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder=" "
                                        autoComplete="tel"
                                        className={styles.formControlMaterial}
                                        value={formData.phone}
                                        onChange={handleChange}
                                   />
                                   <label htmlFor="phone">Phone Number</label>
                              </div>
                              <div className={styles.formInputMaterial}>
                                   <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder=" "
                                        autoComplete="email"
                                        className={cn(styles.formControlMaterial, {
                                             [styles.error]: errors.email,
                                        })}
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                   />
                                   <label htmlFor="email">Email Address</label>
                                   <ValidationError
                                        prefix="Email"
                                        field="email"
                                        errors={state.errors}
                                        className="text-red-500 text-xs mt-1"
                                   />
                              </div>
                              <div className={styles.formInputMaterial}>
                                   <textarea
                                        id="message"
                                        name="message"
                                        placeholder=" "
                                        autoComplete="off"
                                        className={cn(styles.formControlMaterial, {
                                             [styles.error]: errors.message,
                                        })}
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                   />
                                   <label htmlFor="message">Message</label>
                                   <ValidationError
                                        prefix="Message"
                                        field="message"
                                        errors={state.errors}
                                        className="text-red-500 text-xs mt-1"
                                   />
                              </div>
                              <button
                                   type="submit"
                                   className={cn(styles.btn, {
                                        [styles.successText]: isSuccess,
                                   })}
                                   disabled={state.submitting}
                              >
                                   {state.submitting ? 'Sending...' : buttonText}
                              </button>
                         </form>
                    </ScrollAnimation>
               </div>
          </section>
     );
};

export default ContactSection;
