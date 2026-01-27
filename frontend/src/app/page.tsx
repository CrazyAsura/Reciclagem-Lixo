'use client';

import { Container, Box, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { motion } from 'motion/react';
import Link from 'next/link';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function Home() {
  const features = [
    {
      title: 'Fotografe e Denuncie',
      description: 'Capture fotos de lixo na rua e denuncie locais com poluição ambiental.',
      icon: PhotoCameraIcon,
    },
    {
      title: 'Análise com IA',
      description: 'Sistema avançado detecta se fotos foram geradas por IA ou são autênticas.',
      icon: SmartToyIcon,
    },
    {
      title: 'Comunidade Conectada',
      description: 'Chat em tempo real e rede social com outros ativistas ambientais.',
      icon: GroupsIcon,
    },
    {
      title: 'Cursos Ambientais',
      description: 'Aprenda sobre sustentabilidade com nossos cursos de educação ambiental.',
      icon: SchoolIcon,
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
          ♻️ Recicla+ - Seu Olho para o Lixo
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: '#666666',
            fontWeight: 400,
          }}
        >
          Denuncie poluição ambiental, receba cursos e conecte-se com a comunidade sustentável
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
          Nossas Principais Funcionalidades
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

      {/* How It Works */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{ mt: 8, mb: 8 }}
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
          Como Funciona?
        </Typography>

        <Grid container spacing={3}>
          {[
            { step: '1', title: 'Fotografe', desc: 'Tire uma foto do lixo/poluição na rua com seu dispositivo' },
            { step: '2', title: 'Envie', desc: 'Compartilhe a foto em nossa plataforma' },
            { step: '3', title: 'Analisamos', desc: 'Nosso sistema de IA verifica se a foto é autêntica' },
            { step: '4', title: 'Aprenda', desc: 'Acesse cursos de educação ambiental e conecte-se' },
          ].map((item, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                sx={{
                  border: '2px solid #00A86B',
                  textAlign: 'center',
                  p: 2,
                  backgroundColor: '#F5F5F5',
                  '&:hover': {
                    borderColor: '#000000',
                    boxShadow: '0 12px 24px rgba(0, 168, 107, 0.2)',
                  },
                }}
              >
                <Typography variant="h3" sx={{ color: '#00A86B', fontWeight: 700, mb: 1 }}>
                  {item.step}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000000', mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666666' }}>
                  {item.desc}
                </Typography>
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
          Junte-se a milhares de ativistas ambientais denunciando poluição e aprendendo sobre sustentabilidade!
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
              endIcon={<DownloadIcon />}
            >
              Baixar App
            </Button>
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
                Saiba Mais
              </Button>
            </Link>
          </motion.div>
        </Box>
      </MotionBox>
    </Container>
  );
}
