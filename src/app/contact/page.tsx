'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const SOCIALS = [
  { icon: Github, href: "https://github.com/Alexthethunderboy", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/kelechiugoh", label: "LinkedIn" },
  { icon: Mail, href: "mailto:kelechiugoh@example.com", label: "Email" },
];

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey);
        toast.success("Message transmitted successfully. I'll be in touch.");
        e.currentTarget.reset();
      } else {
        // Fallback for demo/development if env variables aren't set
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Message received (Mock). Configure EmailJS to go live.");
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Transmission failed. Please try connecting via LinkedIn.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 md:pt-32 pb-24">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Info Column */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Let&apos;s build something <span className="text-purple-500">extraordinary</span>.</h1>
              <p className="text-gray-400 text-lg max-w-md">
                Whether you have a specific project in mind or just want to discuss engineering trends, I&apos;m always open to connecting.
              </p>
            </div>
          </motion.div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                <MapPin className="text-purple-400" />
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Location</span>
                <p className="text-gray-300">Lagos, Nigeria (Remote Worldwide)</p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-6">Connect across the web</span>
              <div className="flex gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-8 md:p-12 rounded-3xl bg-[#0a0a1a] border border-white/10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-purple-500/50 transition-colors text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-purple-500/50 transition-colors text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Your Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="What are we building today?"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-purple-500/50 transition-colors text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-5 bg-white text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-3",
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-600 hover:text-white"
                )}
              >
                {isSubmitting ? (
                  "TRANSMITTING..."
                ) : (
                  <>
                    SEND MESSAGE
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
