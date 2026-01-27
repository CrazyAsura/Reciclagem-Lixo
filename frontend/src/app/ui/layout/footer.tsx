'use client';

import { Box, Container, Typography, Grid, Link as MuiLink, Divider, IconButton } from '@mui/material';
import { motion } from 'motion/react';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Sobre', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contato', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Política de Privacidade', href: '/privacy' },
    { label: 'Termos de Uso', href: '/terms' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FacebookIcon, url: '#' },
    { name: 'Twitter', icon: TwitterIcon, url: '#' },
    { name: 'Instagram', icon: InstagramIcon, url: '#' },
    { name: 'LinkedIn', icon: LinkedInIcon, url: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        py: 6,
        borderTop: '2px solid #00A86B',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" sx={{ mb: 2, color: '#00A86B', fontWeight: 700 }}>
                ♻️ Recicla+
              </Typography>
              <Typography variant="body2" sx={{ color: '#CCCCCC' }}>
                Denuncie poluição, aprenda sobre sustentabilidade e conecte-se com a comunidade.
              </Typography>
            </motion.div>
          </Grid>

          {/* Navigation */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#00A86B' }}>
                Links
              </Typography>
              {footerLinks.map((link) => (
                <div key={link.href}>
                  <Link href={link.href} style={{ textDecoration: 'none' }}>
                    <MuiLink
                      sx={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        display: 'block',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        fontSize: '0.9rem',
                        '&:hover': {
                          color: '#00A86B',
                          paddingLeft: 1,
                        },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  </Link>
                </div>
              ))}
            </motion.div>
          </Grid>

          {/* Legal */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#00A86B' }}>
                Legal
              </Typography>
              {legalLinks.map((link) => (
                <div key={link.href}>
                  <Link href={link.href} style={{ textDecoration: 'none' }}>
                    <MuiLink
                      sx={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        display: 'block',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        fontSize: '0.9rem',
                        '&:hover': {
                          color: '#00A86B',
                          paddingLeft: 1,
                        },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  </Link>
                </div>
              ))}
            </motion.div>
          </Grid>

          {/* Contact & Social */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#00A86B' }}>
                Contato & Social
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <EmailIcon sx={{ color: '#00A86B', fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>
                  contato@reciclaplus.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <PhoneIcon sx={{ color: '#00A86B', fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: '#CCCCCC' }}>
                  (11) 98765-4321
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.div
                      key={social.name}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        href={social.url}
                        component="a"
                        title={social.name}
                        sx={{
                          color: '#FFFFFF',
                          backgroundColor: 'rgba(0, 168, 107, 0.1)',
                          '&:hover': {
                            backgroundColor: '#00A86B',
                            color: '#000000',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <IconComponent fontSize="small" />
                      </IconButton>
                    </motion.div>
                  );
                })}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: '#00A86B', my: 3 }} />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typography variant="body2" align="center" sx={{ color: '#CCCCCC' }}>
            &copy; {currentYear} Recicla+. Todos os direitos reservados. | Desenvolvido com{' '}
            <span style={{ color: '#00A86B' }}>💚</span> para o meio ambiente
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}