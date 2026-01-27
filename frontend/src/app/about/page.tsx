'use client';

import { Container, Box, Typography, Card, CardContent, Grid, Avatar, Button } from '@mui/material';
import { motion } from 'motion/react';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function About() {
  const team = [
    { name: 'João Silva', role: 'Fundador & CEO', icon: '👨‍💼' },
    { name: 'Maria Santos', role: 'Diretora de Sustentabilidade', icon: '👩‍💼' },
    { name: 'Carlos Oliveira', role: 'Especialista em Reciclagem', icon: '👨‍🔬' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{ textAlign: 'center', mb: 8 }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 3,
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            color: '#000000',
          }}
        >
          Sobre Recicla+
        </Typography>
        <Box
          sx={{
            width: '80px',
            height: '4px',
            backgroundColor: '#00A86B',
            margin: '0 auto 2rem',
            borderRadius: '2px',
          }}
        />
      </MotionBox>

      {/* Mission & Vision */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ border: '2px solid #000000', p: 3 }}>
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    color: '#00A86B',
                    fontWeight: 700,
                  }}
                >
                  Nossa Missão
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666', lineHeight: 1.8 }}>
                  Criar uma plataforma inovadora que capacite cidadãos a fotografar e denunciar poluição ambiental, utilizando tecnologia de IA para garantir autenticidade, enquanto promove educação ambiental e conecta uma comunidade de ativistas sustentáveis.
                </Typography>
              </CardContent>
            </Card>
          </MotionBox>
        </Grid>

        <Grid item xs={12} md={6}>
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card sx={{ border: '2px solid #000000', p: 3 }}>
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    color: '#00A86B',
                    fontWeight: 700,
                  }}
                >
                  Nossa Visão
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666', lineHeight: 1.8 }}>
                  Ser a plataforma número 1 em monitoramento ambiental cidadão, transformando cada pessoa em um agente de mudança. Imaginar um futuro onde a poluição é reduzida através da denúncia participativa, educação contínua e comunidade engajada.
                </Typography>
              </CardContent>
            </Card>
          </MotionBox>
        </Grid>
      </Grid>

      {/* Values */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{ mb: 8 }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            color: '#000000',
            fontWeight: 700,
          }}
        >
          Nossos Valores
        </Typography>

        <Grid container spacing={3}>
          {[
            { title: 'Transparência', desc: 'Verificação autêntica de denúncias com IA' },
            { title: 'Comunidade', desc: 'Chat e rede social para engajamento' },
            { title: 'Educação', desc: 'Cursos ambientais de qualidade' },
            { title: 'Impacto', desc: 'Mudança real no ambiente urbano' },
          ].map((value, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                sx={{
                  border: '2px solid #00A86B',
                  borderRadius: '12px',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0, 168, 107, 0.2)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#000000', mb: 1 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    {value.desc}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </MotionBox>

      {/* Team */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            color: '#000000',
            fontWeight: 700,
          }}
        >
          Nosso Time
        </Typography>

        <Grid container spacing={4}>
          {team.map((member, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                sx={{
                  border: '2px solid #000000',
                  textAlign: 'center',
                  p: 3,
                  '&:hover': {
                    borderColor: '#00A86B',
                    boxShadow: '0 12px 24px rgba(0, 168, 107, 0.15)',
                  },
                }}
              >
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {member.icon}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000000', mb: 1 }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#00A86B', fontWeight: 600 }}>
                  {member.role}
                </Typography>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </MotionBox>
    </Container>
  );
}
