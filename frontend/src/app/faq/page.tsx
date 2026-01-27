'use client';

import { Container, Box, Typography, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Grid, IconButton } from '@mui/material';
import { motion } from 'motion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function FAQ() {
  const faqs = [
    {
      question: 'Como funciona o sistema de denúncia?',
      answer: 'Você fotografa o lixo/poluição na rua, envia através do app, nosso sistema de IA valida se a foto é autêntica, e a denúncia é processada e adicionada ao mapa de poluição da sua região.',
    },
    {
      question: 'Como o sistema de IA detecta fotos geradas por IA?',
      answer: 'Utilizamos modelos avançados de machine learning que analisam padrões, texturas e metadados da imagem para identificar se foi gerada por IA ou fotografada com um dispositivo real.',
    },
    {
      question: 'Posso receber denúncias de outras pessoas?',
      answer: 'Sim! Você receberá notificações sobre denúncias perto de você e poderá conversar com outros usuários através do chat integrado e da rede social.',
    },
    {
      question: 'Os cursos ambientais são gratuitos?',
      answer: 'Oferecemos cursos básicos gratuitos para todos os usuários, com opções de cursos premium com certificados para usuários que desejam aprofundar seus conhecimentos.',
    },
    {
      question: 'Como os dados de denúncias são usados?',
      answer: 'Os dados são compilados em mapas de poluição por região, compartilhados com órgãos ambientais e usados para conscientização e planejamento de ações de limpeza comunitária.',
    },
    {
      question: 'Minha privacidade é protegida?',
      answer: 'Sim, você pode optar por manter seu perfil anônimo ao fazer denúncias. Seus dados pessoais não são compartilhados com terceiros sem consentimento.',
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
          Perguntas Frequentes
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
          Dúvidas sobre como usar a plataforma Recicla+
        </Typography>
      </MotionBox>

      {/* FAQs */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Accordion
                sx={{
                  border: '2px solid #000000',
                  borderRadius: '8px !important',
                  '&:hover': {
                    borderColor: '#00A86B',
                  },
                  transition: 'border-color 0.3s ease',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#00A86B' }} />}
                  sx={{
                    backgroundColor: '#F5F5F5',
                    '&:hover': {
                      backgroundColor: '#EEEEEE',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#000000',
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderTop: '1px solid #E0E0E0',
                  }}
                >
                  <Typography variant="body1" sx={{ color: '#666666', lineHeight: 1.8 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </MotionBox>

      {/* Additional Help */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{ mt: 8, textAlign: 'center' }}
      >
        <MotionCard
          whileHover={{ y: -4 }}
          sx={{
            border: '2px solid #00A86B',
            backgroundColor: '#F5F5F5',
            p: 4,
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#000000' }}>
              Não encontrou sua resposta?
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: '#666666' }}>
              Entre em contato conosco para tirar suas dúvidas
            </Typography>
          </CardContent>
        </MotionCard>
      </MotionBox>
    </Container>
  );
}
