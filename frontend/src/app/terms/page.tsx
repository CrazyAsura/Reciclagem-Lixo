'use client';

import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'motion/react';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function TermsOfUse() {
  const sections = [
    {
      title: '1. Aceitação dos Termos',
      content: [
        'Ao acessar e usar a Recicla+, você concorda em cumprir estes Termos de Uso',
        'Se você não concorda com qualquer parte, favor descontinuar o uso',
        'Reservamos o direito de modificar estes termos a qualquer momento',
        'Mudanças significativas serão comunicadas com 30 dias de antecedência',
      ],
    },
    {
      title: '2. Licença de Uso',
      content: [
        'Concedemos a você uma licença não-exclusiva, não-transferível para usar a plataforma',
        'Você concorda em usar a plataforma apenas para fins legais',
        'Proibido: spam, hacking, venda de dados, ou qualquer atividade ilegal',
        'Proibido: compartilhar credenciais ou usar múltiplas contas',
      ],
    },
    {
      title: '3. Conteúdo de Usuários',
      content: [
        'Você é responsável por todo conteúdo que publica (fotos, comentários, posts)',
        'Concede à Recicla+ licença para usar seu conteúdo na plataforma e em análises',
        'Garante que tem direitos sobre o conteúdo compartilhado',
        'Concorda que o conteúdo não viola direitos de terceiros',
      ],
    },
    {
      title: '4. Diretrizes de Conteúdo Proibido',
      content: [
        'Conteúdo ofensivo, discriminatório ou de ódio',
        'Desinformação ou denúncias falsas intencionais',
        'Conteúdo sexualmente explícito ou violência',
        'Spam, phishing ou malware',
        'Violação de privacidade de terceiros',
        'Publicidade não autorizada',
      ],
    },
    {
      title: '5. Análise de IA e Autenticidade',
      content: [
        'Nossa IA analisa fotos para detectar se foram geradas artificialmente',
        'Denúncias com fotos não-autênticas serão rejeitadas',
        'Usuários que enviarem múltiplas fotos falsas podem ter suas contas bloqueadas',
        'A análise de IA não é 100% precisa; revisões manuais podem ocorrer',
      ],
    },
    {
      title: '6. Responsabilidade de Denúncias',
      content: [
        'Você é responsável pela precisão das denúncias que envia',
        'Denúncias falsas podem resultar em suspensão ou banimento',
        'A Recicla+ não se responsabiliza por ações tomadas com base em denúncias',
        'Denúncias são compartilhadas com órgãos ambientais apropriados',
      ],
    },
    {
      title: '7. Cursos e Educação',
      content: [
        'Cursos básicos são gratuitos; cursos premium requerem pagamento',
        'Certificados premium são válidos por 2 anos',
        'Reembolso para cursos premium disponível em até 7 dias após compra',
        'Não permitimos compartilhamento de conteúdo dos cursos',
      ],
    },
    {
      title: '8. Limitação de Responsabilidade',
      content: [
        'A plataforma é fornecida "como está" sem garantias',
        'Não garantimos que a plataforma será ininterrupta ou livre de erros',
        'Não somos responsáveis por perdas de dados ou interrupções de serviço',
        'Você usa a plataforma por sua conta e risco',
      ],
    },
    {
      title: '9. Suspensão e Encerramento',
      content: [
        'Podemos suspender ou encerrar sua conta se violar estes termos',
        'Encerramento por violação ocorre sem aviso prévio',
        'Você pode solicitar exclusão de conta; dados serão retidos por 90 dias',
        'Após 90 dias, dados serão permanentemente deletados',
      ],
    },
    {
      title: '10. Pagamentos e Reembolsos',
      content: [
        'Pagamentos para cursos premium são processados via Stripe/PayPal',
        'Reembolsos devem ser solicitados dentro de 7 dias após compra',
        'Não oferecemos reembolsos para cursos já concluídos',
        'Todos os preços estão em reais brasileiros (BRL)',
      ],
    },
    {
      title: '11. Propriedade Intelectual',
      content: [
        'Todo conteúdo da Recicla+ (logo, design, código) é protegido por direitos autorais',
        'Você não pode reproduzir, modificar ou distribuir sem permissão',
        'Fotos denunciadas são analisadas por IA; a análise é propriedade nossa',
        'Você retém os direitos autorais das suas fotos originais',
      ],
    },
    {
      title: '12. Lei Aplicável',
      content: [
        'Estes termos são regidos pelas leis do Brasil',
        'Qualquer disputa será resolvida em tribunais brasileiros',
        'Para reclamações, entre em contato: legal@reciclaplus.com',
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
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
          Termos de Uso
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
        <Typography variant="body1" sx={{ color: '#666666', fontWeight: 500 }}>
          Última atualização: 26 de janeiro de 2026
        </Typography>
      </MotionBox>

      {/* Intro */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{ mb: 6 }}
      >
        <Card sx={{ border: '2px solid #000000', p: 3 }}>
          <CardContent>
            <Typography variant="body1" sx={{ color: '#666666', lineHeight: 1.8 }}>
              Bem-vindo à Recicla+! Leia estes Termos de Uso cuidadosamente antes de usar nossa plataforma. Ao se registrar e usar nossos serviços, você concorda em cumprir todos os termos e condições descritos abaixo.
            </Typography>
          </CardContent>
        </Card>
      </MotionBox>

      {/* Content Sections */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <MotionCard
              sx={{
                border: '2px solid #00A86B',
                borderRadius: '8px',
                '&:hover': {
                  boxShadow: '0 8px 16px rgba(0, 168, 107, 0.2)',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#000000',
                    mb: 2,
                  }}
                >
                  {section.title}
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {section.content.map((item, itemIdx) => (
                    <Typography
                      key={itemIdx}
                      variant="body2"
                      sx={{
                        color: '#666666',
                        mb: 1,
                        lineHeight: 1.6,
                        '&:before': {
                          content: '"• "',
                          color: '#00A86B',
                          fontWeight: 'bold',
                          mr: 1,
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </MotionCard>
          </motion.div>
        ))}
      </Box>

      {/* Footer Note */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{ mt: 8, textAlign: 'center' }}
      >
        <Card sx={{ border: '2px solid #000000', p: 3, backgroundColor: '#F5F5F5' }}>
          <CardContent>
            <Typography variant="body2" sx={{ color: '#666666' }}>
              Ao usar a Recicla+, você confirma que leu, compreendeu e aceita todos estes Termos de Uso.
            </Typography>
          </CardContent>
        </Card>
      </MotionBox>
    </Container>
  );
}
