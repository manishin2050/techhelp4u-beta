import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'Blog'],
    Community: ['Events', 'Forum', 'Meetups', 'Resources'],
    Company: ['About', 'Careers', 'Contact', 'Legal'],
    Social: [
      { icon: Twitter, label: 'Twitter', url: '#' },
      { icon: Linkedin, label: 'LinkedIn', url: '#' },
      { icon: Github, label: 'GitHub', url: '#' },
    ],
  };

  return (
   <footer className="relative border-t border-black/10 bg-black">



      <div className="max-w-6xl mx-auto px-4 py-16 text-white">

        {/* GRID SECTIONS */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold mb-4 text-white">{category}</h3>

              {/* SOCIAL LINKS */}
              {Array.isArray(links) && typeof links[0] === 'object' ? (
                <div className="flex gap-4">
                  {links.map((link, j) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={j}
                        href={link.url}
                        className="hover:text-purple-400 transition-colors"
                        aria-label={link.label}
                      >
                        <Icon size={22} />
                      </a>
                    );
                  })}
                </div>
              ) : (
                /* NORMAL LINKS */
                <ul className="space-y-2">
                  {links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* COPYRIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2025 TechHelp4U. All rights reserved.</p>
        </motion.div>

      </div>
    </footer>
  );
}
