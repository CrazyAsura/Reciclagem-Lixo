'use client';

import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppDispatch, useAppSelector } from '../../libs/state/hooks';
import { toggleTheme } from '../../libs/state/themeSlice';

const MotionButton = motion.create(Button);
const MotionIconButton = motion.create(IconButton);

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

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
                background: mode === 'light'
                  ? 'linear-gradient(135deg, #000000 0%, #00A86B 100%)'
                  : 'linear-gradient(135deg, #00A86B 0%, #00D77D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                cursor: 'pointer',
                '&:hover': {
                  textShadow: mode === 'light'
                    ? '0 0 20px rgba(0, 168, 107, 0.3)'
                    : '0 0 20px rgba(0, 215, 125, 0.5)',
                },
              }}
            >
              ♻️ Recicla+
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
                      color: hoveredLink === item.href ? '#00A86B' : 'inherit',
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

            {/* Botão de tema */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MotionIconButton
                onClick={() => dispatch(toggleTheme())}
                sx={{
                  color: 'inherit',
                  ml: 2,
                  border: '2px solid #00A86B',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 168, 107, 0.1)',
                    transform: 'rotate(20deg)',
                  },
                }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
              >
                {mode === 'light' ? (
                  <DarkModeIcon sx={{ fontSize: '1.5rem' }} />
                ) : (
                  <WbSunnyIcon sx={{ fontSize: '1.5rem', color: '#FFD700' }} />
                )}
              </MotionIconButton>
            </motion.div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}