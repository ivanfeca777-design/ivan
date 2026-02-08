
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, 
  Brain, 
  Users, 
  Baby, 
  ClipboardCheck, 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X,
  Clock,
  MapPin,
  Phone,
  Mail,
  Send,
  MessageSquareText,
  Instagram,
  Facebook,
  Youtube,
  Search,
  CheckCircle2,
  FileText,
  UserCircle,
  Stethoscope,
  Lock,
  ArrowRight,
  Github
} from 'lucide-react';
import { ServiceCategory, Service, Message, Appointment, PsychologicalTest } from './types';
import { getAIOrientation } from './services/gemini';

// --- Constants ---
const WHATSAPP_NUMBER = "921179574";
const WHATSAPP_LINK = `https://wa.me/55${WHATSAPP_NUMBER}`;
const FORMATTED_PHONE = "(92) 92117-9574";
const CLINIC_EMAIL = "evaristofecayamalej@gmail.com";

type ViewMode = 'WELCOME' | 'LOGIN' | 'APP';

// --- Helper Components ---

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg', scrolled?: boolean, light?: boolean }> = ({ size = 'sm', scrolled, light }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  };
  const iconSizes = {
    sm: 22,
    md: 28,
    lg: 40
  };
  const textClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className={`${sizeClasses[size]} bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform duration-300`}>
        <Brain size={iconSizes[size]} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className={`${textClasses[size]} font-bold tracking-tight leading-none ${light ? 'text-white' : (scrolled || size !== 'sm' ? 'text-slate-900' : 'text-indigo-950')}`}>
          Consulfeca
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${light ? 'text-indigo-200' : (scrolled || size !== 'sm' ? 'text-indigo-600' : 'text-indigo-800')}`}>
          Psicologia Clínica
        </span>
      </div>
    </div>
  );
};

// --- Missing Components: SectionTitle and ServiceCard ---

const SectionTitle: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">{title}</h2>
    <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
    <p className="text-slate-600 max-w-2xl mx-auto text-lg">{subtitle}</p>
  </div>
);

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const icons: Record<string, React.ElementType> = {
    heart: Heart,
    baby: Baby,
    users: Users,
    clipboard: ClipboardCheck,
    book: BookOpen,
    brain: Brain
  };
  
  const Icon = icons[service.icon] || Heart;

  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all group">
      <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        <Icon size={32} />
      </div>
      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 block">{service.category}</span>
      <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">{service.title}</h3>
      <p className="text-slate-600 leading-relaxed mb-8">{service.description}</p>
      <a href="#agendamento" className="inline-flex items-center gap-2 text-indigo-600 font-bold group-hover:gap-3 transition-all">
        Saiba Mais <ChevronRight size={18} />
      </a>
    </div>
  );
};

// --- Screen Components ---

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden px-6">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px]"></div>
    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[120px] opacity-50"></div>
    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-100 rounded-full blur-[120px] opacity-50"></div>
    
    <div className="relative z-10 text-center flex flex-col items-center max-w-2xl">
      <div className="mb-12 animate-bounce">
        <Logo size="lg" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-serif leading-tight">
        Bem-vindo à sua jornada de <span className="text-indigo-600 italic">transformação</span>.
      </h1>
      <p className="text-lg text-slate-600 mb-12 leading-relaxed">
        Na Consulfeca, acreditamos que a saúde mental é a base para uma vida plena. Oferecemos um espaço seguro para o seu crescimento pessoal e profissional.
      </p>
      <button 
        onClick={onStart}
        className="group relative bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center gap-3"
      >
        Começar Jornada
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>
      
      <div className="mt-16 flex items-center gap-8 text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-indigo-500" />
          <span className="text-sm font-medium">Ética Profissional</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-indigo-500" />
          <span className="text-sm font-medium">Inovação Clínica</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-indigo-500" />
          <span className="text-sm font-medium">Foco no Paciente</span>
        </div>
      </div>
    </div>
  </div>
);

const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-white">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <Brain size={48} className="text-indigo-200" />
          </div>
          <h2 className="text-2xl font-bold font-serif italic">Portal Consulfeca</h2>
          <p className="text-indigo-100 text-sm opacity-80 mt-1">Acesse sua área restrita</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@gmail.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Senha</label>
              <button type="button" className="text-xs font-bold text-indigo-600 hover:underline">Esqueceu?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Entrar na Conta'}
          </button>
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Ou entrar com</span></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              <span className="text-sm font-bold text-slate-600">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Facebook className="text-blue-600" size={18} />
              <span className="text-sm font-bold text-slate-600">Facebook</span>
            </button>
          </div>
          
          <p className="text-center text-sm text-slate-500">
            Ainda não tem conta? <button type="button" className="text-indigo-600 font-bold hover:underline">Solicitar Acesso</button>
          </p>
        </form>
      </div>
      
      <div className="absolute bottom-6 text-center w-full">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Ambiente Clínico Seguro © Consulfeca</p>
      </div>
    </div>
  );
};

// --- Main Components ---

const Navbar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Testes Online', href: '#testes' },
    { name: 'Treinamentos', href: '#treinamentos' },
    { name: 'Agendamento', href: '#agendamento' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home">
          <Logo scrolled={scrolled} />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
              {link.name}
            </a>
          ))}
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            Sair
          </button>
          <a href="#agendamento" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Marcar Consulta
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-6 absolute w-full shadow-xl">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50">
                {link.name}
              </a>
            ))}
            <button onClick={onLogout} className="text-lg font-medium text-red-500 py-2 text-left">Sair</button>
            <a href="#agendamento" onClick={() => setIsOpen(false)} className="bg-indigo-600 text-white text-center py-4 rounded-xl font-bold mt-4">
              Marcar Consulta
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const MainApp: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou o assistente da Consulfeca. Como posso ajudar você hoje com sua saúde mental ou treinamento?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Appointment Form State
  const [appointment, setAppointment] = useState<Appointment>({
    name: '',
    email: '',
    service: 'Psicoterapia Individual',
    date: '',
    time: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Test Selection State
  const [selectedTest, setSelectedTest] = useState<PsychologicalTest | null>(null);
  const [testFormData, setTestFormData] = useState({ name: '', email: '', age: '' });

  const services: Service[] = [
    { id: '1', title: 'Psicoterapia Individual', description: 'Atendimento personalizado para adultos e idosos focando em ansiedade, depressão e autoconhecimento.', category: ServiceCategory.INDIVIDUAL, icon: 'heart' },
    { id: '2', title: 'Terapia Infantil', description: 'Abordagem lúdica e acolhedora para crianças lidarem com emoções e desenvolvimento.', category: ServiceCategory.CHILDREN, icon: 'baby' },
    { id: '3', title: 'Terapia de Casal e Família', description: 'Mediação de conflitos e fortalecimento de vínculos afetivos em diversos contextos familiares.', category: ServiceCategory.FAMILY, icon: 'users' },
    { id: '4', title: 'Testes Psicológicos Online', description: 'Aplicação regulamentada de inventários de personalidade, escalas de atenção e avaliações cognitivas.', category: ServiceCategory.TESTING, icon: 'clipboard' },
    { id: '5', title: 'Treinamento Profissional', description: 'Capacitação em avaliação psicológica e supervisão para estudantes e profissionais da área.', category: ServiceCategory.TRAINING, icon: 'book' },
    { id: '6', title: 'Psicologia Organizacional', description: 'Treinamentos para liderança, gestão de estresse e bem-estar no ambiente de trabalho.', category: ServiceCategory.TRAINING, icon: 'brain' },
  ];

  const psychologicalTests: PsychologicalTest[] = [
    { id: 'bdi2', acronym: 'BDI-II', name: 'Inventário de Depressão de Beck', target: 'Adulto', description: 'Avaliação da intensidade de sintomas depressivos.' },
    { id: 'bsi', acronym: 'BSI', name: 'Inventário de Sintomas Breve', target: 'Adulto', description: 'Identificação de padrões de sintomas psicológicos.' },
    { id: 'auto', acronym: 'Auto-Conceito', name: 'Escala de Auto-Conceito', target: 'Adulto', description: 'Avaliação da percepção que o indivíduo tem de si mesmo.' },
    { id: 'proj-fam', acronym: 'Projetivo Família', name: 'Teste do Desenho da Família', target: 'Família', description: 'Avaliação da dinâmica e vínculos familiares.' },
    { id: 'proj-child', acronym: 'Projetivo Infantil', name: 'CAT-H / HTP Infantil', target: 'Infantil', description: 'Exploração da personalidade e conflitos internos da criança.' },
    { id: 'idade', acronym: 'Avaliação Idade', name: 'Testes de Desenvolvimento Cognitivo', target: 'Infantil', description: 'Avaliação da idade mental e marcos do desenvolvimento.' }
  ];

  const filteredServices = useMemo(() => {
    if (!searchTerm.trim()) return services;
    const lowerSearch = searchTerm.toLowerCase();
    return services.filter(s => 
      s.title.toLowerCase().includes(lowerSearch) || 
      s.description.toLowerCase().includes(lowerSearch) ||
      s.category.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, services]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const response = await getAIOrientation(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAppointment({ name: '', email: '', service: 'Psicoterapia Individual', date: '', time: '', notes: '' });
    }, 5000);
  };

  const handleTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitação do teste ${selectedTest?.acronym} enviada para o clínico (${CLINIC_EMAIL}).`);
    setSelectedTest(null);
  };

  return (
    <>
      <Navbar onLogout={onLogout} />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-br from-indigo-50 via-white to-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">Acolhimento & Ciência</span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900 mb-6 font-serif">
              Sua jornada para o <span className="text-indigo-600 italic">equilíbrio emocional</span> começa aqui.
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              Na Consulfeca, unimos experiência clínica e inovação digital para oferecer psicoterapia, treinamentos e avaliações psicológicas de alta qualidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#agendamento" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 text-center">
                Agendar Consulta
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 text-center flex items-center justify-center gap-2">
                <MessageSquareText size={20} /> Falar no WhatsApp
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Psicóloga Consulfeca" 
              className="relative z-10 rounded-3xl shadow-2xl grayscale-[0.2] border-8 border-white"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Especialidades & Serviços" 
            subtitle="Oferecemos suporte emocional para todas as fases da vida, utilizando métodos baseados em evidências."
          />
          <div className="max-w-xl mx-auto mb-12 relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="O que você está procurando? (ex: ansiedade, infantil...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-slate-700 shadow-sm"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Psychological Testing Portal */}
      <section id="testes" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Tecnologia & Precisão</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 font-serif">Portal de Testes Online</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Selecione o teste solicitado pelo seu terapeuta para iniciar a aplicação digital segura.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {psychologicalTests.map(test => (
              <div key={test.id} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-indigo-500 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-indigo-400 group-hover:opacity-20 transition-opacity">
                  <FileText size={80} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-lg text-xs font-bold border border-indigo-600/30 uppercase tracking-tighter">{test.acronym}</span>
                  <span className="text-xs text-slate-400 font-medium px-2 py-0.5 border border-slate-700 rounded-md">{test.target}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{test.name}</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">{test.description}</p>
                <button onClick={() => setSelectedTest(test)} className="w-full bg-slate-700 hover:bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm transition-all">
                  Iniciar Teste
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedTest && (
          <div className="fixed inset-0 z-[100] bg-slate-950/90 flex items-center justify-center p-6 backdrop-blur-sm">
            <div className="bg-white text-slate-900 w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl animate-in zoom-in-95">
              <button onClick={() => setSelectedTest(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 p-2"><X size={24} /></button>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600"><ClipboardCheck size={28} /></div>
                <div><h3 className="text-2xl font-bold font-serif">{selectedTest.acronym}</h3><p className="text-sm text-slate-500">{selectedTest.name}</p></div>
              </div>
              <form onSubmit={handleTestSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
                  <input required type="text" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Idade</label><input required type="number" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Gênero</label><select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none"><option>Feminino</option><option>Masculino</option><option>Outro</option></select></div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">Iniciar Aplicação</button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Appointment Section */}
      <section id="agendamento" className="py-24 bg-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden grid md:grid-cols-5 border border-white">
            <div className="md:col-span-2 bg-indigo-600 p-12 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-serif">Agende seu horário</h2>
                <p className="text-indigo-100 mb-10 leading-relaxed">Escolha o melhor canal e agende sua primeira sessão. Suas informações são enviadas diretamente para {CLINIC_EMAIL}.</p>
                <div className="space-y-6">
                  <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center gap-4 hover:bg-white/10 p-2 -ml-2 rounded-xl transition-colors"><div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center"><Phone size={18} /></div><span>{FORMATTED_PHONE}</span></a>
                  <a href={`mailto:${CLINIC_EMAIL}`} className="flex items-center gap-4 hover:bg-white/10 p-2 -ml-2 rounded-xl transition-colors overflow-hidden"><div className="w-10 h-10 bg-indigo-500 flex-shrink-0 rounded-full flex items-center justify-center"><Mail size={18} /></div><span className="truncate">{CLINIC_EMAIL}</span></a>
                </div>
              </div>
            </div>
            <div className="md:col-span-3 p-12 flex items-center">
              {submitted ? (
                <div className="w-full text-center py-12 animate-in zoom-in-95">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={48} /></div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4 font-serif">Solicitação Enviada!</h3>
                  <button onClick={() => setSubmitted(false)} className="text-indigo-600 font-bold hover:underline">Agendar outro horário</button>
                </div>
              ) : (
                <form className="space-y-6 w-full" onSubmit={handleAppointmentSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Nome</label><input required type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20" /></div>
                    <div className="space-y-2"><label className="text-sm font-bold text-slate-700">E-mail</label><input required type="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20" /></div>
                  </div>
                  <button disabled={submitting} type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl">{submitting ? 'Processando...' : 'Confirmar Agendamento'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2"><Logo size="lg" /></div>
            <div><h4 className="font-bold text-slate-800 mb-6 font-serif">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href={WHATSAPP_LINK} className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-emerald-500 shadow-sm"><MessageSquareText size={20} /></a>
                <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 shadow-sm"><Facebook size={20} /></a>
                <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-pink-600 shadow-sm"><Instagram size={20} /></a>
                <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-red-600 shadow-sm"><Youtube size={20} /></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Consulfeca Psicologia Clínica. {CLINIC_EMAIL}</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-4">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:bg-emerald-600 group relative">
          <MessageSquareText size={30} />
        </a>
        <div className="relative">
          {!chatOpen ? (
            <button onClick={() => setChatOpen(true)} className="w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-pulse"><MessageCircle size={30} /></button>
          ) : (
            <div className="bg-white w-[350px] h-[500px] rounded-[2rem] shadow-3xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 absolute bottom-0 right-0">
              <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center"><Brain size={20} /></div><div><h4 className="font-bold">Assistente Consulfeca</h4></div></div>
                <button onClick={() => setChatOpen(false)} className="text-white hover:bg-white/10 p-1 rounded-lg"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-100' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Como posso ajudar?" className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none" />
                <button onClick={handleSendMessage} disabled={!input.trim()} className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50"><Send size={18} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('WELCOME');

  return (
    <div className="min-h-screen">
      {view === 'WELCOME' && <WelcomeScreen onStart={() => setView('LOGIN')} />}
      {view === 'LOGIN' && <LoginScreen onLogin={() => setView('APP')} />}
      {view === 'APP' && <MainApp onLogout={() => setView('LOGIN')} />}
    </div>
  );
};

export default App;
