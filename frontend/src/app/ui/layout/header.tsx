'use client';

import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';

const MotionButton = motion.create(Button);

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Sobre', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contato', href: '/contact' },
  ];

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: '2rem',
                background: 'linear-gradient(135deg, #000000 0%, #00A86B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                cursor: 'pointer',
                '&:hover': {
                  textShadow: '0 0 20px rgba(0, 168, 107, 0.3)',
                },
              }}
            >
              ♻️ Recicla+
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link href={item.href} style={{ textDecoration: 'none' }}>
                  <MotionButton
                    onMouseEnter={() => setHoveredLink(item.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      color: hoveredLink === item.href ? '#00A86B' : '#000000',
                      fontWeight: 600,
                      fontSize: '1rem',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#00A86B',
                        transform: hoveredLink === item.href ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s ease',
                      },
                    }}
                  >
                    {item.label}
                  </MotionButton>
                </Link>
              </motion.div>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}