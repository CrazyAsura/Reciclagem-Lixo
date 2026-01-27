'use client';

import { Container, Box, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { motion } from 'motion/react';
import Link from 'next/link';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function Home() {
  const features = [
    {
      title: 'Sustentabilidade',
      description: 'Aprenda como contribuir para um planeta mais verde.',
      icon: '🌱',
    },
    {
      title: 'Educação',
      description: 'Conteúdo educativo sobre reciclagem e preservação ambiental.',
      icon: '📚',
    },
    {
      title: 'Comunidade',
      description: 'Conecte-se com outras pessoas que se importam com o meio ambiente.',
      icon: '👥',
    },
    {
      title: 'Impacto',
      description: 'Veja o impacto positivo que você causa todos os dias.',
      icon: '🌍',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{ textAlign: 'center', mb: 8 }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', md: '3.5rem' },
            fontWeight: 700,
            background: 'linear-gradient(135deg, #000000 0%, #00A86B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ♻️ Bem-vindo ao Recicla+
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: '#666666',
            fontWeight: 400,
          }}
        >
          Transformando a forma como pensamos sobre sustentabilidade
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/about">
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#00A86B',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                }}
              >
                Saiba Mais
              </Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact">
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#00A86B',
                  color: '#00A86B',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  border: '2px solid #00A86B',
                }}
              >
                Entre em Contato
              </Button>
            </Link>
          </motion.div>
        </Box>
      </MotionBox>

      {/* Features Section */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 6,
            textAlign: 'center',
            color: '#000000',
            fontWeight: 700,
          }}
        >
          Por Que Escolher Recicla+?
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                sx={{
                  border: '2px solid #000000',
                  borderRadius: '12px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    borderColor: '#00A86B',
                    boxShadow: '0 12px 24px rgba(0, 168, 107, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: 700,
                      color: '#000000',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </MotionBox>

      {/* CTA Section */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{
          mt: 8,
          p: 4,
          backgroundColor: '#F5F5F5',
          border: '2px solid #00A86B',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, color: '#000000', fontWeight: 700 }}>
          Pronto para Fazer a Diferença?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: '#666666' }}>
          Junte-se à nossa comunidade e comece sua jornada sustentável hoje mesmo!
        </Typography>
        <Link href="/contact">
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#00A86B',
              color: '#FFFFFF',
              fontWeight: 600,
              px: 4,
              py: 1.5,
            }}
          >
            Comece Agora
          </Button>
        </Link>
      </MotionBox>
    </Container>
  );
}
