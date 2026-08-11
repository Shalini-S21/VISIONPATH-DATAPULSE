export const MOCK_COURSES = [
  {
    id: 'crs_101',
    title: 'Enterprise React 19 Architecture & Performance Optimization',
    instructor: 'Sarah Drasner & Dan Abramov',
    category: 'Frontend Engineering',
    level: 'Advanced',
    rating: 4.9,
    reviewsCount: 1420,
    studentsCount: 12450,
    price: '$89.99',
    duration: '18h 45m',
    lessonsCount: 30,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
    description: 'Master React 19 Server Components, Action Hooks, Optimistic UI updates, and production micro-frontend architectures.',
    tags: ['React 19', 'Redux Toolkit', 'Vite', 'Performance']
  },
  {
    id: 'crs_102',
    title: 'Building Production AI Assistants with LangChain & OpenAI',
    instructor: 'Dr. Andrew Ng',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    rating: 4.85,
    reviewsCount: 980,
    studentsCount: 8900,
    price: '$94.99',
    duration: '14h 20m',
    lessonsCount: 24,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
    description: 'Learn RAG pipelines, ChromaDB vector search, function calling, and custom AI agent tool invocation.',
    tags: ['AI', 'Python', 'LangChain', 'LLM']
  },
  {
    id: 'crs_103',
    title: 'Full Stack System Design & Distributed Microservices',
    instructor: 'Gaurav Sen',
    category: 'Backend Engineering',
    level: 'Expert',
    rating: 4.95,
    reviewsCount: 2150,
    studentsCount: 19800,
    price: '$99.99',
    duration: '22h 10m',
    lessonsCount: 28,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    description: 'Architect scalable web systems handling millions of QPS using Redis, Kafka, Distributed Caching, and Load Balancers.',
    tags: ['System Design', 'Microservices', 'Distributed Systems']
  },
  {
    id: 'crs_104',
    title: 'DevOps Engineering & AWS Kubernetes Deployment',
    instructor: 'Kelsey Hightower',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    rating: 4.88,
    reviewsCount: 1120,
    studentsCount: 10400,
    price: '$79.99',
    duration: '16h 50m',
    lessonsCount: 22,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80',
    description: 'Automate CI/CD pipelines with GitHub Actions, Terraform, Kubernetes EKS, and Prometheus monitoring.',
    tags: ['DevOps', 'AWS', 'Kubernetes', 'CI/CD']
  },
  {
    id: 'crs_105',
    title: 'UI/UX Design Masterclass & Figma Prototyping',
    instructor: 'Gary Simon',
    category: 'Design',
    level: 'Beginner',
    rating: 4.91,
    reviewsCount: 840,
    studentsCount: 7600,
    price: '$69.99',
    duration: '12h 30m',
    lessonsCount: 19,
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
    description: 'Design accessible, high-converting web applications with modern design systems and interactive Figma components.',
    tags: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping']
  }
];

export const MOCK_JOBS = [
  {
    id: 'job_1',
    title: 'Senior Frontend Architect',
    company: 'Vercel',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    location: 'Remote (US/EU)',
    type: 'Full-Time',
    salary: '$180,000 - $240,000',
    experience: '5+ years',
    postedDate: '2 days ago',
    skills: ['React 19', 'Next.js', 'TypeScript', 'Turbopack'],
    description: 'We are looking for a Senior Frontend Architect to lead our Next.js core rendering team.'
  },
  {
    id: 'job_2',
    title: 'Staff AI Engineer',
    company: 'OpenAI',
    logo: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=120&q=80',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-Time',
    salary: '$220,000 - $310,000',
    experience: '4+ years',
    postedDate: '1 day ago',
    skills: ['Python', 'PyTorch', 'LLM Alignment', 'CUDA'],
    description: 'Help engineer next-generation multimodal agent systems and high-throughput LLM serving infrastructure.'
  },
  {
    id: 'job_3',
    title: 'Full Stack Engineering Lead',
    company: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    location: 'Seattle, WA / Remote',
    type: 'Full-Time',
    salary: '$195,000 - $265,000',
    experience: '6+ years',
    postedDate: '3 days ago',
    skills: ['React', 'Ruby on Rails', 'Go', 'Payment API'],
    description: 'Join the Core Checkout team to build frictionless financial experience for global merchant applications.'
  },
  {
    id: 'job_4',
    title: 'Cloud Infrastructure & DevOps Engineer',
    company: 'Datadog',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    location: 'New York, NY',
    type: 'Full-Time',
    salary: '$165,000 - $210,000',
    experience: '3+ years',
    postedDate: '4 days ago',
    skills: ['Kubernetes', 'Go', 'Terraform', 'Prometheus'],
    description: 'Manage telemetry processing pipelines collecting petabytes of metrics per second across global clusters.'
  }
];

export const MOCK_COUNSELORS = [
  {
    id: 'cnsl_001',
    name: 'Dr. Sarah Jenkins',
    title: 'Principal Tech Career Strategist',
    institution: 'Former VP of Eng at Google',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    rating: 4.95,
    reviewsCount: 184,
    hourlyRate: '$85/hr',
    specialties: ['System Design Interviews', 'FAANG Hiring', 'Executive Mentorship', 'Resume Re-engineering'],
    bio: 'Guided 350+ software engineers into Google, Apple, Meta, and top AI startups.'
  },
  {
    id: 'cnsl_002',
    name: 'Robert Chen',
    title: 'Staff Product Manager & Career Coach',
    institution: 'Meta Product Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    rating: 4.88,
    reviewsCount: 142,
    hourlyRate: '$90/hr',
    specialties: ['Product Management', 'Tech Strategy', 'Behavioral Interviews'],
    bio: 'Specializing in breaking non-traditional backgrounds into elite Tech Product Management roles.'
  },
  {
    id: 'cnsl_003',
    name: 'Amanda Brooks',
    title: 'AI Research & Data Science Mentor',
    institution: 'Stanford AI Lab Director',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    rating: 4.92,
    reviewsCount: 96,
    hourlyRate: '$95/hr',
    specialties: ['Machine Learning', 'PhD Track', 'AI Startups', 'Portfolio Reviews'],
    bio: 'Assisting candidates in building standout AI portfolios and securing ML engineering positions.'
  }
];

export const MOCK_ROADMAPS = [
  {
    id: 'rd_1',
    title: 'Full Stack AI Developer',
    role: 'Senior Full Stack Engineer',
    matchPercentage: 96,
    difficulty: 'Advanced',
    duration: '16 Weeks',
    modulesCount: 7,
    description: 'End-to-end learning path combining modern frontend, cloud backends, and custom AI agent pipelines.',
    icon: 'Code'
  },
  {
    id: 'rd_2',
    title: 'AI System & ML Ops Engineer',
    role: 'Machine Learning Infrastructure Engineer',
    matchPercentage: 89,
    difficulty: 'Expert',
    duration: '20 Weeks',
    modulesCount: 9,
    description: 'Learn model fine-tuning, PyTorch optimization, GPU orchestration, and production ML pipelines.',
    icon: 'Cpu'
  },
  {
    id: 'rd_3',
    title: 'Cloud Solutions Architect',
    role: 'AWS/Azure Principal Architect',
    matchPercentage: 84,
    difficulty: 'Intermediate',
    duration: '14 Weeks',
    modulesCount: 6,
    description: 'Design enterprise cloud architectures, serverless computing, and zero-trust security frameworks.',
    icon: 'Cloud'
  }
];
