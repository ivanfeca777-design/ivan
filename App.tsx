
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
  Github,
  ChevronLeft,
  Upload,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import { ServiceCategory, Service, Message, Appointment, PsychologicalTest, TestQuestion, TestAppointment, TestResult, Interpretation } from './types';
import { getAIOrientation } from './services/gemini';
import { PSYCHOLOGICAL_TESTS } from './src/testsData';

// --- Constants ---
const WHATSAPP_NUMBER = "921179574";
const WHATSAPP_LINK = `https://wa.me/55${WHATSAPP_NUMBER}`;
const FORMATTED_PHONE = "(92) 92117-9574";
const CLINIC_EMAIL = "evaristofecayamalej@gmail.com";

type ViewMode = 'WELCOME' | 'LOGIN' | 'APP';
type TestWorkflow = 'CONSENT' | 'IDENTIFICATION' | 'QUESTIONS' | 'FINISHED' | 'RESULTS';



// --- Helper Components ---

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg', scrolled?: boolean, light?: boolean }> = ({ size = 'sm', scrolled, light }) => {
  const sizeClasses = { sm: 'w-10 h-10', md: 'w-14 h-14', lg: 'w-20 h-20' };
  const iconSizes = { sm: 22, md: 28, lg: 40 };
  const textClasses = { sm: 'text-2xl', md: 'text-3xl', lg: 'text-5xl' };

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className={`${sizeClasses[size]} bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform duration-300`}>
        <Brain size={iconSizes[size]} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className={`${textClasses[size]} font-bold tracking-tight leading-none ${light ? 'text-white' : (scrolled || size !== 'sm' ? 'text-slate-900' : 'text-indigo-950')}`}>Consulfeca</span>
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${light ? 'text-indigo-200' : (scrolled || size !== 'sm' ? 'text-indigo-600' : 'text-indigo-800')}`}>Psicologia Clínica</span>
      </div>
    </div>
  );
};

const SectionTitle: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">{title}</h2>
    <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
    <p className="text-slate-600 max-w-2xl mx-auto text-lg">{subtitle}</p>
  </div>
);

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const icons: Record<string, React.ElementType> = { heart: Heart, baby: Baby, users: Users, clipboard: ClipboardCheck, book: BookOpen, brain: Brain };
  const Icon = icons[service.icon] || Heart;
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all group">
      <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Icon size={32} /></div>
      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 block">{service.category}</span>
      <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">{service.title}</h3>
      <p className="text-slate-600 leading-relaxed mb-8">{service.description}</p>
      <a href="#agendamento" className="inline-flex items-center gap-2 text-indigo-600 font-bold group-hover:gap-3 transition-all">Saiba Mais <ChevronRight size={18} /></a>
    </div>
  );
};



const TreinamentosSection: React.FC = () => (
  <section id="treinamentos" className="py-24">
    <div className="container mx-auto px-6">
      <SectionTitle 
        title="Treinamentos e Cursos"
        subtitle="Capacitação profissional e desenvolvimento de habilidades com foco em psicologia e bem-estar."
      />
      <div className="text-center max-w-2xl mx-auto bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
        <div className="inline-block bg-indigo-100 p-6 rounded-3xl mb-8 border border-indigo-200">
            <BookOpen size={48} className="text-indigo-600" />
        </div>
        <p className="text-slate-600 text-lg mb-8 leading-relaxed">No momento, nossos cursos e treinamentos estão sendo reestruturados para oferecer a melhor experiência de aprendizado. Em breve, você encontrará aqui uma plataforma completa para seu desenvolvimento profissional.</p>
        <p className="font-bold text-indigo-800">Fique de olho nas novidades!</p>
      </div>
    </div>
  </section>
);

const Background: React.FC = () => (
  <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-white">
    <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-indigo-100 rounded-full opacity-40 blur-3xl animate-pulse"></div>
    <div className="absolute bottom-[-15%] right-[-15%] w-[500px] h-[500px] bg-emerald-100 rounded-full opacity-30 blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
  </div>
);

// --- Screen Components ---

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
    <div className="relative z-10 text-center flex flex-col items-center max-w-2xl">
      <div className="mb-12 animate-bounce"><Logo size="lg" /></div>
      <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-serif leading-tight">Bem-vindo à sua jornada de <span className="text-indigo-600 italic">transformação</span>.</h1>
      <p className="text-lg text-slate-600 mb-12 leading-relaxed">Na Consulfeca, acreditamos que a saúde mental é a base para uma vida plena. Oferecemos um espaço seguro para o seu crescimento pessoal e profissional.</p>
      <button onClick={onStart} className="group relative bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center gap-3">Começar Jornada <ArrowRight className="group-hover:translate-x-1 transition-transform" /></button>
    </div>
  </div>
);

const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 1000); };
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <Brain size={48} className="mx-auto mb-4 text-indigo-200" />
          <h2 className="text-2xl font-bold font-serif italic">Portal Consulfeca</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" />
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" />
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all">{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
      </div>
    </div>
  );
};

// --- Main App Logic ---

const MainApp: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ role: 'model', text: 'Olá! Sou o assistente da Consulfeca. Como posso ajudar você?' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [appointment, setAppointment] = useState<Appointment>({ name: '', email: '', service: 'Psicoterapia Individual', date: '', time: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    console.log("Contact Form Submitted:", contactForm);
    setContactSubmitting(false);
    setContactSubmitted(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  // Subscription & Payment State
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Test Workflow State
  const [selectedTest, setSelectedTest] = useState<PsychologicalTest | null>(null);
  const [testWorkflow, setTestWorkflow] = useState<TestWorkflow>('CONSENT');
  const [testIdent, setTestIdent] = useState({ name: '', email: '', age: '' });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [testResult, setTestResult] = useState<TestResult | null>(null);
    const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [viewingHistory, setViewingHistory] = useState(false);
  

  // Test Details State
  const [viewingTestDetails, setViewingTestDetails] = useState<PsychologicalTest | null>(null);

  // Test Scheduling State
  const [schedulingTest, setSchedulingTest] = useState<PsychologicalTest | null>(null);
  const [testApptForm, setTestApptForm] = useState<TestAppointment>({
    name: '',
    email: '',
    phone: '',
    testId: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [apptSubmitting, setApptSubmitting] = useState(false);
  const [apptSubmitted, setApptSubmitted] = useState(false);

  // Test Category Filter
  const [activeTestCategory, setActiveTestCategory] = useState('Todos');
  const testCategories = ['Todos', ...Array.from(new Set(PSYCHOLOGICAL_TESTS.map(t => t.target)))];
  const filteredTests = useMemo(() => {
    if (activeTestCategory === 'Todos') return PSYCHOLOGICAL_TESTS;
    return PSYCHOLOGICAL_TESTS.filter(t => t.target === activeTestCategory);
  }, [activeTestCategory]);

  const services: Service[] = [
    { id: '1', title: 'Psicoterapia Individual', description: 'Atendimento personalizado para adultos e idosos.', category: ServiceCategory.INDIVIDUAL, icon: 'heart' },
    { id: '2', title: 'Terapia Infantil', description: 'Abordagem lúdica e acolhedora para crianças.', category: ServiceCategory.CHILDREN, icon: 'baby' },
    { id: '3', title: 'Terapia de Casal e Família', description: 'Fortalecimento de vínculos afetivos.', category: ServiceCategory.FAMILY, icon: 'users' },
    { id: '4', title: 'Testes Psicológicos Online', description: 'Aplicação regulamentada de inventários.', category: ServiceCategory.TESTING, icon: 'clipboard' },
    { id: '5', title: 'Treinamento Profissional', description: 'Capacitação em avaliação psicológica.', category: ServiceCategory.TRAINING, icon: 'book' },
    { id: '6', title: 'Psicologia Organizacional', description: 'Treinamentos para liderança e bem-estar.', category: ServiceCategory.TRAINING, icon: 'brain' },
  ];

  const filteredServices = useMemo(() => {
    if (!searchTerm.trim()) return services;
    const lowerSearch = searchTerm.toLowerCase();
    return services.filter(s => s.title.toLowerCase().includes(lowerSearch) || s.category.toLowerCase().includes(lowerSearch));
  }, [searchTerm, services]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    const response = await getAIOrientation(input);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const handleTestStepNext = () => {
    if (testWorkflow === 'CONSENT') setTestWorkflow('IDENTIFICATION');
    else if (testWorkflow === 'IDENTIFICATION') setTestWorkflow('QUESTIONS');
    else if (testWorkflow === 'QUESTIONS') {
      if (currentQuestionIndex < (selectedTest?.questions.length || 0) - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setTestWorkflow('FINISHED');
      }
    }
  };

  const handleTestFinish = () => {
    if (!selectedTest || !selectedTest.scoring) return;

    const score = selectedTest.scoring.calculate(answers);
    const interpretation = selectedTest.scoring.interpretations.find(i => score >= i.min && score <= i.max);

    if (interpretation) {
      const result: TestResult = {
        testId: selectedTest.id,
        testName: selectedTest.name,
        date: new Date().toLocaleDateString('pt-BR'),
        score,
        interpretation
      };
      setTestResult(result);
      setTestWorkflow('RESULTS');
    }
  };

  const saveAndResetTest = () => {
    if(testResult) {
      setTestHistory(prev => [...prev, testResult]);
    }
    setTestResult(null);
    setSelectedTest(null);
    setTestWorkflow('CONSENT');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTestIdent({ name: '', email: '', age: '' });
  };

  const handleScheduleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setApptSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    console.log("Scheduling Test Appointment for:", CLINIC_EMAIL, testApptForm);
    setApptSubmitting(false);
    setApptSubmitted(true);
    setTimeout(() => {
      setApptSubmitted(false);
      setSchedulingTest(null);
      setTestApptForm({ name: '', email: '', phone: '', testId: '', preferredDate: '', preferredTime: '' });
    }, 4000);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium hover:text-indigo-600">Início</a>
            <a href="#servicos" className="text-sm font-medium hover:text-indigo-600">Serviços</a>
                        <a href="#testes" className="text-sm font-medium hover:text-indigo-600">Testes Psicológicos</a>
            <a href="#treinamentos" className="text-sm font-medium hover:text-indigo-600">Treinamentos e Cursos</a>
            <a href="#contato" className="text-sm font-medium hover:text-indigo-600">Contato</a>
                                    <button onClick={() => setViewingHistory(true)} className="text-sm font-medium hover:text-indigo-600">Histórico</button>
            <button onClick={onLogout} className="text-sm font-bold text-red-500">Sair</button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-48 pb-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-8 font-serif">Equilíbrio para sua mente.</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">Oferecemos psicoterapia, treinamentos e avaliações psicológicas de alta qualidade.</p>
          <div className="flex justify-center gap-4">
            <a href="#contato" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-indigo-200">Entre em Contato</a>
            <a href={WHATSAPP_LINK} className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-emerald-200">WhatsApp</a>
          </div>
        </div>
      </section>

      <section id="servicos" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle title="Nossos Serviços" subtitle="Suporte emocional completo para todas as idades." />
          <div className="max-w-xl mx-auto mb-12 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="text" placeholder="Buscar serviços..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">{filteredServices.map(s => <ServiceCard key={s.id} service={s} />)}</div>
        </div>
      </section>

      <section id="testes" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle 
        title="Testes Psicológicos Online"
        subtitle="Ferramentas validadas para uma avaliação precisa e conveniente, disponíveis para iniciar seu processo de autoconhecimento."
      />
          <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
            {testCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveTestCategory(category)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeTestCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-white/60 backdrop-blur-sm text-slate-700 hover:bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredTests.map(test => (
                                          <div key={test.id} className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200 hover:border-indigo-300 transition-all group relative flex flex-col h-full animate-in fade-in-5 zoom-in-95">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-indigo-600 font-bold text-xs uppercase block">{test.acronym}</span>
                  <button 
                    onClick={() => setViewingTestDetails(test)}
                    className="p-1.5 bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                    title="Ver detalhes do teste"
                  >
                    <Info size={16} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">{test.name}</h3>
                <p className="text-sm text-slate-600 mb-8 flex-grow">{test.description}</p>
                <div className="space-y-3 mt-auto">
                                                                        <button onClick={() => {
                    if (!isSubscribed) {
                      setShowSubscriptionModal(true);
                    } else {
                      setSelectedTest(test);
                    }
                  }} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <FileText size={16} /> Iniciar Aplicação
                  </button>
                  <button 
                    onClick={() => {
                      setSchedulingTest(test);
                      setTestApptForm(prev => ({ ...prev, testId: test.id }));
                    }} 
                    className="w-full py-3 bg-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} /> Agendar Avaliação
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Test Details Modal (New Section) --- */}
        {viewingTestDetails && (
          <div className="fixed inset-0 z-[120] bg-slate-950/90 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl">
            <div className="bg-white text-slate-900 w-full max-w-4xl h-[85vh] rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600"><Info size={24} /></div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif">{viewingTestDetails.name}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Conteúdo do Teste ({viewingTestDetails.questions.length} Questões)</p>
                  </div>
                </div>
                <button onClick={() => setViewingTestDetails(null)} className="p-2 hover:bg-slate-50 rounded-full"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-6">
                  <h4 className="font-bold text-slate-800 mb-2">Sobre este teste:</h4>
                  <p className="text-slate-600 leading-relaxed italic">{viewingTestDetails.description}</p>
                </div>

                <div className="space-y-6">
                  {viewingTestDetails.questions.map((q, idx) => (
                    <div key={q.id} className="p-6 border border-slate-100 rounded-[2rem] hover:bg-slate-50/50 transition-colors group">
                      <div className="flex items-start gap-4">
                        <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">{idx + 1}</span>
                        <div className="flex-1">
                          <h5 className="text-lg font-bold text-slate-800 mb-4">{q.text}</h5>
                          
                          {q.type === 'choice' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {q.options?.map((opt) => (
                                <div key={opt.value} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-600">
                                  <div className="w-2 h-2 bg-indigo-300 rounded-full"></div>
                                  {opt.label}
                                </div>
                              ))}
                            </div>
                          )}

                          {q.type === 'upload' && (
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 text-amber-700 text-sm">
                              <Upload size={18} /> <span>Esta questão requer o envio de um arquivo ou imagem conforme a instrução.</span>
                            </div>
                          )}

                          {q.type === 'text' && (
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3 text-blue-700 text-sm">
                              <HelpCircle size={18} /> <span>Esta questão é aberta e requer uma resposta escrita detalhada.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
                <button 
                  onClick={() => {
                    setViewingTestDetails(null);
                    setSchedulingTest(viewingTestDetails);
                  }}
                  className="px-8 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
                >
                  Agendar Sessão
                </button>
                <button 
                  onClick={() => {
                    setViewingTestDetails(null);
                    setSelectedTest(viewingTestDetails);
                  }}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  Iniciar Agora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Test Portal Overlay (Existing Application Flow) --- */}
        {selectedTest && (
          <div className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl">
            <div className="bg-white text-slate-900 w-full max-w-3xl h-[85vh] rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600"><ClipboardCheck size={24} /></div>
                  <div><h3 className="text-xl font-bold font-serif">{selectedTest.name}</h3><p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{selectedTest.acronym}</p></div>
                </div>
                <button onClick={() => setSelectedTest(null)} className="p-2 hover:bg-slate-50 rounded-full"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10">
                {testWorkflow === 'CONSENT' && (
                  <div className="space-y-8 animate-in slide-in-from-bottom-4">
                    <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                      <h4 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2"><AlertCircle size={20} /> Consentimento Informado</h4>
                      <div className="space-y-4 text-sm text-indigo-800 leading-relaxed">
                        <p>Ao realizar este teste, você concorda que:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Seus dados de identificação serão armazenados de forma sigilosa.</li>
                          <li>As respostas serão enviadas exclusivamente para o clínico responsável ({CLINIC_EMAIL}).</li>
                        </ul>
                      </div>
                    </div>
                    <button onClick={handleTestStepNext} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all">Aceito e Desejo Continuar</button>
                  </div>
                )}
                {testWorkflow === 'IDENTIFICATION' && (
                  <form onSubmit={(e) => { e.preventDefault(); handleTestStepNext(); }} className="space-y-6 animate-in slide-in-from-right-4">
                    <h4 className="text-2xl font-bold font-serif mb-6">Identificação do Paciente</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label><input required type="text" value={testIdent.name} onChange={e => setTestIdent({...testIdent, name: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" /></div>
                      <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Idade</label><input required type="number" value={testIdent.age} onChange={e => setTestIdent({...testIdent, age: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" /></div>
                    </div>
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">E-mail</label><input required type="email" value={testIdent.email} onChange={e => setTestIdent({...testIdent, email: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" /></div>
                    <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg">Ir para as Questões</button>
                  </form>
                )}
                {testWorkflow === 'QUESTIONS' && (
                  <div className="animate-in slide-in-from-right-4 space-y-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Questão {currentQuestionIndex + 1} de {selectedTest.questions.length}</span>
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / selectedTest.questions.length) * 100}%` }}></div></div>
                    </div>
                    <div className="min-h-[150px]">
                      <h4 className="text-2xl font-bold text-slate-800 leading-tight mb-8">{selectedTest.questions[currentQuestionIndex].text}</h4>
                      {selectedTest.questions[currentQuestionIndex].type === 'choice' && (
                        <div className="grid gap-3">
                          {selectedTest.questions[currentQuestionIndex].options?.map((opt) => (
                            <button key={opt.value} onClick={() => { setAnswers({...answers, [selectedTest.questions[currentQuestionIndex].id]: opt.value}); handleTestStepNext(); }} className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex items-center justify-between ${answers[selectedTest.questions[currentQuestionIndex].id] === opt.value ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-100 hover:border-indigo-200'}`}><span className="font-medium">{opt.label}</span></button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                                                {testWorkflow === 'FINISHED' && (
                  <div className="text-center py-10 animate-in zoom-in-95">
                    <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8"><ClipboardCheck size={48} /></div>
                    <h4 className="text-3xl font-bold mb-4 font-serif">Cálculo de Resultados</h4>
                    <p className="text-slate-600 mb-8">Seu teste foi concluído. Estamos processando suas respostas para gerar o resultado.</p>
                    <button onClick={handleTestFinish} className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg">Ver Meu Resultado</button>
                  </div>
                )}
                {testWorkflow === 'RESULTS' && testResult && (
                  <div className="text-center py-10 animate-in zoom-in-95">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-white bg-indigo-500`}>
                      <span className="text-4xl font-bold">{testResult.score}</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-600">Pontuação Final</h4>
                    <p className="text-3xl font-bold mb-4 font-serif text-indigo-700">{testResult.interpretation.level}</p>
                    <p className="text-slate-600 max-w-md mx-auto mb-8">{testResult.interpretation.text}</p>
                    <button onClick={saveAndResetTest} className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg">Salvar e Voltar ao Início</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- History Modal --- */}
        {viewingHistory && (
          <div className="fixed inset-0 z-[120] bg-slate-950/90 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl">
            <div className="bg-white text-slate-900 w-full max-w-4xl h-[85vh] rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-2xl font-bold font-serif">Histórico de Testes</h3>
                <button onClick={() => setViewingHistory(false)} className="p-2 hover:bg-slate-50 rounded-full"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10">
                {testHistory.length > 0 ? (
                  <div className="space-y-4">
                    {testHistory.map((result, index) => (
                      <div key={index} className="p-6 border border-slate-200 rounded-2xl bg-slate-50">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-lg text-indigo-800">{result.testName}</h4>
                          <span className="text-xs font-bold text-slate-400">{result.date}</span>
                        </div>
                        <p className="text-sm text-slate-600">Pontuação: <span className="font-bold">{result.score}</span> - Nível: <span className="font-bold">{result.interpretation.level}</span></p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-500">Nenhum resultado de teste salvo ainda.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- Subscription Modal --- */}
        {showSubscriptionModal && (
          <div className="fixed inset-0 z-[120] bg-slate-950/90 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl">
            <div className="bg-white text-slate-900 w-full max-w-md rounded-[3rem] p-10 shadow-2xl text-center animate-in zoom-in-95">
              <h3 className="text-2xl font-bold font-serif mb-4">Acesso Exclusivo</h3>
              <p className="text-slate-600 mb-8">Para realizar os testes, é necessário ser um membro subscrito. Este é um passo simulado para demonstração.</p>
              <button 
                onClick={() => { setIsSubscribed(true); setShowSubscriptionModal(false); }}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all"
              >
                Simular Subscrição e Continuar
              </button>
            </div>
          </div>
        )}

        {/* --- Test Scheduling Modal --- */}
        {schedulingTest && (
          <div className="fixed inset-0 z-[110] bg-slate-950/80 flex items-center justify-center p-6 backdrop-blur-md">
            <div className="bg-white text-slate-900 w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl animate-in zoom-in-95">
              <button onClick={() => setSchedulingTest(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 p-2"><X size={24} /></button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Calendar size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif">Agendar Avaliação</h3>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-tight">{schedulingTest.name}</p>
                </div>
              </div>

              {apptSubmitted ? (
                <div className="text-center py-10 animate-in zoom-in-95">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-bold mb-2 font-serif">Solicitação de Agendamento Enviada!</h4>
                  <p className="text-slate-500 mb-8">Entraremos em contato via WhatsApp/E-mail para confirmar seu horário.</p>
                </div>
              ) : (
                <form onSubmit={handleScheduleTest} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nome Completo</label>
                    <input 
                      required 
                      type="text" 
                      value={testApptForm.name} 
                      onChange={e => setTestApptForm({...testApptForm, name: e.target.value})}
                      placeholder="Seu nome"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">E-mail</label>
                      <input 
                        required 
                        type="email" 
                        value={testApptForm.email} 
                        onChange={e => setTestApptForm({...testApptForm, email: e.target.value})}
                        placeholder="email@exemplo.com"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">WhatsApp</label>
                      <input 
                        required 
                        type="tel" 
                        value={testApptForm.phone} 
                        onChange={e => setTestApptForm({...testApptForm, phone: e.target.value})}
                        placeholder="(00) 00000-0000"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data Sugerida</label>
                      <input 
                        required 
                        type="date" 
                        value={testApptForm.preferredDate} 
                        onChange={e => setTestApptForm({...testApptForm, preferredDate: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Horário</label>
                      <input 
                        required 
                        type="time" 
                        value={testApptForm.preferredTime} 
                        onChange={e => setTestApptForm({...testApptForm, preferredTime: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" 
                      />
                    </div>
                  </div>
                  <button 
                    disabled={apptSubmitting}
                    type="submit" 
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {apptSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : 'Confirmar Agendamento'}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">Solicitação enviada para evaristofecayamalej@gmail.com</p>
                </form>
              )}
            </div>
          </div>
        )}
            </section>

      <TreinamentosSection />

      {/* Contact Section */}
      <section id="contato" className="py-24 pb-40">
        <div className="container mx-auto px-6">
          <SectionTitle title="Entre em Contato" subtitle="Tem alguma dúvida ou gostaria de agendar uma consulta? Preencha o formulário abaixo e retornaremos o mais breve possível." />
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-[3rem] shadow-2xl p-12 border border-slate-100">
            {contactSubmitted ? (
              <div className="text-center py-10 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-serif">Mensagem Enviada!</h3>
                <p className="text-slate-500">Obrigado por entrar em contato. Responderemos em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input required type="text" name="name" value={contactForm.name} onChange={handleContactChange} placeholder="Nome Completo" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" />
                  <input required type="email" name="email" value={contactForm.email} onChange={handleContactChange} placeholder="Seu melhor e-mail" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
                <input required type="text" name="subject" value={contactForm.subject} onChange={handleContactChange} placeholder="Assunto" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" />
                <textarea required name="message" value={contactForm.message} onChange={handleContactChange} placeholder="Sua mensagem..." rows={6} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none resize-none"></textarea>
                <button 
                  type="submit" 
                  disabled={contactSubmitting}
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {contactSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : 'Enviar Mensagem'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 w-full bg-slate-900 text-white z-50 border-t border-slate-700">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <span className="mb-2 md:mb-0 text-slate-400">© {new Date().getFullYear()} Consulfeca Psicologia Clínica</span>
          <div className="flex items-center gap-6">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
              <Phone size={16} />
              <span>{FORMATTED_PHONE}</span>
            </a>
            <a href={`mailto:${CLINIC_EMAIL}`} className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
              <Mail size={16} />
              <span className="hidden sm:inline">{CLINIC_EMAIL}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* AI Assistant FAB */}
      <div className="fixed bottom-6 right-6 z-[60]">
        {!chatOpen ? (
          <button onClick={() => setChatOpen(true)} className="w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"><MessageCircle size={30} /></button>
        ) : (
          <div className="bg-white w-[350px] h-[500px] rounded-[2rem] shadow-3xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 absolute bottom-0 right-0">
            <div className="bg-indigo-600 p-6 flex justify-between items-center text-white"><h4 className="font-bold">Assistente Consulfeca</h4><button onClick={() => setChatOpen(false)}><X size={20} /></button></div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {messages.map((m, i) => <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'}`}>{m.text}</div></div>)}
            </div>
            <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Mensagem..." className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" /><button onClick={handleSendMessage} className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center"><Send size={18} /></button></div>
          </div>
        )}
      </div>
    </>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('WELCOME');
  return (
    <div className="min-h-screen relative">
      <Background />
      {view === 'WELCOME' && <WelcomeScreen onStart={() => setView('LOGIN')} />}
      {view === 'LOGIN' && <LoginScreen onLogin={() => setView('APP')} />}
      {view === 'APP' && <MainApp onLogout={() => setView('LOGIN')} />}
    </div>
  );
};

export default App;
