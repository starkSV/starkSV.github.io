import React, { useState, useCallback, useEffect } from "react";

// Input field component with icon
const InputField = ({ 
  name, 
  type = "text", 
  label, 
  placeholder, 
  icon, 
  required = false, 
  value, 
  onChange, 
  error,
  disabled = false 
}) => {
  const inputId = `contact-${name}`;
  
  return (
    <label htmlFor={inputId} className="block">
      <span className="text-sm text-gray-300 font-medium">
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </span>
      <div className="mt-2 relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-transparent border rounded-lg text-gray-200 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            error 
              ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
              : 'border-gray-700 focus:ring-blue-500/50 focus:border-blue-500 hover:border-gray-600'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </label>
  );
};

// Textarea component
const TextareaField = ({ 
  name, 
  label, 
  placeholder, 
  rows = 5, 
  required = false, 
  value, 
  onChange, 
  error,
  disabled = false 
}) => {
  const inputId = `contact-${name}`;
  
  return (
    <label htmlFor={inputId} className="block">
      <span className="text-sm text-gray-300 font-medium">
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </span>
      <textarea
        id={inputId}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`mt-2 w-full px-4 py-3 bg-transparent border rounded-lg text-gray-200 placeholder-gray-500 resize-y min-h-[120px] transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          error 
            ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
            : 'border-gray-700 focus:ring-blue-500/50 focus:border-blue-500 hover:border-gray-600'
        }`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </label>
  );
};

// Success message component
const SuccessMessage = ({ onSendAnother }) => (
  <div className="text-center py-8" role="status" aria-live="polite">
    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
    <p className="text-gray-400 mb-6">Thank you for reaching out. I'll get back to you within 24 hours.</p>
    <button
      onClick={onSendAnother}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
    >
      Send Another Message
    </button>
  </div>
);

// Error message component
const ErrorMessage = ({ error, onDismiss, onRetry }) => (
  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg" role="alert">
    <div className="flex items-start gap-3">
      <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-red-400">Failed to send message</h4>
        <p className="text-sm text-red-300 mt-1">{error}</p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={onRetry}
            className="text-xs bg-red-500/20 hover:bg-red-500/30 px-3 py-1.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-400/50"
          >
            Try Again
          </button>
          <button
            onClick={onDismiss}
            className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400/50 rounded"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function Contact({ 
  // EmailJS Configuration - Replace with your actual values
  emailjsConfig = {
    serviceId: "service_swubjt9",    // e.g., "service_abc123"
    templateId: "template_xl5505m",  // e.g., "template_xyz789" 
    publicKey: "h9ZA1tIrtzGXLl1lK"     // e.g., "abcd1234567890"
  },
  fallbackEmail = "shekhar@tech-latest.com"
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  // Load EmailJS script
  useEffect(() => {
    // Check if EmailJS is already loaded
    if (window.emailjs) {
      window.emailjs.init(emailjsConfig.publicKey);
      return;
    }

    // Load EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(emailjsConfig.publicKey);
        console.log('EmailJS initialized successfully');
      }
    };
    script.onerror = () => {
      console.error('Failed to load EmailJS script');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [emailjsConfig.publicKey]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !validateEmail(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  }, []);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Send email with EmailJS
  const sendWithEmailJS = async (data) => {
    if (!window.emailjs) {
      throw new Error('EmailJS service is not available. Please try again later.');
    }

    // Template parameters that will be sent to your email template
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject || 'New Contact Form Message',
      message: data.message,
      to_name: 'Shekhar Vaidya', // Your name
      reply_to: data.email
    };

    try {
      const response = await window.emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      if (response.status !== 200) {
        throw new Error(`EmailJS returned status ${response.status}: ${response.text}`);
      }

      return response;
    } catch (error) {
      // Handle specific EmailJS errors
      if (error.text) {
        throw new Error(`EmailJS Error: ${error.text}`);
      } else if (error.status) {
        throw new Error(`Email service error (${error.status}). Please try again.`);
      } else {
        throw error;
      }
    }
  };

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'subject') { // subject is optional
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus on first error field
      const firstErrorField = document.getElementById(`contact-${Object.keys(newErrors)[0]}`);
      firstErrorField?.focus();
      return;
    }

    setFormState({ submitting: true, submitted: false, error: null });

    try {
      await sendWithEmailJS(formData);
      
      // Success
      setFormState({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      
      console.log('Email sent successfully via EmailJS');
    } catch (error) {
      console.error('EmailJS sending error:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error.message.includes('EmailJS')) {
        errorMessage = error.message;
      } else if (error.message.includes('not available')) {
        errorMessage = 'Email service is temporarily unavailable. Please try refreshing the page.';
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your connection and try again.';
      }
      
      setFormState({ 
        submitting: false, 
        submitted: false, 
        error: errorMessage
      });
    }
  }, [formData, validateField, emailjsConfig]);

  const dismissError = useCallback(() => {
    setFormState(prev => ({ ...prev, error: null }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState({ submitting: false, submitted: false, error: null });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  }, []);

  const retrySubmit = useCallback(() => {
    setFormState(prev => ({ ...prev, error: null }));
  }, []);

  // Icons
  const userIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const emailIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  return (
    <section id="contact" className="py-20 px-6 lg:px-8" role="region" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h2 id="contact-heading" className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? Feel free to reach out.
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0f1011] border border-white/8 rounded-2xl p-6 lg:p-8 shadow-2xl">
            {formState.submitted ? (
              <SuccessMessage onSendAnother={resetForm} />
            ) : (
              <>
                {formState.error && (
                  <ErrorMessage 
                    error={formState.error}
                    onDismiss={dismissError}
                    onRetry={retrySubmit}
                  />
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <fieldset disabled={formState.submitting} className="space-y-6">
                    <legend className="sr-only">Contact Information Form</legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        name="name"
                        label="Name"
                        placeholder="Your full name"
                        icon={userIcon}
                        required
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        disabled={formState.submitting}
                      />

                      <InputField
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="your@email.com"
                        icon={emailIcon}
                        required
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        disabled={formState.submitting}
                      />
                    </div>

                    <InputField
                      name="subject"
                      label="Subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      disabled={formState.submitting}
                    />

                    <TextareaField
                      name="message"
                      label="Message"
                      placeholder="Tell me about your project or just say hello..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      disabled={formState.submitting}
                    />

                    <button
                      type="submit"
                      disabled={formState.submitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-xl disabled:cursor-not-allowed"
                    >
                      {formState.submitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a7.646 7.646 0 100 15.292V12" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>
                  </fieldset>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-gray-500 mb-3">
                    You can also reach me directly at:
                  </p>
                  <a 
                    href={`mailto:${fallbackEmail}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {fallbackEmail}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}