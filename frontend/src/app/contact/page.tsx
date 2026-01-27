'use client';

import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5, 'Assunto deve ter no mínimo 5 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form data:', data);
    // Here you would send the data to your backend
    alert('Mensagem enviada com sucesso!');
    reset();
  };

  const contactInfo = [
    {
      title: 'Email',
      value: 'contato@reciclaplus.com',
      icon: '📧',
    },
    {
      title: 'Telefone',
      value: '(11) 98765-4321',
      icon: '📱',
    },
    {
      title: 'Endereço',
      value: 'São Paulo, SP - Brasil',
      icon: '📍',
    },
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
          Entre em Contato
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
        <Typography variant="h5" sx={{ color: '#666666', fontWeight: 400 }}>
          Gostaria de saber mais? Envie uma mensagem para nós
        </Typography>
      </MotionBox>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ border: '2px solid #000000', p: 3 }}>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <TextField
                      label="Nome Completo"
                      variant="outlined"
                      fullWidth
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderColor: '#000000',
                          '&:hover fieldset': {
                            borderColor: '#00A86B',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00A86B',
                          },
                        },
                      }}
                    />

                    <TextField
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderColor: '#000000',
                          '&:hover fieldset': {
                            borderColor: '#00A86B',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00A86B',
                          },
                        },
                      }}
                    />

                    <TextField
                      label="Assunto"
                      variant="outlined"
                      fullWidth
                      {...register('subject')}
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderColor: '#000000',
                          '&:hover fieldset': {
                            borderColor: '#00A86B',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00A86B',
                          },
                        },
                      }}
                    />

                    <TextField
                      label="Mensagem"
                      multiline
                      rows={5}
                      variant="outlined"
                      fullWidth
                      {...register('message')}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderColor: '#000000',
                          '&:hover fieldset': {
                            borderColor: '#00A86B',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00A86B',
                          },
                        },
                      }}
                    />

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                          backgroundColor: '#00A86B',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          py: 1.5,
                          fontSize: '1rem',
                          '&:hover': {
                            backgroundColor: '#00854D',
                          },
                        }}
                      >
                        Enviar Mensagem
                      </Button>
                    </motion.div>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </MotionBox>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {contactInfo.map((info, index) => (
              <MotionCard
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                sx={{
                  border: '2px solid #00A86B',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0, 168, 107, 0.2)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {info.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#000000', mb: 1 }}>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#00A86B', fontWeight: 600 }}>
                    {info.value}
                  </Typography>
                </CardContent>
              </MotionCard>
            ))}

            {/* Social Links */}
            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              sx={{
                border: '2px solid #000000',
                p: 2,
                textAlign: 'center',
                '&:hover': {
                  borderColor: '#00A86B',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000000', mb: 2 }}>
                  Nos Siga
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  {['📘', '🐦', '📷', '💼'].map((social, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    >
                      {social}
                    </motion.div>
                  ))}
                </Box>
              </CardContent>
            </MotionCard>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
