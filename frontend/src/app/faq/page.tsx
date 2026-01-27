'use client';

import { Container, Box, Typography, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { motion } from 'motion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function FAQ() {
  const faqs = [
    {
      question: 'O que é reciclagem?',
      answer: 'Reciclagem é o processo de transformar resíduos em novos produtos, reduzindo a quantidade de lixo nos aterros sanitários e conservando recursos naturais.',
    },
    {
      question: 'Como posso começar a reciclar?',
      answer: 'Comece separando seus resíduos em categorias: plástico, papel, vidro e metal. Procure os pontos de coleta de reciclagem mais próximos de você.',
    },
    {
      question: 'Quais materiais podem ser reciclados?',
      answer: 'Papel, papelão, vidro, plástico, metal, alumínio e outros materiais específicos podem ser reciclados. Confira com sua coleta local os materiais aceitos.',
    },
    {
      question: 'Por que reciclar é importante?',
      answer: 'Reciclar reduz o consumo de recursos naturais, economiza energia, reduz poluição e ajuda a proteger nosso planeta para as futuras gerações.',
    },
    {
      question: 'Qual é a diferença entre reciclar e reutilizar?',
      answer: 'Reciclar é transformar materiais em novos produtos. Reutilizar é usar um item novamente sem transformação. Ambas são práticas sustentáveis importantes.',
    },
    {
      question: 'Como a Recicla+ pode me ajudar?',
      answer: 'Oferecemos conteúdo educativo, dicas práticas, comunidade engajada e ferramentas para você acompanhar seu impacto ambiental.',
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
          Encontre respostas para suas dúvidas sobre reciclagem
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
