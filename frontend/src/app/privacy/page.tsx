'use client';

import { Container, Box, Typography, Card, CardContent, Divider } from '@mui/material';
import { motion } from 'motion/react';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function PrivacyPolicy() {
  const sections = [
    {
      title: '1. Informações Coletadas',
      content: [
        'Informações de perfil (nome, email, localização)',
        'Fotos e metadados de imagens enviadas (localização GPS, data/hora)',
        'Dados de uso da plataforma (histórico de denúncias, cursos, chat)',
        'Dados técnicos (IP, tipo de dispositivo, navegador)',
        'Informações opcionais (perfil social, certificados)',
      ],
    },
    {
      title: '2. Como Usamos Seus Dados',
      content: [
        'Verificar autenticidade de fotos com IA',
        'Compilar mapas de poluição por região',
        'Enviar notificações sobre denúncias próximas',
        'Melhorar nossos algoritmos e serviços',
        'Cumprir obrigações legais',
        'Enviar comunicações sobre novos cursos e atualizações',
      ],
    },
    {
      title: '3. Compartilhamento de Dados',
      content: [
        'NÃO compartilhamos dados pessoais com terceiros sem consentimento',
        'Podemos compartilhar dados agregados com órgãos ambientais (sem identificação pessoal)',
        'Parceiros de tecnologia que assinam acordos de confidencialidade',
        'Conformidade com leis (quando obrigado por autoridades)',
      ],
    },
    {
      title: '4. Privacidade de Denúncias',
      content: [
        'Você pode fazer denúncias de forma anônima',
        'Seu perfil não será associado à denúncia sem sua permissão',
        'As denúncias anônimas aparecem no mapa sem identificação',
        'Você controla quem pode ver suas denúncias (público, amigos ou privado)',
      ],
    },
    {
      title: '5. Segurança dos Dados',
      content: [
        'Utilizamos criptografia SSL/TLS para transmissão de dados',
        'Senhas são armazenadas com hash seguro (bcrypt)',
        'Acesso restrito a dados sensíveis (apenas equipe autorizada)',
        'Auditorias de segurança regulares',
        'Política de retenção: dados são deletados após 2 anos de inatividade',
      ],
    },
    {
      title: '6. Seus Direitos',
      content: [
        'Direito de acessar seus dados pessoais',
        'Direito de corrigir informações imprecisas',
        'Direito de deletar sua conta e dados (direito ao esquecimento)',
        'Direito de portar seus dados para outro serviço',
        'Direito de optar por não receber comunicações',
      ],
    },
    {
      title: '7. Cookies e Rastreamento',
      content: [
        'Usamos cookies para autenticação e preferências de usuário',
        'Google Analytics para análise agregada de uso',
        'Você pode desabilitar cookies nas configurações do navegador',
        'Não usamos cookies para rastreamento comportamental externo',
      ],
    },
    {
      title: '8. Contato e Reclamações',
      content: [
        'Email: privacy@reciclaplus.com',
        'Formulário de privacidade disponível em suas configurações',
        'Tempo de resposta: 30 dias',
        'Você tem direito de registrar reclamações com autoridades de proteção de dados',
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
          Política de Privacidade
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
              A Recicla+ está comprometida em proteger sua privacidade. Esta política descreve como coletamos, usamos, compartilhamos e protegemos suas informações pessoais. Ao usar nossa plataforma, você concorda com as práticas descritas neste documento.
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
              Esta política pode ser atualizada periodicamente. Notificaremos você sobre mudanças significativas via email ou notificação no app.
            </Typography>
          </CardContent>
        </Card>
      </MotionBox>
    </Container>
  );
}
